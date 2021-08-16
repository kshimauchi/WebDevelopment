import { Message, Stan } from 'node-nats-streaming';
import { Subjects } from './subjects';

// (2) Defining an event using interface, and that event will have a subject
// (3) for an object to be considered and event it must
// have a subject from Submject (a) subject 
// and data from ticket-created interface (b) data
// lastly we have an event and that event must contain both
// a subject and data...
interface Event {
    subject: Subjects;
    data: any;
}
// Generified using custom types
// Event interface which takes a subject from Subjects
// ticketCreatedEvent which defines a type definition for
// The structure of the data associated
export abstract class Listener<T extends Event> {
    
    abstract subject: T['subject'];
    abstract queueuGroupName: string;
    
    private client: Stan;
    protected awkWait = 5 * 1000;
    // defined data in    
    abstract onMessage(data: T['data'], msg: Message): void;
    
    constructor(client: Stan) {
        this.client = client;
    }
 
    subscriptionOptions() {
        
        return this.client
            .subscriptionOptions()
            .setDeliverAllAvailable()
            .setManualAckMode(true)
            .setAckWait(this.awkWait)
            .setDurableName(this.queueuGroupName);
    }
    
    listen() {
        
        const subscription = this.client.subscribe(
            this.subject,
            this.queueuGroupName,
            this.subscriptionOptions()
        );
    
        subscription.on('message', (msg: Message) => {
      
            console.log(`Message Received: ${this.subject} / ${this.queueuGroupName}`);
      
            const parsedData = this.parseMessage(msg);
      
            this.onMessage(parsedData, msg);
        });
    }
    
    parseMessage(msg: Message) {
        const data = msg.getData();
        
        return typeof data === 'string' ? JSON.parse(data) : JSON.parse(data.toString('utf8'));
    }
}
