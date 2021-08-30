import  express, {Request, Response} from 'express';
import { requireAuth, validateRequest, NotFoundError, OrderStatus, BadRequestError } from '@ticket-share/common';
import { body } from 'express-validator';
import mongoose from 'mongoose';
import { Ticket} from '../models/ticket';


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
    
        const isReserved = await ticket.isReserved();

        if( isReserved ){
            throw new BadRequestError('Ticket is already reserved!');
        }
        // Calculate an expiration date for this order
        // build the order and save to db
        // publish the event the order that has been created
    res.send({});
});
export {router as newOrderRouter};