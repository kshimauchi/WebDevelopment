import mongoose from 'mongoose';
import { OrderStatus } from '@ticket-share/common';
import { TicketDoc } from './ticket';
 
//re-exporting to ticket
export {OrderStatus};

interface OrdersAttrs {
    userId: string,
    status: OrderStatus;
    expiresAt: Date;
    ticket: TicketDoc;
}
// same set of properties for the time building
interface OrderDoc extends mongoose.Document {
    userId: string,
    status: OrderStatus;
    expiresAt: Date;
    ticket: TicketDoc;
}

interface OrderModel extends mongoose.Model<OrderDoc>{
    build(attrs: OrdersAttrs) : OrderDoc;
}
/* 
TODO: status from order service --> payment service, watch for incomming payment
TODO: definition for TicketDoc
*/
const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: Object.values(OrderStatus),
        //Optional
        default: OrderStatus.Created
    },
    expiresAt: {
        type: mongoose.Schema.Types.Date
    },
    ticket: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ticket'
    }
    }, {
        toJSON: {
           transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            },
        },
    }
    );
orderSchema.statics.build =(attrs: OrdersAttrs )=> {
        return new Order(attrs);
};

const Order = mongoose.model<OrderDoc, OrderModel>('Order', orderSchema);

export {Order};