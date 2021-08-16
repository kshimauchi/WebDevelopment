import nats, {Message, Stan} from 'node-nats-streaming';
import { randomBytes } from 'crypto';


console.clear();
//create client connect
const stan = nats.connect('ticketing', randomBytes(4).toString('hex'), {
    url: ("https://localhost:4222"),
});

stan.on('connect', () => {
  
  console.log('Listener connected to NATS');
  //rather than monitoring heart beat
  
  stan.on('close', () => {
    console.log('NATS connection closed!');
    process.exit();
  });
    //create instance and call listen
    new TicketCreatedListener(stan).listen();

  });
  
//Should be a little more graceful check on windows
process.on('SIGINT', () => stan.close());
process.on('SIGTERM', () => stan.close());

/*(1) Listener class: move later */
abstract class Listener {
  
  
  abstract subject: string;
  abstract queueuGroupName: string;
  
  //(2)initialized to pre-instalized for sucessful connection
  private client: Stan;
  
  //(3) changing to 5seconds
  protected awkWait = 5 * 1000;
  
  abstract onMessage(data: any, msg: Message): void;
  
  //(4)receives client property of type stan
  constructor(client: Stan) {
    this.client = client;
  }
  //(5) subscription options of nats instance
  subscriptionOptions() {
    return this.client
      .subscriptionOptions()
      //all emitted messages  
      .setDeliverAllAvailable()
      .setManualAckMode(true)
      //customize time acknowlegement  
      .setAckWait(this.awkWait)
      //queuegroup name is the same name as durable subscription name  
      .setDurableName(this.queueuGroupName);
    }
    //(6) create subscription ,subscription, queueGroupName, sub-options
    listen() {
    const subscription = this.client.subscribe(
      this.subject,
      this.queueuGroupName,
      this.subscriptionOptions()
    );
    //(7) now we will listen to the subscription
      subscription.on('message', (msg: Message) => {
      //log some info
      console.log(`Message Received: ${this.subject} / ${this.queueuGroupName}`);
      // get parsedMessage 
      const parsedData = this.parseMessage(msg);
      // in case we need access to more data
      this.onMessage(parsedData, msg);
    });
  }
  //(8) grabs message data
  parseMessage(msg: Message) {

    const data = msg.getData();
    //if its a string or buffer
    return typeof data === 'string'
      ? JSON.parse(data)
      // handling buffer
      : JSON.parse(data.toString('utf8'));
  }
}
// sub classing TicketCreatedListener
class TicketCreatedListener extends Listener {
  subject = 'ticket:created';
  queueuGroupName = 'payments-service';

  onMessage(data: any, msg: Message) {
    //business logic here
    console.log('Event data!', data);
    //we want to fail and timeout if business logic fails
    
    //(correctly)
    msg.ack();
    
   }
}