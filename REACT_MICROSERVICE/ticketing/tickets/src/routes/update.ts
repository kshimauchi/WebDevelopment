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

//TODO: clean section up for clarity
router.put('/api/tickets/:id', requireAuth,
    [
        body('title')
            .not()
            .isEmpty()
            .withMessage('Title is required'),
        body('price')
            .isFloat({ gt: 0 })
            .withMessage('Price must be provided and greater than 0')
        
    ],
    validateRequest,
   
    async (req: Request, res: Response) => {
    
    const ticket = await Ticket.findById(req.params.id);
    
    if (!ticket) {
        throw new NotFoundError();
    }
    
    // fail by commenting this out  expected 401 "Unauthorized", got 200 "OK"
    if (ticket.userId !== req.currentUser!.id) {
        throw new NotAuthorizedError();
    }
    
        ticket.set({
            title: req.body.title,
            price: req.body.price
        });

        await ticket.save();
    
    res.send(ticket);
});

export { router as updateTicketRouter };