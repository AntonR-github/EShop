import express, { NextFunction, Request, Response } from "express";
import orderLogic from "../5-logic/order-logic";
import { OrderModel } from './../4-models/order-model';
import asyncHandler from 'express-async-handler'


const router = express.Router();



router.post('/orders', asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {

       const order = new OrderModel(req.body);
       const addedOrder = await orderLogic.addOrder(order);
         res.status(201).json(addedOrder);
        
       
    }
    catch (err:any) {
        throw new Error(err);
    }
}));

router.get('/pendingOrdersForCurrentUser/:userId', asyncHandler(async (req: any, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.userId;
        const order = await orderLogic.getPendingOrdersForCurrentUserByUserId(userId);
        res.json(order);
       
    }
    catch (err:any) {
        throw new Error(err);
    }

}));

router.patch('/orders',asyncHandler( async (req: any, res: Response, next: NextFunction) => {
    try {
        const order = req.body;
        const orderId = order._id;
        const creditCard = order.creditCard;
        const fourDigits = creditCard.slice(creditCard.length - 4);
        const updatedOrder = await orderLogic.updateOrderStatusToPaid(orderId, fourDigits);
        res.json(updatedOrder); 
       
    }
    catch (err:any) {
        throw new Error(err);
    }

}));


router.get('/orders/:id', asyncHandler(async (req: any, res: Response, next: NextFunction) => {

    try {
        const userId = req.params.id;
        const orders = await orderLogic.getAllPaidOrdersForCurrentUserByUserId(userId);
        res.json(orders);
       
    }
    catch (err:any) {
        throw new Error(err);
    }
}));


router.get('/orders', asyncHandler(async (req: any, res: Response, next: NextFunction) => {

    try {
        const orders = await orderLogic.getAllOrders();
        res.json(orders);

    }
    catch (err:any) {
        throw new Error(err);
    }
}));


router.get('/receipt/:id', asyncHandler(async (req: any, res: Response, next: NextFunction) => {

    try {
        const orderId = req.params.id;
        const order = await orderLogic.getOrderByOrderId(orderId);
        res.json(order);
    
    }
    catch (err:any) {
        throw new Error(err);
    }
}));






export default router;