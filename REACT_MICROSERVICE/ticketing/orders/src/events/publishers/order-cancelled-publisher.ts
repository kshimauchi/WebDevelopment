import { Publisher, OrderCancelledEvent, Subjects} from '@ticket-share/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
   subject : Subjects.OrderCancelled = Subjects.OrderCancelled;
}
    