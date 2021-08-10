import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
    validateRequest,
    NotFoundError,
    requireAuth,
    NotAuthorizedError
} from '@ticket-share/common';

import { Ticket } from '../models/ticket';

const router = express.Router();

router.put('/api/tickets/:id', requireAuth, async (req: Request, res: Response) => {
    const ticket = await Ticket.findById(req.params.id);
    
    if (!ticket) {
        throw new NotFoundError();
    }
    // fail by commenting this out  expected 401 "Unauthorized", got 200 "OK"
    if (ticket.userId !== req.currentUser!.id) {
        throw new NotAuthorizedError();
    }
    res.send(ticket);
});

export { router as updateTicketRouter };