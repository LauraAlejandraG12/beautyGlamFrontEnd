import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../../core/services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrl: './create-form.component.scss'
})
export class CreateFormComponent {

  form = new FormGroup({
    product_name: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    description: new FormControl(''),
    stock: new FormControl('', Validators.required)
  });

  constructor(private service: ProductService, private router: Router) {}

  save() {
    if (this.form.invalid) return;

    this.service.create(this.form.value).subscribe(() => {
      this.router.navigate(['/inventory/products']);
    });
  }
}