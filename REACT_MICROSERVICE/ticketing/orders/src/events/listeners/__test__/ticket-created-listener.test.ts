import { TicketCreatedListener } from "../ticket-created-listener";
import { natsWrapper } from "../../../nats-wrapper";
import { TicketCreatedEvent } from "@ticket-share/common";
import { Ticket } from "../../../models/ticket";
import mongoose from 'mongoose';

const setup = async()=>{
    //create an instance of the listener
    const listener = new TicketCreatedListener(natsWrapper.client);
    //create a fake data event
    const data: TicketCreatedEvent['data'] = {
        version: 0,
        id: new mongoose.Types.ObjectId().toHexString(),
        title: 'concert',
        price: 10,
        userId: new mongoose.Types.ObjectId().toHexString()
    };
    //create a fake message object
    //@ts-ignore
    const msg: Message = {
        // mock function
        ack: jest.fn()
    };
    return { listener, data, msg };
};

it('creates and saves a ticket', async()=>{
    const {listener, data, msg } = await setup();
    //call the onMessage function with the data object and message object
    await listener.onMessage(data, msg);
    //write assertions to make sure a ticket was created!
    const ticket = await Ticket.findById(data.id);
    expect(ticket).toBeDefined();
    expect(ticket!.title).toEqual(data.title); //replace title with something for fail
    expect(ticket!.price).toEqual(data.price);
});

it('acks the message', async()=>{
    const { data, listener, msg }= await setup();
    //call the onMessage function with the data object + message object
    await listener.onMessage(data, msg);
    // write assertions to resolve ack function is called
    expect(msg.ack).toHaveBeenCalled();
});