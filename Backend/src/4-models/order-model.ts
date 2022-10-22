import mongoose from 'mongoose';
import { OrderStatus } from './order-status';


export interface IOrderModel extends mongoose.Document {
    items: Array<any>;
    totalPrice: number;
    city: string;
    street: string;
    latLng: Array<number>;
    creditCard: string;
    date: string;
    orderStatus: OrderStatus;
    userId: mongoose.Schema.Types.ObjectId;
}

export const OrderSchema = new mongoose.Schema({
    items: { type: Array, required: true },
    totalPrice: Number,
    city: String,
    street: String,
    latLng: Array,
    creditCard: String,
    date: String,
    createdAt: String,
    orderStatus: { type: String, default: OrderStatus.pending },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserModel' , sparse:true },
}, {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    id: false,
});

OrderSchema.virtual('user', {
    ref: 'UserModel',
    localField: 'userId',
    foreignField: '_id',
    justOne: true,
});



export const OrderModel = mongoose.model<IOrderModel>('OrderModel', OrderSchema, 'orders');
