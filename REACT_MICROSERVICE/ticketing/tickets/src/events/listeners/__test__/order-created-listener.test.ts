import { OrderCreatedEvent, OrderStatus } from '@ticket-share/common';
import { OrderCreatedListener} from'../order-created-listener';
import { natsWrapper } from '../../../nats-wrapper';
import { Ticket } from '../../../models/ticket';
import mongoose from 'mongoose';
import { Message } from 'node-nats-streaming';

const setup = async()=>{
    //create instance of listener
    const listener = new OrderCreatedListener(natsWrapper.client);

    const ticket = Ticket.build({
        title: 'concert',
        price: 99,
        userId: 'asdf'
    });
    await ticket.save();
    const data: OrderCreatedEvent['data'] = {
        id: mongoose.Types.ObjectId().toHexString(),
        version: 0,
        status: OrderStatus.Created,
        userId: 'alskdfj',
        expiresAt: 'alskdfj',
        ticket: {
            id: ticket.id,
            price: ticket.price
        }
    };
    // @ts-ignore
    const msg: Message = {
        ack: jest.fn()
    };
    return {listener, ticket, data, msg};
};
it('sets the userId of the ticket', async()=>{
    
    const { listener, ticket, data, msg }= await setup();
    
    await listener.onMessage(data, msg);

    const updatedTicket = await Ticket.findById(ticket.id);

    if(!updatedTicket){
        throw new Error('Ticket not found');
    }
    expect(updatedTicket!.orderId).toEqual(data.id);
});

it('it acks the message', async()=>{
    const {listener, ticket, data, msg}= await setup();
    await listener.onMessage(data, msg);

    expect(msg.ack).toHaveBeenCalled();
});

it('publishes a ticket updated event', async()=>{
    const { listener, ticket, data, msg } = await setup();

    await listener.onMessage(data, msg);

    expect(natsWrapper.client.publish).toHaveBeenCalled();
    //@ts-ignore
    //(natsWrapper.client.publish as jest.Mock).mock.calls[0][1]
    //const ticketId = natsWrapper.client.publish.mock.calls[0][1];
    const ticketUpdatedData = JSON.parse( (natsWrapper.client.publish as jest.Mock).mock.calls[0][1]);
    expect(data.id).toEqual(ticketUpdatedData.orderId);
});