import request from 'supertest';
import { app } from '../../app';


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
        
// add in a check to see if a ticket was saved to mongo 
// we will need to build a model for mongoose typescript
// similar to auth service
it('creates a ticket with valid inputs', async () => {
    await request(app)
        .post('/api/tickets')
        .send({
            title: 'Valid Ticket',
            price: 20,
        })
        //needs model build for a ticket
        .expect(201);
});
