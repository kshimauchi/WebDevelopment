import { Stan } from 'node-nats-streaming';
import { Subjects } from './subjects';

// Pubisher baseclass


// (2) Event interface
interface Event {
    subject: Subjects,
    data: any;
}

export abstract class Publisher<T extends Event> {
  
    abstract subject: T['subject'];
    private client: Stan;
   
    constructor(client: Stan) {
        this.client = client;
    }
    // take the event data and publish off to the event
    publish(data: T['data']) {
       
        this.client.publish(this.subject, data, () => {
            console.log('Event publish');
        });
    }
    
}