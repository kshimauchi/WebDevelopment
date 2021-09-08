import { Message } from 'node-nats-streaming';
import { Subjects, Listener, TicketUpdatedEvent } from '@ticket-share/common';
import { Ticket } from '../../models/ticket';
import { queueGroupName } from './queue-group-name';

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
  queueGroupName = queueGroupName;

  async onMessage(data: TicketUpdatedEvent['data'], msg: Message) {
    //  we need both ticketid and previous version
    // if we cannot find this we will throw an error
    // refactored out this logic to Schema.statics
    // of models ticket
    const ticket = await Ticket.findByEvent(data);
    
    if(!ticket){
      throw new Error('Ticket Not Found');
    }
    // the version property is on this and rather than using
    // the plugin we want to replace
    // then we want to customize the update to inject
    const { title, price } = data;
    ticket.set({ title, price });
    await ticket.save();

    msg.ack();
  }
}