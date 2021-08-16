import { Message } from 'node-nats-streaming';
import { Listener } from './base-listener';

export class TicketCreatedListener extends Listener {
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