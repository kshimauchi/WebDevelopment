import request from 'supertest';
import { app } from '../../app';
//Execute dir: tickets, npm run test

//Request to Route Handle
it('has a route handler listening to /api/tickets for post request', async () => {
    const resp = await request(app)
        .post('/api/tickets')
        .send({});
    expect(resp.status).not.toEqual(404);
});
//
it('can only be accessed if the user is signed in', async () => {
    
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


