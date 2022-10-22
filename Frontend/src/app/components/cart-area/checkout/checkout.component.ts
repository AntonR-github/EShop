import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { OrderModel } from 'src/app/shared/models/order.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  order: OrderModel = new OrderModel();
  checkoutForm!: FormGroup;

  constructor(
    private orderService: OrderService,
    private FormBuilder: FormBuilder,
    private userService:UserService,
    private toastrService: ToastrService,
    private cartService: CartService,
    private router: Router
) { 
  const cart = cartService.getCart();
  this.order.items = cart.items;
  this.order.totalPrice = cart.totalPrice;
  this.order.cartId = cart._id;
  
}

  ngOnInit(): void {
    let {city,street} = this.userService.currentUser;
    this.checkoutForm = this.FormBuilder.group({
      city:[city, Validators.required],
      street:[street, Validators.required],
      date:[Date, Validators.required],


    });
  }

  get fc(){
    return this.checkoutForm.controls;
  }

  public async createOrder(){
    if(this.checkoutForm.invalid){
      this.toastrService.warning('Please fill the inputs', "Invalid Inputs")
      return;
    }
    if(!this.order.latLng){
      this.toastrService.warning('Please select address on the map', "Invalid Address")
      return;
    }

    this.order.items = this.cartService.getCart().items;
    this.order.city = this.checkoutForm.value.city;
    this.order.street = this.checkoutForm.value.street;
    this.order.creditCard = this.checkoutForm.value.creditCard;
    this.order.date = this.checkoutForm.value.date;
    this.order.userId = this.userService.currentUser._id;
    this.order.cartId = this.checkoutForm.value.cartId;
    await this.orderService.createOrder(this.order)
    this.router.navigateByUrl('/payment');

    this.toastrService.success('Order created successfully', "Success")
  }
  
}
