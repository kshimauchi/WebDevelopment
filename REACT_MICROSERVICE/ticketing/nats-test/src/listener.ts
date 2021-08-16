import nats, {Message, Stan} from 'node-nats-streaming';
import { randomBytes } from 'crypto';


console.clear();

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
  
  const options = stan.subscriptionOptions()
    // acknowlege
    .setManualAckMode(true)
    // all emitted events this could be to much traffic without the following chained functions 
    // as stand - alone its not feasible
    .setDeliverAllAvailable()
    // so creating durable subscription, nats will record whether the service 
    // has processed provided the service acknowledges the event
    .setDurableName('accounting-service');
    // The durable subscription, will look at the subscription name and process
    // events which have not been processed and once the service has processed
    // they will ensure the event was processed 
  const subscription = stan.subscribe(
    'ticket:created',
    // The queue-group with durable subscription will allow
    // nats not to dump the history on a disconnect
    'queue-group-name',
    options
  );

  subscription.on('message', (msg: Message) => {
    
    const data = msg.getData();
    
    if (typeof data === 'string') {
        console.log( `Received event #${msg.getSequence()}, with data: ${(data)} at ${msg.getTimestamp()} `);
    }
    //acknowledge message
    msg.ack();
   });
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
  
  //(3)receives client property of type stan
  constructor(client: Stan) {
    this.client = client;
  }
  //(4) subscription options of nats instance
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
    //(5) create subscription ,subscription, queueGroupName, sub-options
    listen() {
    const subscription = this.client.subscribe(
      this.subject,
      this.queueuGroupName,
      this.subscriptionOptions()
    );
    //(6) now we will listen to the subscription
      subscription.on('message', (msg: Message) => {
      //log some info
      console.log(`Message Received: ${this.subject} / ${this.queueuGroupName}`);
      // get parsedMessage 
      const parsedData = this.parseMessage(msg);
      // in case we need access to more data
      this.onMessage(parsedData, msg);
    });
  }
  //(7) grabs message data
  parseMessage(msg: Message) {

    const data = msg.getData();
    //if its a string or buffer
    return typeof data === 'string'
      ? JSON.parse(data)
      // handling buffer
      : JSON.parse(data.toString('utf8'));
  }
}