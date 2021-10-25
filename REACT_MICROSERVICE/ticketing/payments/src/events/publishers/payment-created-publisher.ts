import { Subjects, Publisher, PaymentCreatedEvent} from '@ticket-share/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent>{
    subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
