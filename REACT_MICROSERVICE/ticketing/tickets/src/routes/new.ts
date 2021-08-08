import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { requireAuth, validateRequest } from '@ticket-share/common';

import { Ticket } from '../models/ticket';

const router = express.Router();

router.post('/api/tickets', requireAuth, [
    //set error on incomming request, inside validate-request
    body('title')
        .not()
        .isEmpty()
        .withMessage('Title is required'),
    
    body('price')
        .isFloat({ gt: 0 })
        .withMessage('Price must be greater than 0')
    
], validateRequest, async (req: Request, res: Response) => {

    //res.sendStatus(200);
    const { title, price } = req.body;
    
    //current user is already set at this point
    // through middleware
    const ticket = Ticket.build({
        title,
        price,
        userId: req.currentUser!.id
    });
    await ticket.save();

    res.status(201)
        .send(ticket);

});
export { router as createTicketRouter };