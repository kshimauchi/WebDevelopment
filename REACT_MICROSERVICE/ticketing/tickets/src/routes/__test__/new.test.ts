import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/ticket';
import { natsWrapper} from '../../nats-wrapper';

it('has a route handler listening to /api/tickets for post requests', async () => {
  const response = await request(app).post('/api/tickets').send({});

  expect(response.status).not.toEqual(404);
});

it('can only be accessed if the user is signed in', async () => {
  await request(app).post('/api/tickets').send({}).expect(401);
});

it('returns a status other than 401 if the user is signed in', async () => {
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie',global.signin())
    .send({});

  expect(response.status).not.toEqual(401);
});

it('returns an error if an invalid title is provided', async () => {
  await request(app)
    .post('/api/tickets')
    .set('Cookie',global.signin())
    .send({
      title: '',
      price: 10,
    })
    .expect(400);

  await request(app)
    .post('/api/tickets')
    .set('Cookie',global.signin())
    .send({
      price: 10,
    })
    .expect(400);
});

it('returns an error if an invalid price is provided', async () => {
  await request(app)
    .post('/api/tickets')
    .set('Cookie',global.signin())
    .send({
      title: 'asldkjf',
      price: -10, 
    })
    .expect(400);

  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title: 'laskdfj',
    })
    .expect(400);
});

it('creates a ticket with valid inputs', async () => {
  let tickets = await Ticket.find({});
  expect(tickets.length).toEqual(0);

  const title = 'asldkfj';

  await request(app)
    .post('/api/tickets')
    .set('Cookie',global.signin())
    .send({
      title,
      price: 20,
    })
    .expect(201);

  tickets = await Ticket.find({});
  expect(tickets.length).toEqual(1);
  expect(tickets[0].price).toEqual(20);
  expect(tickets[0].title).toEqual(title);
});

it('publishes an event', async()=> {
    const title = 'Valid Ticket';

        await request(app)
            .post('/api/tickets')
            .set('Cookie', global.signin())
            .send({
                title,
                price: 20
            })
            .expect(201);
            
        expect(natsWrapper.client.publish).toHaveBeenCalled();
                    
});
/*
Update
RESULT: with mock maybe fn()
  √ has a route handler listening to /api/tickets for post requests (75 ms)
  √ can only be accessed if the user is signed in (55 ms)
  √ returns a status other than 401 if the user is signed in (38 ms)
  √ returns an error if an invalid title is provided (40 ms)
  √ returns an error if an invalid price is provided (40 ms)
  √ creates a ticket with valid inputs (88 ms)
  × publishes an event (46 ms)
Test Suites: 4 passed, 4 total
Tests:       15 passed, 15 total
*/