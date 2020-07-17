import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  // apiUrl = 'https://server-app-pedidos.herokuapp.com/product';
  apiUrl = 'http://localhost:3000/product';

  
  constructor(private http: HttpClient, public authService: AuthService) { }


  getProducts() {
    return this.http.get(`${this.apiUrl}`, {headers: new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    })});
  }
}
