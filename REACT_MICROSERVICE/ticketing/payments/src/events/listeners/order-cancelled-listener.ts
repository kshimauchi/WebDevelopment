import { OrderCancelledEvent, Subjects, Listener, OrderStatus } from "@ticket-share/common";
import { Order } from "../../models/order";
import { queueGroupName } from "./queue-group-name";
import { Message } from 'node-nats-streaming';

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
    queueGroupName = queueGroupName;
    
    async onMessage(data: OrderCancelledEvent['data'], msg: Message){
        const order = await Order.findOne({
            //we will include version in case an order is updated at sometime
            _id: data.id,
            version: data.version-1
        });
        if(!order){
            throw new Error('Order not found');
        }
        order.set({status: OrderStatus.Cancelled});
        await order.save();

        msg.ack();
    }
}