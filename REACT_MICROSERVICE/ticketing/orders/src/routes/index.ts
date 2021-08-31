import  express, {Request, Response} from 'express';
import { requireAuth} from '@ticket-share/common';
import { Order } from '../models/order';


const router = express.Router();

router.get('/api/orders', requireAuth, async(req: Request, res: Response)=>{
    //Orders are tied to particular user, only accessible by auth
    //find orders that belong to this user
    //orders have a userId who owns this order
    const orders = await Order.find({
    // all orders
        userId: req.currentUser!.id,
    //we also want the tickets associated with them 
    }).populate('ticket');
    // send the list back
    res.send(orders);
});
export {router as indexOrderRouter};