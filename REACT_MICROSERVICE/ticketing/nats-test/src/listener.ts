import nats from 'node-nats-streaming';
import { randomBytes } from 'crypto';
import { TicketCreatedListener } from './events/ticket-created-listener';

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

process.on('SIGINT', () =>  stan.close());
process.on('SIGTERM', () =>  stan.close());

