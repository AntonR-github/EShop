import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { OrderModel } from 'src/app/shared/models/order.model';
import { UserModel } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-order-track-page',
  templateUrl: './order-track-page.component.html',
  styleUrls: ['./order-track-page.component.css']
})
export class OrderTrackPageComponent implements OnInit {

  orders:OrderModel[] = [];
  user:UserModel;
 
  constructor(private orderService:OrderService, private userService: UserService) { 
 
  }
  

  ngOnInit(): void {
    this.user = this.userService.currentUser;
    this.orderService.getAllPaidOrdersForCurrentUserByUserId(this.user._id).subscribe((orders) => {
      this.orders = orders;
    })


  }
}
