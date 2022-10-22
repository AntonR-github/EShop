import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { CartModel } from 'src/app/shared/models/cart.model';
import { CartItemModel } from 'src/app/shared/models/cartItem.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart: CartModel;

  constructor(private cartService: CartService) {
    this.cartService.getCartObservable().subscribe((cart) => {
      this.cart = cart;
    })
   }

  ngOnInit(): void {
  }

  removeFromCart(cartItem: CartItemModel){
    this.cartService.removeFromCart(cartItem.product._id);
  }

  changeQuantity(CartItem: CartItemModel, quantityInString: string){
    const quantity = parseInt(quantityInString)
    this.cartService.changeQuantity(CartItem.product._id, quantity);
  }

  clearCart(){
    this.cartService.clearCart();
  }
}
