import request from 'supertest';
import {app} from '../../app';
import mongoose from 'mongoose';
import { Order } from '../../models/order';
import { OrderStatus} from '@ticket-share/common';
import {stripe} from '../../stripe';

jest.mock('../../stripe');

it('returns a 404 when purchasing an order that does not exist', async()=>{
    await request(app)
        .post('/api/payments')
        .set('Cookie', global.signin())
        .send({
            token: 'asldkfj',
            orderId: mongoose.Types.ObjectId().toHexString()
        })
        .expect(404);
});
it('returns a 401 when purchasing an order that does not belong to the user', async()=>{
    const order = Order.build({
        id: mongoose.Types.ObjectId().toHexString(),
        userId: mongoose.Types.ObjectId().toHexString(),
        version: 0,
        price: 20,
        status: OrderStatus.Created
    });
    await order.save();
    
    await request(app)
    .post('/api/payments')
    .set('Cookie', global.signin())
    .send({
        token: 'asldkfj',
        orderId: order.id
    })
    .expect(401);   
    //fail by changing status code
});
//A bit more tricky: we need to create an order, with userId,
//make request with the same userId, since we use global signing()
//since we use a payload with random we need to assign 
// I modified the setup test for optional id
it('returns a 400 when purchasing a cancelled order', async()=>{
    const userId = mongoose.Types.ObjectId().toHexString();

    const order = Order.build({
        id: mongoose.Types.ObjectId().toHexString(),
        userId,
        version: 0,
        price: 20,
        status: OrderStatus.Cancelled,
    });
    await order.save();

    //request
    await request(app)
        .post('/api/payments')
        .set('Cookie', global.signin(userId))
        .send({
            orderId: order.id,
            token: 'asdlkfj',
        })
        .expect(400);

});

it('returns a 201 with valid input', async()=>{
    const userId = mongoose.Types.ObjectId().toHexString();

    const order = Order.build({
        id: mongoose.Types.ObjectId().toHexString(),
        userId,
        version: 0,
        price: 20,
        status: OrderStatus.Created,
    });
    await order.save();

    await request(app)
    .post('/api/payments')
    .set('Cookie', global.signin(userId))
    .send({
        token: 'tok_visa',
        orderId: order.id,
    })
    .expect(201);

    const chargeOptions = (stripe.charges.create as jest.Mock).mock.calls[0][0];
    expect(chargeOptions.source).toEqual('tok_visa');
    expect(chargeOptions.amount).toEqual(20*100);
    expect(chargeOptions.currency).toEqual('usd');

    //the downside is we are not really reaching out to the stripe api
    
});
// (1) Realistically, in order to make an api call test outside of the cluster
// (2) Need to remove the jest.mock()
// (3) rename the setup.ts file, so that it is not invoked
// (4) refactore the api key, to an .env file making sure the .env file is .gitignored
// (5) make a request to the api, perhaps with a randomly generated price
// (6) using the list api end point of the stripe endpoint, and iterate through the returned list
// (7) create expectations around this with the idea of not looking at stale data