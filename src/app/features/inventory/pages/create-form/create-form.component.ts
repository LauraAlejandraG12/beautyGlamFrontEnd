import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InventoryService } from '@core/services/inventory.service';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss'] 
})
export class CreateFormComponent {

  productForm: FormGroup;

  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private inventoryService: InventoryService
  ) {
    this.productForm = this.fb.group({
      product_name: ['', [Validators.required, Validators.maxLength(50)]],
      price: [0, [Validators.required, Validators.min(0)]],
      description: ['', [Validators.maxLength(100)]],
      stock: [0, [Validators.required, Validators.min(0)]]
    });
  }

  onSubmit() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    this.inventoryService.createProduct(this.productForm.value)
      .subscribe({
        next: () => {
          this.successMessage = 'Producto creado correctamente';
          this.errorMessage = '';
          this.productForm.reset();
        },
        error: (err) => {

          if (err.status === 401) {
            this.errorMessage = 'No tienes permisos (solo ADMIN)';
          } else if (err.status === 0) {
            this.errorMessage = 'No hay conexión con el servidor';
          } else {
            this.errorMessage = err.error || 'Error al crear el producto';
          }

          this.successMessage = '';
        }
      });
  }
}