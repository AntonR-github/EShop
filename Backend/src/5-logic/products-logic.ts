import { CategoryModel, ICategoryModel } from "../4-models/category-mode";
import { IProductModel, ProductModel } from '../4-models/product-model';




async function getAllCategories():Promise<ICategoryModel[]>{
    return CategoryModel.find().exec();
}

async function getProductByCategory(categoryId:string):Promise<IProductModel[]>{
    return ProductModel.find({categoryId}).populate("category").exec();
}

async function addProduct(product:IProductModel,image:string):Promise<IProductModel>{
    const newProduct = new ProductModel(product);
    newProduct.imageUrl = image;
    return newProduct.save();
}

async function editProduct(product:IProductModel,image:string):Promise<IProductModel>{
    const updatedProduct = await ProductModel.findByIdAndUpdate(product._id,product,{new:true});
    return updatedProduct.save();
}

async function getAllProducts():Promise<IProductModel[]>{
    return ProductModel.find().populate("category").exec();
}

async function getProductBySearchTerm(searchTerm:string):Promise<IProductModel[]>{
    return ProductModel.find({productName:{$regex:searchTerm,$options:"i"}}).populate("category").exec();
}

async function getProductById(productId:string):Promise<IProductModel>{
    return ProductModel.findById(productId).populate("category").exec();
}


export default {
    getAllCategories,
    getProductByCategory,
    addProduct,
    getAllProducts,
    getProductBySearchTerm,
    getProductById,
    editProduct
}