import { Component, Input, OnInit } from '@angular/core';
import { OrderModel } from 'src/app/shared/models/order.model';

@Component({
  selector: 'app-order-items-list',
  templateUrl: './order-items-list.component.html',
  styleUrls: ['./order-items-list.component.css']
})
export class OrderItemsListComponent implements OnInit {

  @Input()
  order: OrderModel;
  
  constructor() { }

  ngOnInit(): void {
  }

}
