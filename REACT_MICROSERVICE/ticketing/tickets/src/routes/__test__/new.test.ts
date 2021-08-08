import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/ticket';

//Test Ticket: dir ticketing/tickets, ( npm run test )

//Request to Route Handle
it('has a route handler listening to /api/tickets for post request', async () => {
    const resp = await request(app)
        .post('/api/tickets')
        .send({});
    expect(resp.status).not.toEqual(404);
});
//Simulate request without being signed in
it('can only be accessed if the user is signed in', async () => {
    const response = await request(app)
        .post('/api/tickets')
        .send({})
        .expect(401);
    //expect(response.status).toEqual(401);
});

// we do not to have inter-service dependency so we do
// not want to reach inside the auth service
// we need a cookie of sort
it('returns a status other 401 if the user is signed in', async () => {

    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({})
    
    expect(response.status).not.toEqual(401);

});
// Valid: price, Invalid: title
it('returns an error if an invalid title is provided', async () => {
    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: '',
            price: 10
        })
        .expect(400);
        //Should throw RequestValidationError
});

//Invalid Title and Price
it('returns an error if an invalid price is provided', async () => {
    //Valid: title, Invalid: price
    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: 'valid',
            price: -10,
        })
        .expect(400);
    
    //InValid: title, Invalid: price
    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: '',
            price: 0,
        })
        .expect(400);
});
        
it('creates a ticket with valid inputs', async () => {
    //(1) We delete all records on db
    //(2) This should fail fast
    let tickets = await Ticket.find({});
    expect(tickets.length).toEqual(0);

    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: 'Valid Ticket',
            price: 20,
        })
        .expect(201);
    
    tickets = await Ticket.find({});
    expect(tickets.length).toEqual(1);
    expect(tickets[0].price).toEqual(20);
});
/*
RESULT:
  √ has a route handler listening to /api/tickets for post request (42 ms)
  √ can only be accessed if the user is signed in (24 ms)
  √ returns a status other 401 if the user is signed in (18 ms)
  √ returns an error if an invalid title is provided (17 ms)
  √ returns an error if an invalid price is provided (25 ms)
  √ creates a ticket with valid inputs (33 ms)
*/