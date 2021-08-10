import { Mongoose } from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

it('returns 404 if the ticket is not found', async () => {
    
    //Simulated id of hex type as previous error was complaining 
    //Before:  Error: Argument passed in must be a single String of 12 bytes or a string of 24 hex characters
    const id = new mongoose.Types.ObjectId().toHexString();

    await request(app)
        .get(`/api/tickets/${id}`)
        .send()
        .expect(404);
});

it('returns the ticket if the ticket is found', async () => {
    
    const title = 'concertTest'
    const price = 20;

    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title, price
        })
        .expect(201);
    
    const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    
    expect(ticketResponse.body.title).toEqual(title);
    expect(ticketResponse.body.price).toEqual(price);
});