import { CartModel } from "./cart.model";
import { ProductModel } from "./product.model";

export class CartItemModel{

    constructor(public product:ProductModel){
       
    }

    public _id: string;
    public productId: string;
    public quantity: number = 1;
    public price: number = this.product.price;
    public cartId: string;
    public cart: CartModel;
    
     
}