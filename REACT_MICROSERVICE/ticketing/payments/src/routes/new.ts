import express, {Request, Response} from 'express';
import {
    requireAuth,
    validateRequest, 
    BadRequestError,
    NotFoundError,
    NotAuthorizedError,
    OrderStatus,
    
} from '@ticket-share/common';
//new charge object
import {body} from 'express-validator';
import { Order } from '../models/order';
import { stripe } from '../stripe';
import { Payment } from '../models/payment';
import { PaymentCreatedPublisher } from '../events/publishers/payment-created-publisher';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.post('/api/payments',
 requireAuth,
 [
     body('token').not().isEmpty(), 
     body('orderId').not().isEmpty(),
     validateRequest,
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
    const charge = await stripe.charges.create({
        currency: 'usd',
        amount: order.price*100,
        source: token,
    });
    const payment = Payment.build({
        orderId,
        stripeId: charge.id,
    });
    await payment.save();
    
    new PaymentCreatedPublisher(natsWrapper.client).publish({
        id: payment.id,
        orderId: payment.orderId,
        stripeId: payment.stripeId,
    });
    //verify id in test
    res.status(201).send({id: payment.id});
});
export {router as createChargeRouter};
