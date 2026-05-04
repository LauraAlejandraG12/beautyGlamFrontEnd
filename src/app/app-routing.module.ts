import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },

  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'inventory',
    loadChildren: () =>
      import('./features/inventory/inventory.module').then(m => m.InventoryModule),
  },
  {
    path: 'orders', 
    loadChildren: () =>
      import('./features/orders/orders.module').then(m => m.OrdersModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }