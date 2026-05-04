import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InventoryService } from '@core/services/inventory.service';
import { OrderService } from '@core/services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent implements OnInit {
  products: any[] = [];
  cart: {
    productId: number; productName: string, quantity: number, price: number
  }[] = [];

  errorMessage: string = '';
  successMessage: string = '';

  constructor(private orderService: OrderService, private inventoryService: InventoryService, private router: Router) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.inventoryService.getProducts().subscribe({
      next: (res: any) => {
        this.products = res.filter((p: any) => p.stock > 0); // 👈 solo productos con stock
      },
      error: (err: any) => {
        console.error('Error al cargar productos', err);
        this.errorMessage = 'Error al cargar los productos';
        setTimeout(() => this.errorMessage = '', 3000);
      }
    });
  }

  addToCart(product: any) {
    const inCart = this.cart.find(item => item.productId === product.id);
    const cantidadEnCarrito = inCart ? inCart.quantity : 0;

    if (cantidadEnCarrito >= product.stock) {
      this.errorMessage = `No hay suficiente stock de "${product.product_name}"`;
      setTimeout(() => this.errorMessage = '', 3000);
      return;
    }

    if (inCart) {
      inCart.quantity++;
    } else {
      this.cart.push({
        productId: product.id,
        productName: product.product_name,
        quantity: 1,
        price: product.price
      });
    }
  }

  increaseQuantity(item: any) {
    const product = this.products.find(p => p.id === item.productId);
    if (product && item.quantity < product.stock) {
      item.quantity++;
    } else {
      this.errorMessage = `No hay más stock de "${item.productName}"`;
      setTimeout(() => this.errorMessage = '', 3000);
    }
  }

  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
    } else {
      this.removeToCart(item.productId);
    }
  }

  removeToCart(productId: number) {
    this.cart = this.cart.filter(item => item.productId !== productId);
  }

  get total() {
    return this.cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }

  makeOrder() {
    if (this.cart.length === 0) return;

    const orderRequest = {
      items: this.cart.map(item => ({
        productId: item.productId,
        quantity: item.quantity
      }))
    };

    this.orderService.makeOrder(orderRequest).subscribe({
      next: () => {
        this.successMessage = 'Compra realizada con éxito';
        this.cart = [];
        this.loadProducts();
        setTimeout(() => {
          this.router.navigate(['/orders/history']);
        }, 1500);
      },
      error: (err: any) => {
        console.error('Error al realizar la compra', err);
        this.errorMessage = 'Error al realizar la compra';
        setTimeout(() => this.errorMessage = '', 3000);
      }
    });
  }
}