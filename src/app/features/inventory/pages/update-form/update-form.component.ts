import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../core/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-form',
  templateUrl: './update-form.component.html',
  styleUrl: './update-form.component.scss'
})
export class UpdateFormComponent implements OnInit {

  id!: number;

  form = new FormGroup({
    product_name: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    description: new FormControl(''),
    stock: new FormControl('', Validators.required)
  });

  constructor(
    private service: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.service.getById(this.id).subscribe((data: any) => {
      this.form.patchValue(data);
    });
  }

  update() {
    if (this.form.invalid) return;

    this.service.update(this.id, this.form.value).subscribe(() => {
      this.router.navigate(['/inventory/products']);
    });
  }
}