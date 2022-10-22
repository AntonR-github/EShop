import { LatLng } from "leaflet";
import { CartItemModel } from "./cartItem.model";


export class OrderModel{
    public _id: string;
    public items: CartItemModel[];
    public totalPrice: number;
    public city: string;
    public street: string;
    public latLng: LatLng;
    public creditCard: string;
    public createdAt: string;
    public date: string;
    public orderStatus: string;
    public userId:string;
    public cartId:string;
}