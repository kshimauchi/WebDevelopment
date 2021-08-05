import request from 'supertest';
import { app } from '../../app';


//TODO tickets, ( npm run test )

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

it('returns a status other 401 if the user is signed in', async () => {
    //we do not to have inter-service dependency so we do
    //not want to reach inside the auth service
    //we need a cookie of sort
    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({})
    console.log(response.status);
    expect(response.status).not.toEqual(401);

});
//
it('returns an error if an invalid title is provided', async () => {
    
});
//
it('returns an error if an invalid price is provided', async () => {

});
//
it('creates a ticket with valid inputs', async () => {

});


