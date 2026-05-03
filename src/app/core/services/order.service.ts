import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderRequestDTO, OrderResponseDTO } from '@core/interfaces/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl = 'http://localhost:8080/orders';

  constructor(private http: HttpClient) { }

  makeOrder(orderRequest: OrderRequestDTO){
    return this.http.post<OrderResponseDTO>(`${this.apiUrl}`, orderRequest);
  }

  getOrderHistory(){
    return this.http.get<OrderResponseDTO[]>(`${this.apiUrl}/history`)
  }
}
