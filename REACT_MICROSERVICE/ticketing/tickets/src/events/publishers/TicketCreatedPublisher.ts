import { Publisher, Subjects, TicketCreatedEvent } from '@ticket-share/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
