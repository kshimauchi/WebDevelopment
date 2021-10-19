import { ExpirationCompleteListener} from '../expiration-complete-listener';
import {natsWrapper} from '../../../nats-wrapper';
import mongoose from 'mongoose';
import { Order } from '../../../models/order';
import { Ticket } from '../../../models/ticket';
import { OrderStatus, ExpirationCompleteEvent } from '@ticket-share/common';
import { Message } from 'node-nats-streaming';

//setup for testing of expiration-complete-listener
const setup = async()=> {
    
    const listener = new ExpirationCompleteListener(natsWrapper.client);
    
    const ticket = Ticket.build({
        id: mongoose.Types.ObjectId().toHexString(),
        title: 'concert',
        price: 20
    });
    
    await ticket.save();

    const order = Order.build({
        status: OrderStatus.Created,
        userId: 'akfjdlkajf',
        expiresAt: new Date(),
        ticket,
    });
    
    await order.save();

    const data: ExpirationCompleteEvent['data']={
        orderId: order.id
    };
    //@ts-ignore
    const msg: Message = {
        ack: jest.fn()
    };
    return {listener, order, ticket, data, msg};
};
//These should be clear enough
it('updates the order status to cancelled', async()=>{

});
it('emits an OrderCancelled event', async()=>{

});
it('ack the message', async()=> { 

});