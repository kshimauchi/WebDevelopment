import request from 'supertest';
import { app } from '../../app';
//super test uses http://
//we need to change the cookieSession,
// secure property to be process.env.NODE_ENV !=='test
it('returns a 201 on successful signup', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201);
});

it('returns a 400 with an invalid email', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'bademail.com',
            password: 'password'
        })
        .expect(400);

});

it('returns a 400 with an invalid password', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'bademail.com',
            password: 'bad'
        })
        .expect(400);

});

it('returns a 400 with an invalid email and invalid password', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
        })
        .expect(400);

});
//redundant alternative syntax
it('returns a 400 with an invalid email and invalid password', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 't',
            password: 'password'
        })
        .expect(400);

    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: ''
        })
        .expect(400);
});
//duplicate emails beings submitted
it('disallows duplicate emails', async () => {
    //valid email, password
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201);
    //valid email, password 400 bad request
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(400);

});


