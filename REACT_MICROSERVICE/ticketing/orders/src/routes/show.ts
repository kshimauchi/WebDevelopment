import  express, {Request, Response} from 'express';
import {NotFoundError, requireAuth, NotAuthorizedError } from '@ticket-share/common';
import {Order} from '../models/order';

const router = express.Router();

//requireAuth
router.get('/api/orders/:orderId', requireAuth,async(req: Request, res: Response)=>{
    //look up an orderby id, with tickets associated with it
    const order = await Order.findById(req.params.orderId).populate('ticket');

    if(!order){
        throw new NotFoundError();
    }
    if(order.userId != req.currentUser!.id){
        throw new NotAuthorizedError();
    }

    res.send(order);
});
export {router as showOrderRouter};