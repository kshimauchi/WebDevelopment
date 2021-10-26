import express, { Request, Response } from 'express';
import { Ticket } from '../models/ticket';

const router = express.Router();

router.get('/api/tickets', async (req: Request, res: Response) => {
    //Empty object for filtering or for all tickets
    //(1) updating to only show available to tickets
    //(2) only tickets which do not have an order
    const tickets = await Ticket.find({
        orderId: undefined
    });
    //Send it back
    res.send(tickets);
});
export { router as indexTicketRouter };