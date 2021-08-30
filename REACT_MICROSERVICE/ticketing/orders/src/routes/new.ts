import  express, {Request, Response} from 'express';
import { requireAuth, validateRequest, NotFoundError, OrderStatus, BadRequestError } from '@ticket-share/common';
import { body } from 'express-validator';
import mongoose from 'mongoose';
import { Ticket} from '../models/ticket';
import { Order } from '../models/order';

const router = express.Router();

router.post('/api/orders', requireAuth,[
    //(1) checking real mongoId
    body('ticketId')
        .not()
        .isEmpty()
        .custom((input: string)=> mongoose.Types.ObjectId.isValid(input))
        .withMessage('TicketId must be provided')

], validateRequest,
    
    async(req: Request, res: Response)=>{
        // Find the ticket user is trying to order
        const { ticketId } = req.body;

        const ticket = await Ticket.findById(ticketId);

        if(!ticket){
            throw new NotFoundError();
        }
        // Make sure that this ticket has not already reserved
        // Run query to look at all orders.  Find an order where the ticket
        // is the ticket we just found and the orders status is not cancelled
        // if we find an order from that means the ticket is reserved
        const existingOrder = await Order.findOne({
            ticket: ticket,
            status: {
                $in: [
                    OrderStatus.Created,
                    OrderStatus.AwaitingPayment,
                    OrderStatus.Complete
                ]
            }
        });
        if( existingOrder ){
            throw new BadRequestError('Ticket is already reserved!');
        }

        // Calculate an expiration date for this order

        // build the order and save to db

        // publish the event the order that has been created
        // TODO: create


    res.send({});
});
export {router as newOrderRouter};