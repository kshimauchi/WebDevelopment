import express, { Request, Response } from 'express';
import { Ticket } from '../models/ticket';


const router = express.Router();

router.get('/api/tickets', async (req: Request, res: Response) => {
    //Empty object for filtering or for all tickets
    const tickets = await Ticket.find({});
    //Send it back
    res.send(tickets);
});
export { router as indexTicketRouter };