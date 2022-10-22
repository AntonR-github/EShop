import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-orders-counter',
  templateUrl: './orders-counter.component.html',
  styleUrls: ['./orders-counter.component.css']
})
export class OrdersCounterComponent implements OnInit {

  orders: number = 0;
  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderService.getOrdersObservable().subscribe(newOrders => {
      this.orders = newOrders.length;
    });
  }

}
