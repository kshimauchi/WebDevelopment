import mongoose from 'mongoose';

interface OrdersAttrs {
    userId: string,
    status: string;
    expiresAt: Date;
    ticket: TicketDoc;
}
// same set of properties for the time building
interface OrderDoc extends mongoose.Document {
    userId: string,
    status: string;
    expiresAt: Date;
    ticket: TicketDoc;
}

interface OrderModel extends mongoose.Model<OrderDoc>{
    build(attrs: OrdersAttrs) : OrderDoc;
}
/* 
    TODO: status from order service --> payment service, watch for incomming payment
    a) faulty credit card if fails, emit orderservice the order fail, status = fail
    b) Order fail event look inside db find order with id of event data
    c) update the status of the order
    d) we need multiple service for status, the same string the exact and will lead to issues
    e) define in common library and define order status, and and exact string value
    
    TODO: definition for TicketDoc

*/
const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
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
            transform(doc, ret){
                ret.id = ret._id;
                delete ret._id;
            }
        }
    });
orderSchema.statics.build =(attrs: OrdersAttrs )=> {
        return new Order(attrs);
};

const Order = mongoose.model<OrderDoc, OrderModel>('Order', orderSchema);

export {Order};