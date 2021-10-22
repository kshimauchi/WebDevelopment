import express, {Request, Response} from 'express';
import {
    requireAuth,
    validateRequest, 
    BadRequestError,
    NotFoundError,
    NotAuthorizedError,
    OrderStatus
} from '@ticket-share/common';
//new charge object
import {body} from 'express-validator';
import { Order } from '../models/order';

const router = express.Router();

router.post('/api/payments',
 requireAuth,
 [
     body('token').not().isEmpty(), 
     body('orderId').not().isEmpty(),
     validateRequest
],
async (req: Request, res: Response)=>{
    const { token, orderId } = req.body;
    //find the order
    //should automate the tests for these three scenarios
    const order = await Order.findById(orderId);

    if(!order){
        throw new NotFoundError();
    }
    //current user is already defined at this point
    if(order.userId !== req.currentUser!.id){
        throw new NotAuthorizedError();
    }
    //check the status of the order
    if(order.status === OrderStatus.Cancelled){
        throw new BadRequestError('Cannot not pay for cancelled order');
    }
    res.send({success: true});
});
export {router as createChargeRouter};
//k8s