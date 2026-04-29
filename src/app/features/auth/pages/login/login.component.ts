import { Component } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  errorMessage: string = '';
  submitted: boolean = false;

  loginForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)] )
  });

  constructor(private auth: AuthService) {}

  login() {
    this.submitted = true;
    this.errorMessage = '';

    if(this.loginForm.invalid) return;

    const { email, password} = this.loginForm.value;

    this.auth.login(email!, password!).subscribe({
      next: (res: any) => {
        this.errorMessage = '';
        console.log('Login exitoso', res);
        if (res.token) {
          localStorage.setItem('authToken', res.token);
        }
        alert('Login exitoso');
      },
      error: (err) => {
        console.error('Error en login', err);
        this.errorMessage = 'Email o contraseña incorrectos';
      }
    });
  }

  get emailControl() {
    return this.loginForm.get('email');
  }

  get passwordControl(){
    return this.loginForm.get('password');
  }
}