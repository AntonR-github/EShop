import mongoose from "mongoose";

export interface ICategoryModel extends mongoose.Document {
    categoryName: string;
}

export const CategorySchema = new mongoose.Schema({
    categoryName: { type: String, required: true },
});

export const CategoryModel = mongoose.model<ICategoryModel>("CategoryModel", CategorySchema, "categories");