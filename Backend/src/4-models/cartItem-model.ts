import mongoose from 'mongoose';

export interface ICartItemModel extends mongoose.Document {
     product: mongoose.Schema.Types.ObjectId;
        quantity: number;
        price: number;
        cartId: mongoose.Schema.Types.ObjectId;
}

export const CartItemSchema = new mongoose.Schema({
    product: mongoose.Schema.Types.ObjectId,
    quantity: Number,
    price: Number,
    cartId: mongoose.Schema.Types.ObjectId,
}, {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    id: false,
});

CartItemSchema.virtual('product', {
    ref: 'ProductModel',
    localField: 'productId',
    foreignField: '_id',
    justOne: true,
});


export const CartItemModel = mongoose.model<ICartItemModel>('CartItemModel', CartItemSchema, 'cartItems');