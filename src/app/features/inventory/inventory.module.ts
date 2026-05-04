import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateFormComponent } from './pages/create-form/create-form.component';
import { UpdateFormComponent } from './pages/update-form/update-form.component';
import { ProductsComponent } from './pages/products/products.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InventoryRoutingModule } from './inventory-routing.module';



@NgModule({ 
  declarations: [
    CreateFormComponent,
    UpdateFormComponent,
    ProductsComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InventoryRoutingModule,
  ]
})
export class InventoryModule { }
