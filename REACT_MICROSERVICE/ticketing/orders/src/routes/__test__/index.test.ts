import request from 'supertest';
import { app} from '../../app';
import { Order } from '../../models/order';
import { Ticket } from '../../models/ticket';
import mongoose from 'mongoose';

const buildTicket = async()=> {
    
    const ticket = Ticket.build({
        id: mongoose.Types.ObjectId().toHexString(),
        title: 'concert',
        price: 35
    });
    await ticket.save();

    return ticket;
}


it('fetches orders for a particular user', async()=>{
    // create three tickets
  const ticket1 = await buildTicket();
  const ticket2 = await buildTicket();
  const ticket3 = await buildTicket();
    // create one order as User#1
    const userOne = global.signin();
    const userTwo = global.signin();
    // create two orders as User#2 we have to make a request to express
    await request(app)
        .post('/api/orders')
        .set('Cookie', userOne)
        .send({ticketId: ticket1.id})
        .expect(201);
    //make a request to get orders for user#2 renaming body to orderOne
    const {body: orderOne} = await request(app)
        .post('/api/orders')
        .set('Cookie', userTwo)
        .send({ticketId: ticket2.id})
        .expect(201);

    const {body: orderTwo}= await request(app)
        .post('/api/orders')
        .set('Cookie', userTwo)
        .send({ticketId: ticket3.id})
        .expect(201);
    
    //Verify we receive two tickets from a request of userTwo
    const response = await request(app)
        .get('/api/orders')
        .set('Cookie', userTwo)
        .expect(200);  //change to 500 check reload

    //console.log(response.body);
    //console.log(orderOne);
    //Verifying userTwo has two responses
    expect(response.body.length).toEqual(2);
  
    expect(response.body[0].id).toEqual(orderOne.id);
    expect(response.body[1].id).toEqual(orderTwo.id);
    //Verifying embedded tickets
    expect(response.body[0].ticket.id).toEqual(ticket2.id);
    expect(response.body[1].ticket.id).toEqual(ticket3.id);

});