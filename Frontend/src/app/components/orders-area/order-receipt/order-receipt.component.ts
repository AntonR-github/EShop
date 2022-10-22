import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { OrderModel } from 'src/app/shared/models/order.model';
import { UserModel } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-order-receipt',
  templateUrl: './order-receipt.component.html',
  styleUrls: ['./order-receipt.component.css']
})
export class OrderReceiptComponent implements OnInit {

  receipt : string = '';
  order: OrderModel;
  user: UserModel;
   searchText = '';
 

  constructor(private orderService : OrderService,activatedRoute: ActivatedRoute, private userService: UserService) {
    this.user = this.userService.currentUser;
    activatedRoute.params.subscribe((params) => {
      if(params.id)
      this.orderService.getOrderByOrderId(params.id).subscribe(serverOrder => {
        this.order = serverOrder;
        this.receipt = "Order Id: " + this.order._id +  " on " + this.order.date + " for " + this.order.totalPrice + "$" + " with " + this.order.items.length + " products" + " by " + this.user.firstName + " " + this.user.lastName + " at " + this.user.city + " " + this.user.street + " Payment method: " + this.order.creditCard;

      })
    })
   }
   

  ngOnInit(): void {
   
  }

  downloadReceipt(){
    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(this.receipt));
    element.setAttribute('download', "receipt.txt");

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

}
