import {Listener, OrderCreatedEvent, Subjects } from '@ticket-share/common';
import {queueGroupName} from './queue-group-name';
import { Order } from '../../models/order';
import { Message} from 'node-nats-streaming';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
    queueGroupName = queueGroupName;

    async onMessage(data: OrderCreatedEvent['data'],msg: Message){
        
        const order = Order.build({
            id: data.id,
            price: data.ticket.price,
            status: data.status,
            userId: data.userId,
            version: data.version
        });
        //save order to db
        await order.save();
        //acknowledge the message
        msg.ack();
    }
}