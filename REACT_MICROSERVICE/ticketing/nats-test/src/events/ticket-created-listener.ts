import { Message } from 'node-nats-streaming';
import { Listener } from './base-listener';
import { Subjects } from './subjects';
import { TicketCreatedEvent } from './ticket-created-event';

// Providing argument TicketCreated as defined in the interface
export class TicketCreatedListener extends Listener<TicketCreatedEvent>{
  
  // (1) want typescript to recognize, that ticket:created
  readonly subject : Subjects.TicketCreated = Subjects.TicketCreated;

  queueuGroupName = 'payments-service';
  // valid subject names, type check
  onMessage(data: TicketCreatedEvent['data'], msg: Message) {
    //business logic here
    console.log('Event data!', data);
    //we want to fail and timeout if business logic fails
    
    //correct properties
    console.log(data.id);
    console.log(data.title);
    console.log(data.price);
    
    //if all of this is fine then we acknowledge the message
    msg.ack();
    
   }
}