import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrderComponent } from './pages/order/order.component';
import { HistoryComponent } from './pages/history/history.component';


@NgModule({
  declarations: [
    OrderComponent,
    HistoryComponent
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule
  ]
})
export class OrdersModule { }
