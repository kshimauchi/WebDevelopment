import  express, {Request, Response} from 'express';
import  { NotAuthorizedError, requireAuth,NotFoundError } from '@ticket-share/common';
import {Order, OrderStatus} from '../models/order';

const router = express.Router();

// Change of status is not really a delete but patch
router.delete('/api/orders/:orderId',
    requireAuth, 
    async(req: Request, res: Response)=>{

    const { orderId }= req.params;

    const order = await Order.findById(orderId);

    if(!order){
        throw new NotFoundError();
    }
    if(order.userId !== req.currentUser!.id){
        throw new NotAuthorizedError();
    }
    order.status = OrderStatus.Cancelled;

    await order.save();
    
    // publish event to say that this was cancelled

    res.status(204).send(order);
});
export {router as deleteOrderRouter};