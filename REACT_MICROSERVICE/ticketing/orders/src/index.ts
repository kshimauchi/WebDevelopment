import mongoose from 'mongoose';
import { app } from './app';
import { natsWrapper } from './nats-wrapper';
import {TicketCreatedListener} from './events/listeners/ticket-created-listener';
import {TicketUpdatedListener} from './events/listeners/ticket-updated-listener';
import { ExpirationCompleteListener } from './events/listeners/expiration-complete-listener';
import { PaymentCreatedListener } from './events/listeners/payment-created-listener';

const start = async () => {
    console.log('Starting...');
    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KEY must be defined');
    }
    
    if ( !process.env.MONGO_URI ) {
        throw new Error('MONGO_URI must be defined');
    }
    if ( !process.env.NATS_CLIENT_ID ){
        throw new Error('NATS_CLIENT_ID must be defined ');
    }
    if ( !process.env.NATS_URL ){
        throw new Error('NATS_URL must be defined');
    }
    if ( !process.env.NATS_CLUSTER_ID ) {
        throw new Error('NATS_CLUSTER_ID must be defined');
    }

    try {
        //moved to deployment
        await natsWrapper.connect(
            process.env.NATS_CLUSTER_ID,
            process.env.NATS_CLIENT_ID, 
            process.env.NATS_URL
        );
            
        natsWrapper.client.on('close', () => {
            console.log('NATS connection closed!');
            process.exit();
        });    
     
        process.on('SIGINT', () =>  natsWrapper.client.close());
        process.on('SIGTERM', () => natsWrapper.client.close());
        //(1) Creating instance of our ticketCreatedListener
        new TicketCreatedListener(natsWrapper.client).listen();
        //(2) Created instance of ticketUpdated Events
        new TicketUpdatedListener(natsWrapper.client).listen();
        //(3) Created instance of the ExpirationationCompleteListener
        new ExpirationCompleteListener(natsWrapper.client).listen();
        //(4) Created instance of the PaymentsCreatedListener
        new PaymentCreatedListener(natsWrapper.client).listen();
        
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