import { app } from '../../app';
import request from 'supertest';
import mongoose from 'mongoose';
/* 
Setup: need valid tickets to run 2 and 3
we need a valid mongoId
*/
async function asyncThrowOrNot(shouldThrow = false) {
    if (shouldThrow) {
      throw new Error('shouldThrow was true');
    }
    return 'success';
};

it('should throw if passed true', async () => {
    try {
      await asyncThrowOrNot(true);
    } catch (error) {
      expect(error).toEqual(new Error('shouldThrow was true'));
    }
});

//(1)
it('returns an error if the ticket does not exist', async()=>{
    const ticketId = mongoose.Types.ObjectId();

    await request(app)
        .post('/api/orders')
        .set('Cookie', global.signin())
        .send({ticketId})
        .expect(404);
    
});
//(2)
it('returns an error if the ticket is already reserved', async()=>{
  
});
//(3)
it('successfully reserves a ticket', async()=>{
    
});