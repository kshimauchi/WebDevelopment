import request from 'supertest';
import {app} from '../../app';
import { Ticket} from '../../models/ticket';
import mongoose from 'mongoose';

it('fetches the order', async()=> {
    //create a ticket
    const ticket = Ticket.build({
        id: mongoose.Types.ObjectId().toHexString(),
        title: 'concert',
        price: 13
    });
    //save the ticket created
    await ticket.save();
    //signin
    const user = global.signin();
    //request to build an order with ticket
    const { body: order } = await request(app)
        .post('/api/orders')
        .set('Cookie', user)
        .send({ ticketId: ticket.id})
        .expect(201);

    //request to get the order created
    const { body: fetchedOrder } = await request(app)
        .get(`/api/orders/${order.id}`)
        .set('Cookie', user)
        .send()
        .expect(200);
    //verifies ideal cases    
    expect(fetchedOrder.id).toEqual(order.id);
});

it('returns an error if another user requests another users order', async()=>{
    //create a ticket
    const ticket = Ticket.build({
        id: mongoose.Types.ObjectId().toHexString(),
        title: 'concert',
        price: 13,
    });
    //save the ticket created
    await ticket.save();
    //signin
    const user = global.signin();
    //request to build an order with ticket
    const { body: order } = await request(app)
        .post('/api/orders')
        .set('Cookie', user)
        .send({ticketId: ticket.id})
        .expect(201);

    //make request to fetch an order of another user
    await request(app)
        .get(`/api/orders/${order.id}`)
        .set('Cookie', global.signin())
        .send()
        .expect(401);
    //change expect to 500 for error
});