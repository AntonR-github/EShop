import express, { NextFunction, Request, Response } from "express";
import { ProductModel } from "../4-models/product-model";
import productsLogic from "../5-logic/products-logic";
import asyncHandler from 'express-async-handler'
import upload from '../3-middleware/upload';


const router = express.Router();

router.get("/categories/", asyncHandler( async (request: Request, response: Response, next: NextFunction) => {
    try {
        const categories = await productsLogic.getAllCategories();
        response.json(categories);
    }
    catch (err: any) {
        next(err);
    }
}
));

router.get("/product-by-category/:categoryId", asyncHandler(  async (request: Request, response: Response, next: NextFunction) => {
    try {
        const categoryId = request.params.categoryId;
        const products = await productsLogic.getProductByCategory(categoryId);
        response.json(products)
    }
    catch (err: any) {
        next(err);
    }
}
)); 

router.post("/products/", upload.single("image"),asyncHandler( async (request: Request, response: Response, next: NextFunction) => {
       
    try {
        const product = request.body;
        const image = request.body.imageUrl;
        const addedProduct = await productsLogic.addProduct(product,image);
        response.status(201).json(addedProduct);
      
    }
    catch (err: any) {
        next(err);
    }
}
));

router.put("/products/", upload.single("image"), asyncHandler( async (request: Request, response: Response, next: NextFunction) => {
    try {
        const product = request.body;
        const image = request.body.imageUrl;
        const updatedProduct = await productsLogic.editProduct(product,image);
        response.json(updatedProduct);
    }
    catch (err: any) {
        next(err);
    }
}
));



router.get("/products/", asyncHandler( async (request: Request, response: Response, next: NextFunction) => {
    try {
        const products = await productsLogic.getAllProducts();
        response.json(products);
    }
    catch (err: any) {
        next(err);
    }
}
));

router.get("/products/search/:searchTerm", asyncHandler( async (request: Request, response: Response, next: NextFunction) => {
    try {
        const searchTerm = request.params.searchTerm;
        const products = await productsLogic.getProductBySearchTerm(searchTerm);
        response.json(products)
    }
    catch (err: any) {
        next(err);
    }
}
));

router.get("/products/:_id", asyncHandler( async (request: Request, response: Response, next: NextFunction) => {
    try {
        const productId = request.params._id;
        const product = await productsLogic.getProductById(productId);
        response.json(product)
    }   
    catch (err: any) {
        next(err);
    }
}
));





export default router;