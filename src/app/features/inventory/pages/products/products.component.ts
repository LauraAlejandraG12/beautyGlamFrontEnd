import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../core/services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {

  products: any[] = [];

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getAll().subscribe((data: any) => {
      this.products = data;
    });
  }

  goToCreate() {
    this.router.navigate(['/inventory/create']);
  }

  edit(id: number) {
    this.router.navigate(['/inventory/update', id]);
  }

  delete(id: number) {
    if (confirm('¿Seguro que deseas eliminar este producto?')) {
      this.productService.delete(id).subscribe(() => {
        this.loadProducts();
      });
    }
  }
}