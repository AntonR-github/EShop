import { IOrderModel, OrderModel } from "../4-models/order-model";
import { OrderStatus } from "../4-models/order-status";
import alert from "alert";




async function addOrder (order: IOrderModel): Promise<IOrderModel> {
    const orders = await OrderModel.find({date: order.date});
    if (orders.length >= 3) {
        alert("There are already 3 orders for this date. Please choose another date.");
        throw new Error("You can't order more than 3 times a day");
    }
    const newOrder = new OrderModel(order);
    await newOrder.save();
    return newOrder;
    
}


async function getPendingOrdersForCurrentUserByUserId(userId: string): Promise<IOrderModel> {
    const order = await OrderModel.findOne({userId: userId, orderStatus: OrderStatus.pending});
    return order;
   
}

async function updateOrderStatusToPaid(orderId: string, fourDigits: string): Promise<IOrderModel> {
    const order = await OrderModel.findByIdAndUpdate(orderId, {orderStatus: OrderStatus.paid, creditCard: fourDigits});
    return order;
}

async function getAllPaidOrdersForCurrentUserByUserId(userId: string): Promise<IOrderModel[]> {
    const orders = await OrderModel.find({userId: userId, orderStatus: OrderStatus.paid});
    return orders;
}

async function getAllOrders(): Promise<IOrderModel[]> {
    const orders = await OrderModel.find();
    return orders;
}

async function getOrderByOrderId(id: string): Promise<IOrderModel> {
    const order = await OrderModel.findById(id);
    return order;
}


export default {
    addOrder,
    getPendingOrdersForCurrentUserByUserId,
    updateOrderStatusToPaid,
    getAllPaidOrdersForCurrentUserByUserId,
    getAllOrders,
    getOrderByOrderId
                          
}