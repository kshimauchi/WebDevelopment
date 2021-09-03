import { Message } from 'node-nats-streaming';
import { Subjects, Listener, TicketCreatedEvent} from '@ticket-share/common';
import { Ticket } from '../../models/ticket';
import { queueGroupName } from './queue-group-name';


export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
    
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
    queueGroupName = queueGroupName;


    async onMessage(data: TicketCreatedEvent['data'], msg: Message){
        //only call ack() when event is successfu
        const {title, price} = data;
        
        const ticket = Ticket.build({
            id,
            title,
            price,
        });
        await ticket.save();
        
        msg.ack();
        //need to work on this for concurrency issues

    }


}