import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartModel } from '../shared/models/cart.model';
import { CartItemModel } from '../shared/models/cartItem.model';
import { ProductModel } from '../shared/models/product.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart: CartModel = this.getCartFromLocalStorage();
  private cartSubject: BehaviorSubject<CartModel> = new BehaviorSubject(this.cart);
  static getCart: any;


  constructor(private http: HttpClient,private userService:UserService) { }

   public async addToCart(product:ProductModel):Promise<void>{
    let cartItem = this.cart.items.find(item => item.product._id === product._id);

    if(cartItem)
       return;
              
    this.cart.items.push(new CartItemModel(product));
    this.cart.userId = this.userService.currentUser._id
    this.cart.date = new Date().toLocaleDateString();
 
    this.setCartToLocalStorage();
    

  }


  removeFromCart(_id:string):void{
    this.cart.items = this.cart.items.filter( item => item.product._id != _id);
    this.setCartToLocalStorage();
  };

  changeQuantity(_id:string, quantity:number){
    let CartItem = this.cart.items.find( item => item.product._id === _id);

    if(!CartItem)
      return;

    CartItem.quantity = quantity;
    CartItem.price = quantity * CartItem.product.price;
    this.setCartToLocalStorage();
  }

  clearCart(){
    this.cart = new CartModel();
    this.setCartToLocalStorage();
  }

  getCartObservable():Observable<CartModel>{
    return this.cartSubject.asObservable();
  }

  getCart():CartModel{
    return this.cartSubject.value
  }

  private setCartToLocalStorage():void{
    this.cart.totalPrice = this.cart.items
    .reduce((prevSum, currentItem) => prevSum + currentItem.price, 0);

    this.cart.totalCount = this.cart.items
    .reduce((prevSum, currentItem) => prevSum + currentItem.quantity, 0)

    const cartJson = JSON.stringify(this.cart);
    localStorage.setItem('Cart', cartJson);
    this.cartSubject.next(this.cart)
  }

  private getCartFromLocalStorage():CartModel{
    const cartJson = localStorage.getItem('Cart');
    return cartJson? JSON.parse(cartJson) : new CartModel();
  }

  

}
