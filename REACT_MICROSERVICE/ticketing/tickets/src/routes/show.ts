import express, { Request, Response } from 'express'
import { Ticket } from '../models/ticket';
import { NotFoundError} from '@ticket-share/common';

const router = express.Router();

router.get('/api/tickets/:id', async (req: Request, res: Response) => {
    //error potential
    try{
        //cast error here with object id, mongoose was previously findbyid
    const ticket = await Ticket.findByIdAndUpdate(req.params.id);

    if (!ticket) {
        throw new NotFoundError();
    }
    res.send(ticket);
    
    } catch(err){
     console.log(err);
 }
});
export { router as showTicketRouter };