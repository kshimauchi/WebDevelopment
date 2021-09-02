import { Publisher, OrderCreatedEvent, Subjects} from '@ticket-share/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
