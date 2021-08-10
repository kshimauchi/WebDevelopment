import { jsxText } from '@babel/types';
import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

/*
update test: 
Case When:
id: dne
user: not auth, just build so no sign on
user: does not own the ticket
*/

it('returns 404 if the provided id does not exist', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
   
    await request(app)
        .put(`/api/tickets/${id}`)
        .set('Cookie', global.signin())
        .send({
            title: 'ticket',
            price: 20
        })
        .expect(404);
});

it('returns 401 if the user is not authenticated', async () => {
    
    const id = new mongoose.Types.ObjectId().toHexString();
   
    await request(app)
        .put(`/api/tickets/${id}`)
        //.set('Cookie', global.signin())
        .send({
            title: 'ticket',
            price: 20
        })
        .expect(401);
});

it('returns 401 if the user does not own the ticket', async () => {
    //changed the global signin, payload to randomize id
    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: 'ticket',
            price: 20
        });
    //then making second request should not have same id
    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', global.signin())
        .send({
            title: 'fdjkaljfdkla',
            price: 1000
        })
        .expect(401);
    
    //could verify the ticket title and price
});

it('returns 400 if the user provides an invalid title', async () => {
    
});

it('updates the ticket provided valid inputs', async () => {
    
});




