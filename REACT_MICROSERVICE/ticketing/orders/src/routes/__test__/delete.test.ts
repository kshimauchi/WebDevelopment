import request from 'supertest';
import { app} from '../../app';
import { Order, OrderStatus } from '../../models/order';
import { Ticket } from '../../models/ticket';
import { natsWrapper } from '../../nats-wrapper';
import mongoose from 'mongoose';

//we are keeping this fairly brief
it('marks and order as cancelled',async()=>{
    //create a ticket with Ticket Model
    const ticket = Ticket.build({
        id: mongoose.Types.ObjectId().toHexString(),
        title: 'concert',
        price: 20
    });

    await ticket.save();

    const user = global.signin();

    const {body: order }= await request(app)
        .post('/api/orders')
        .set('Cookie',user)
        .send({ticketId: ticket.id})
        .expect(201);

    await request(app)
        .delete(`/api/orders/${order.id}`)
        .set('Cookie', user)
        .send()
        .expect(204);
    
    const updatedOrder = await Order.findById(order.id);
   
    expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
});

it('emits a order cancelled event', async()=>{
        //create a ticket with Ticket Model
        const ticket = Ticket.build({
            id: mongoose.Types.ObjectId().toHexString(),
            title: 'concert',
            price: 20
        });
    
        await ticket.save();
    
        const user = global.signin();
    
        const {body: order }= await request(app)
            .post('/api/orders')
            .set('Cookie',user)
            .send({ticketId: ticket.id})
            .expect(201);
    
        await request(app)
            .delete(`/api/orders/${order.id}`)
            .set('Cookie', user)
            .send()
            .expect(204);
    /* 
    creates a ticket (above)
    */
    expect(natsWrapper.client.publish).toHaveBeenCalled();

});
