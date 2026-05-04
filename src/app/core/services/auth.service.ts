import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap((resp: any) => {
          if (resp?.token) {
            localStorage.setItem('authToken', resp.token);
          }
        })
      );
  }
  
  register(username: String, email: string, password: string){
    return this.http.post(`${this.apiUrl}/register`, {username, email, password},
    {responseType: 'text'}
    );
  }

  logout() {
    localStorage.removeItem('authToken');
  }

  getToken() {
    return localStorage.getItem('authToken');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}