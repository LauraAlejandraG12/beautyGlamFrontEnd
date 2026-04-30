import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';


function passwordMatchValidator(form: AbstractControl){
    const password = form.get('password')?.value;
    const confirm = form.get('confirmPassword')?.value;
    return password === confirm ? null: { passwordMismatch: true};
  }
  
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})

export class RegisterComponent {

  errorMessage: string = '';
  successMessage: string = '';
  submitted: boolean = false;

  registerForm = new FormGroup({
    username: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl(null, [Validators.required])
  }, 
  {
    validators: passwordMatchValidator
  })

  constructor(private auth: AuthService, private router: Router){}

  register(){
    this.submitted = true;
    this.errorMessage = '';
    this.successMessage = '';

    if(this.registerForm.invalid) return;

    const { username, email, password } = this.registerForm.value;

    this.auth.register(username !, email!, password!).subscribe({
      next: () => {
        this.successMessage = 'cuenta creada correctamente';
        setTimeout(() =>{
          this.router.navigate(['/products']);
        }, 1500);
      },
      error: (err: any) => {
        console.log('Error en el registro', err);
        this.errorMessage = err.error || 'La cuenta ya esta registrada'
      }
    });
  }

  get usernameControl(){ 
    return this.registerForm.get('username');
  }

  get emailControl(){
    return this.registerForm.get('email');
  }

  get passwordControl(){
    return this.registerForm.get('password');
  }

  get confirmPasswordControl(){
    return this.registerForm.get('confirmPassword');
  }

  get passwordMismatch(){
    return this.registerForm.errors?.['passwordMismatch'] && this.submitted;
    }
}
