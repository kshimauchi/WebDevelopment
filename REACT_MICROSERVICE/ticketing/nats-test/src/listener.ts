import nats, {Message} from 'node-nats-streaming';
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
        console.log(
        `Received event #${msg.getSequence()}, with data: ${(data)} at ${msg.getTimestamp()} `
      );
    }
    //acknowledge message
    msg.ack();
   });
});
//Should be a little more graceful check on windows
process.on('SIGINT', () => stan.close());
process.on('SIGTERM', () => stan.close());
