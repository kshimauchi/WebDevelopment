import request from 'supertest';
import { app } from '../../app';


it('returns 404 if the ticket is not found', async () => {
    await request(app)
        .get('/api/tickets/badticket')
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