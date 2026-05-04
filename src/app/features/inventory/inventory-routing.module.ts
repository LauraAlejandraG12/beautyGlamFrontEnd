import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateFormComponent } from './pages/create-form/create-form.component';
import { UpdateFormComponent } from './pages/update-form/update-form.component';
import { ProductsComponent } from './pages/products/products.component';

const routes: Routes = [
    { path: 'products', component: ProductsComponent },
    { path: 'create', component: CreateFormComponent },
    { path: 'update/:id', component: UpdateFormComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InventoryRoutingModule { }