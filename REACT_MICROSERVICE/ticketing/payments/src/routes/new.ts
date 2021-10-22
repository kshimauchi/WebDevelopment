import express, {Request, Response} from 'express';
import {
    requireAuth,
    validateRequest, 
    BadRequestError,
    NotFoundError
} from '@ticket-share/common';
//new charge object
import {body} from 'express-validator';
import { Order } from '../models/order';

const router = express.Router();

router.post('/api/payments',
 requireAuth,
 [
     body('token').not().isEmpty(), 
     body('orderId').not().isEmpty(),
     validateRequest
],
async (req: Request, res: Response)=>{
    res.send({success: true});
});
export {router as createChargeRouter};
//k8s