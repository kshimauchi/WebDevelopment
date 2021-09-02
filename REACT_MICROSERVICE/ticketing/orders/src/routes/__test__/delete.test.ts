import request from 'supertest';
import { app} from '../../app';
import { Order, OrderStatus } from '../../models/order';
import { Ticket } from '../../models/ticket';

//we are keeping this fairly brief
it('marks and order as cancelled',async()=>{
    //create a ticket with Ticket Model
    const ticket = Ticket.build({
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
        .send()
        .expect(204);
    
    const updatedOrder = await Order.findById(order.id);
   
    expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
});
//We will implements this in the future
it.todo('emits a order cancelled event');
