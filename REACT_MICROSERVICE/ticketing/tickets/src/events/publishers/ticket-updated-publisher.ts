import { Publisher, Subjects, TicketUpdatedEvent } from '@ticket-share/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated= Subjects.TicketUpdated;
}