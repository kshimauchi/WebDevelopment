import request from 'supertest';
import { app } from '../../app';

/* Access to all tickets no sign on is required */
const createTicket = () => {
    return (
        request(app)
            .post('/api/ticket')
            .set('Cookie', global.signin())
            .send({
                title: 'fdafdsa',
                price: 20
            })
    );
}
it('Can fetch a list of tickets', async () => {
    await createTicket(); 
    await createTicket();
    await createTicket();
    
    const response = await request(app)
        .get('/api/tickets')
        .send()
        .expect(200);
    
    //returns array of objects
    //return 404 cause the route is not defined as of yet
    expect(response.body.length).toEqual(3);

});