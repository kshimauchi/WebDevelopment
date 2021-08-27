import  express, {Request, Response} from 'express';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';

const router = express.Router();

router.get('/api/orders', async(req: Request, res: Response)=>{
    
    res.send({});
});
export {router as indexOrderRouter};