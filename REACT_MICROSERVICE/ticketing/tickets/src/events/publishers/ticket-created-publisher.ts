import { Publisher, Subjects, TicketCreatedEvent } from '@ticket-share/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
