import mongoose from 'mongoose';

export interface ICartModel extends mongoose.Document {
    totalPrice: number;
    totalCount: number;
    userId: mongoose.Schema.Types.ObjectId;
    date: string;
}

export const CartSchema = new mongoose.Schema({
    totalPrice: Number,
    totalCount: Number,
    userId: mongoose.Schema.Types.ObjectId,
    date: String,
}, {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    id: false,
});

CartSchema.virtual('user', {
    ref: 'UserModel',
    localField: 'userId',
    foreignField: '_id',
    justOne: true,
});




export const CartModel = mongoose.model<ICartModel>('CartModel', CartSchema, 'carts');
