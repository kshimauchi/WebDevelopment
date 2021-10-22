import {Listener, Subjects, ExpirationCompleteEvent, OrderStatus} from '@ticket-share/common';
import { Message} from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';
import { Order } from '../../models/order';
import { OrderCancelledPublisher} from '../publishers/order-cancelled-publisher';


export class ExpirationCompleteListener extends Listener<ExpirationCompleteEvent>{
    queueGroupName = queueGroupName;
    subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;

    async onMessage(data: ExpirationCompleteEvent['data'], msg: Message){
        const order = await Order.findById(data.orderId).populate('ticket');
        if(!order){
            throw new Error('Order not found');
        }
        order.set({ 
            status: OrderStatus.Cancelled,
            // ticket: null, this would remove the reference
            // we want to see who is associated with ticket
            // no tie between ticket and orders
        });
        await order.save();
        //order id, order version, and the ticket it was associated with
        await new OrderCancelledPublisher(this.client).publish({
            id: order.id ,
            version: order.version,
            ticket: {
                //id of ticket:
                id: order.ticket.id
            }
        });
        msg.ack();
    }
}