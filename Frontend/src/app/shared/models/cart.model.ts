import { CartItemModel } from "./cartItem.model";

export class CartModel{
    public _id: string;
    public items:CartItemModel[] = [];
    public totalPrice: number = 0;
    public totalCount: number = 0;
    public userId: string;
    public date: string;
}