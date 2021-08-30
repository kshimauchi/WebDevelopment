import mongoose from 'mongoose';
import { Order, OrderStatus } from './order';

interface TicketAttrs {
  title: string;
  price: number;
}

export interface TicketDoc extends mongoose.Document {
  title: string;
  price: number;
  isReserved(): Promise<boolean>;
}

interface TicketModel extends mongoose.Model<TicketDoc> {
  build(attrs: TicketAttrs): TicketDoc;
}

const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);
// statics allows us access to the overall collection
ticketSchema.statics.build = (attrs: TicketAttrs) => {
  return new Ticket(attrs);
};
    // Make sure that this ticket has not already reserved
    // Run query to look at all orders.  Find an order where the ticket
    // is the ticket we just found and the orders status is not cancelled
    // if we find an order from that means the ticket is reserved

// do not use an arrow function here due to arrow functions convuluting the meaning of (this)
ticketSchema.methods.isReserved = async function (){
  // this === the ticket document that we just called 'isReserved' on
  const existingOrder = await Order.findOne({
    // this ===(this as any) for this (ts-version)
    ticket: this as any,
    status: {
      $in: [
        OrderStatus.Created,
        OrderStatus.AwaitingPayment,
        OrderStatus.Complete,
      ],
    },
  });
  //takes existingOrder and if it null (!)flips to true(!)flips it to false
  //vice-versa if its defined (!)flips to false (!) flips to true
  return !!existingOrder;
};
const Ticket = mongoose.model<TicketDoc, TicketModel>('Ticket', ticketSchema);

export { Ticket };