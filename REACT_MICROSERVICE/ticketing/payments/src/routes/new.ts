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
import { stripe } from '../stripe';

const router = express.Router();

router.post('/api/payments',
 requireAuth,
 [
     body('token').not().isEmpty(), 
     body('orderId').not().isEmpty(),
     validateRequest
],
async (req: Request, res: Response)=>{
    //destructing the token and id off the request body
    const { token, orderId } = req.body;
    //find the order
    const order = await Order.findById(orderId);
    //check if the order was found in database
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
    //create a charge using stripe: see stripe doc, for additional options
    //(1) we will be testing with a secret token
    await stripe.charges.create({
        currency: 'usd',
        amount: order.price*100,
        source: token
    });
    //if all of these checks pass than we return a generic response
    res.status(201).send({success: true});
});
export {router as createChargeRouter};
//k8s