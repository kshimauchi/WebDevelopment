import mongoose from 'mongoose';
//(1) new model for future implementation of order and payment association
//(2) Payment order is never going to change, so we dont need a verion on PaymentDoc
//(3) Good Practice would say you should add a version 
interface PaymentAttrs{
    orderId: string;
    stripeId: string;
}
interface PaymentDoc extends mongoose.Document {
    orderId: string;
    stripeId: string;
    //version: number;
}
interface PaymentModel extends mongoose.Model<PaymentDoc>{
    build(attrs: PaymentAttrs): PaymentDoc;
}
const paymentSchema = new mongoose.Schema({
    orderId: {
        required: true,
        type: String
    },
    stripeId: {
        required: true,
        type: String
    }
},{
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        }
    }
});
paymentSchema.statics.build = (attrs: PaymentAttrs)=>{
    return new Payment(attrs);
};
const Payment = mongoose.model<PaymentDoc, PaymentModel>('Payment', paymentSchema);
export { Payment };