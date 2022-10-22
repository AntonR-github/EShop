import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { OrderModel } from '../shared/models/order.model';
import { HttpClient } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class OrderService {


  constructor(private http: HttpClient) { }

  public async createOrder(order: OrderModel): Promise<void> {
    await this.http.post<OrderModel>(environment.ordersUrl, order).toPromise();
    
  }

  public async getPendingOrdersForCurrentUserByUserId(id:string): Promise<OrderModel> {
    const order = await this.http.get<OrderModel>(environment.pendingOrdersForCurrentUserUrl + id).toPromise();
    return order;
  }

  pay(order:OrderModel):Observable<string>{
    return this.http.patch<string>(environment.ordersUrl, order);
  }

  getAllPaidOrdersForCurrentUserByUserId(id:string):Observable<OrderModel[]>{
    return this.http.get<OrderModel[]>(environment.ordersUrl + id);
  }
  
  getOrdersObservable():Observable<OrderModel[]>{ 
    return this.http.get<OrderModel[]>(environment.ordersUrl);
  }

  getOrderByOrderId(id:string):Observable<OrderModel>{
    return this.http.get<OrderModel>(environment.ordersByIdUrl + id);
  }



 
   
}
