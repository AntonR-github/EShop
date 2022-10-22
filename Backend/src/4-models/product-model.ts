import mongoose from 'mongoose';

export interface IProductModel extends mongoose.Document {
    productName: string;
    price: number;
    imageUrl: string;
    categoryId: mongoose.Schema.Types.ObjectId;
}

export const ProductSchema = new mongoose.Schema({
    productName: String,
    price: Number,
    imageUrl: String,
    categoryId: mongoose.Schema.Types.ObjectId,
}, {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    id: false,
});

ProductSchema.virtual('category', {
    ref: 'CategoryModel',
    localField: 'categoryId',
    foreignField: '_id',
    justOne: true,
});

export const ProductModel = mongoose.model<IProductModel>('ProductModel', ProductSchema, 'products');