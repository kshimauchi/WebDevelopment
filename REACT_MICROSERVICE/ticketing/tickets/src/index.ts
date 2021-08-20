import mongoose from 'mongoose';

import { app } from './app';
import { natsWrapper} from './nats-wrapper';


const start = async () => {
    //could be local but were using a cluster ip service
    //capture jwt key error if not defined
    if (!process.env.JWT_KEY) {
        
        throw new Error('JWT_KEY must be defined');
    }
    
    if (!process.env.MONGO_URI) {
        
        throw new Error('MONGO_URI must be defined');
    }
    // (1) refactoring connect from nats-wraper
    try {
        //nats depl: args cid=ticketing, random str, and url service with port
        await natsWrapper.connect('ticketing','blah', 'http://nats-srv:4222');

        await mongoose.connect( process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('connected to mongodb');
    } catch (err) {
        console.error(err);
    }
    app.listen(3000, () => {
        console.log("Listening on port 3000!!!!!!!!");
    });
};
start();