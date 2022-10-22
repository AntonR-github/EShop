import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { CartModel } from 'src/app/shared/models/cart.model';
import { OrderModel } from 'src/app/shared/models/order.model';

@Component({
  selector: 'app-shopping-window',
  templateUrl: './shopping-window.component.html',
  styleUrls: ['./shopping-window.component.css']
})
export class ShoppingWindowComponent implements OnInit {

  cart: CartModel;
  order: any;
  


  constructor(private cartService: CartService, 
              private orderService: OrderService,
              private userService: UserService,
              private router: Router) { this.getLastPaidOrder();}

  ngOnInit(): void {
    this.cart = this.cartService.getCart();
    this.order = this.getLastPaidOrder();
  }

  public goToCart() {
    this.router.navigateByUrl('/cart');
  
  }

  public async getLastPaidOrder(): Promise<void> {
    const orders = await this.orderService.getAllPaidOrdersForCurrentUserByUserId(this.userService.currentUser._id).toPromise();
    this.order = orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0];
  }

 

}
