import request from 'supertest';
import { app } from '../../app';

it('responds with details about current user', async () => {
    //global function defined in test/setup
    const cookie = await global.signin();

    const response = await request(app)
        .get('/api/users/currentuser')
        .set('Cookie', cookie)
        .send()
        .expect(200);
    expect(response.body.currentUser.email).toEqual(
        'test@test.com'
    )
});
//refactoring auth to a globally signin function
