import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateFormComponent } from './pages/create-form/create-form.component';
import { UpdateFormComponent } from './pages/update-form/update-form.component';

const routes: Routes = [
  {
    path: 'create',
    component: CreateFormComponent,
  },
  {
    path: 'edit/:id',
    component: UpdateFormComponent,
  },
  {
    path: '',
    redirectTo: 'create',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }