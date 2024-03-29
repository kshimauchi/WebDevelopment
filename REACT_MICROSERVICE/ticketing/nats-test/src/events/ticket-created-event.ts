import { Subjects } from "./subjects";


//(1) We are coupling the subjects with the structure of data
export interface TicketCreatedEvent {
    subject: Subjects.TicketCreated;
    data: {
        id: string;
        title: string;
        price: number;
    };
}