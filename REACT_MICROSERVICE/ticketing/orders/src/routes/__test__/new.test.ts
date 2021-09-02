import { app } from '../../app';
import request from 'supertest';
import mongoose from 'mongoose';
import { Order, OrderStatus } from '../../models/order'
import { Ticket } from '../../models/ticket';
import { natsWrapper } from '../../nats-wrapper';
/* 
Setup: need valid tickets to run 2 and 3
we need a valid mongoId
*/
async function asyncThrowOrNot(shouldThrow = false) {
    if (shouldThrow) {
      throw new Error('shouldThrow was true');
    }
    return 'success';
};

it('should throw if passed true', async () => {
    try {
      await asyncThrowOrNot(true);
    } catch (error) {
      expect(error).toEqual(new Error('shouldThrow was true'));
    }
});

//(1)
it('returns an error if the ticket does not exist', async()=>{
    const ticketId = mongoose.Types.ObjectId();

    await request(app)
        .post('/api/orders')
        .set('Cookie', global.signin())
        .send({ticketId})
        .expect(404);
    
});
//(2) A ticket is reserved if the following criteria are
// defined as specfication on model
it('returns an error if the ticket is already reserved', async()=>{
    // creates a ticket
    const ticket = Ticket.build({
        title: 'concert ticket',
        price: 20
    });
    // save ticket to database
    await ticket.save();

    // creates a order with erroneous expiresAt
    const order = Order.build({
        
        userId: 'randomId',
        status: OrderStatus.Created,
        // expires instantly but a expiration service will e
        // added later
        expiresAt: new Date(),
        ticket
    });
    // saves the order to te orders database
    await order.save();

    // makes a request to see if the following conditions
    // have been created and saved
    await request(app)
        .post('/api/orders')
        .set('Cookie', global.signin())
        .send( {ticketId: ticket.id})
        .expect(400);
});
//(3) A ticket is reserved
it('successfully reserves a ticket', async()=>{
    // (need to create a ticket)
     const ticket = Ticket.build({
        title: 'concert ticket',
        price: 25
    });
    //(save ticket)
    await ticket.save();
    // request to reserve a ticket: expect 201 order has been created
    await request(app)
        .post('/api/orders')
        .set('Cookie', global.signin())
        .send({ticketId: ticket.id})
        .expect(201);
        //.expect(400); error
// we could reach inside the order collection
// to check it is saved to the database
// could be more elaborate if you wish
       
});

it('emits an order created event', async()=>{
    const ticket = Ticket.build({
        title: 'concert ticket',
        price: 20
    });
    // save ticket to database
    await ticket.save();

    await request(app)
        .post('/api/orders')
        .set('Cookie', global.signin())
        .send( {ticketId: ticket.id })
        .expect(201);
    //expect(natsWrapper.client.publish).not.toHaveBeenCalled();
    expect(natsWrapper.client.publish).toHaveBeenCalled();
});