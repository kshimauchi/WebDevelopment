import mongoose from 'mongoose';
import  express, {Request, Response} from 'express';
import { body } from 'express-validator';

import { Ticket} from '../models/ticket';
import { 
    requireAuth, 
    validateRequest, 
    NotFoundError,
    OrderStatus, 
    BadRequestError } 
from '@ticket-share/common';

import { Order } from '../models/order';
import { OrderCreatedPublisher} from '../events/publishers/order-created-publisher';
import { natsWrapper } from '../nats-wrapper';

/* (Window of time a user has to purchase a ticket)
    ***Options that could be considered for implementation***
(1) Create a record and save to database
(2) Add to kubectl as a secret
(3) and maybe env, use like in properties file
(4) add as some per user setting
*/
const EXPIRATION_WINDOW_SECONDS = 15*60;

const router = express.Router();

router.post('/api/orders', requireAuth,
[
    body('ticketId')
        .not()
        .isEmpty()
        .custom((input: string)=> mongoose.Types.ObjectId(input))
        .withMessage('TicketId must be provided'),
],  validateRequest,
 
    async(req: Request, res: Response)=>{
        // Find the ticket user is trying to order
        const { ticketId } = req.body;

        const ticket = await Ticket.findById(ticketId);

        if(!ticket){
            //throw new BadRequestError('Ticket is already reserved!'); testing expectation
            throw new NotFoundError();
        }
        // Refactored to @ticket-share/common: find an order on the ticket which has the correct status
        const isReserved = await ticket.isReserved();
        if( isReserved ){
            throw new BadRequestError('Ticket is already reserved!');
        }
        // Calculate an expiration date for this order
        const expiration = new Date();
        // sets a user window of time to confirm a order
        expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS);
        // build the order and save to db
        const order = Order.build({
            userId: req.currentUser!.id,
            status: OrderStatus.Created,
            expiresAt: expiration,
            //ticket: ticket abbreviated
            ticket,
        });
        await order.save();
        
        // publish the event the order that has been created
        new OrderCreatedPublisher(natsWrapper.client).publish({
            id: order.id,
            version: order.version,
            status: order.status,
            userId: order.userId,
            expiresAt: order.expiresAt.toISOString(),
            
            ticket: {
                id : ticket.id,
                price: ticket.price,
            },
        });
        res.status(201).send(order);
      
        // res.send({});
});
export {router as newOrderRouter};