import request from 'supertest';
import { app } from '../../app';


//global function defined in test/setup
it('responds with details about current user', async () => {
    const cookie = await global.signin();

    const response = await request(app)
        .get('/api/users/currentuser')
        .set('Cookie', cookie)
        .send()
        .expect(400);
    expect(response.body.currentUser.email).toEqual(
        'test@test.com'
    )
});
//given a user is not authenticated, test null
it('responds with null if not authenticated', async () => {
    //global function defined in test/setup
    const response = await request(app)
        .get('/api/users/currentuser')
        .send()
        .expect(200);
    expect(response.body.currentUser).toEqual(
        null
    )
});
//refactoring auth to a globally signin function
