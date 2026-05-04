import { Component } from '@angular/core';
import { OrderService } from '@core/services/order.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})
export class HistoryComponent {

  orders: any[] = [];
  errorMessage: String = '';

  constructor(private orderService: OrderService){}

  ngOnInit(){
    this.orderService.getOrderHistory().subscribe({
      next: (res: any) =>{
        this.orders = res;
      },
      error: (err: any) => {
        console.error('Error al cargar el historial', err);
        this.errorMessage = 'Error al cargar el historial';
      }
    })
  }
}
