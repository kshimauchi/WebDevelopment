import express, { Request, Response } from 'express'
import { Ticket } from '../models/ticket';
import { NotFoundError, BadRequestError} from '@ticket-share/common';
import mongoose from 'mongoose';

const router = express.Router();

router.get('/api/tickets/:id', async (req: Request, res: Response) => {
    //error potential

    
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
        throw new NotFoundError();
    }
    res.send(ticket);

    console.log(ticket);
});
export { router as showTicketRouter };