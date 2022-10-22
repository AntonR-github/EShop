import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { OrderModel } from 'src/app/shared/models/order.model';
import { UserModel } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.css']
})
export class PaymentPageComponent implements OnInit {

  order: OrderModel = new OrderModel();
  user: UserModel = new UserModel();


  constructor(private orderService: OrderService, private router: Router, private userService: UserService) { 
    this.orderService.getPendingOrdersForCurrentUserByUserId(this.userService.currentUser._id).then(order => {
      this.order = order;
    });
    this.user = this.userService.currentUser;
    
  }
   
    
  



  ngOnInit(): void {
    
  }

}
