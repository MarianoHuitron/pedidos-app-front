import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, public authService: AuthService) { }

  // apiUrl = 'https://server-app-pedidos.herokuapp.com/user';
  apiUrl = 'http://localhost:3000/user';
  logged = false;

  register(data) {
    return this.http.post(`${this.apiUrl}/create`, data);
  }

  login(data) {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  // Aagregar a carrito
  addCart(data) {
    return this.http.put(`${this.apiUrl}/cart-add`, data, {headers: new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    })});
  }

  getCartProducts() {
    return this.http.get(`${this.apiUrl}/cart-get`, {headers: new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    })});
  }


  removeCartProduct(id) {
    return this.http.delete(`${this.apiUrl}/cart-remove/${id}`, {headers: new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    })});
  }

  updateCantCart(data) {
    return this.http.put(`${this.apiUrl}/cart-update`, data, {headers: new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    })});
  }

  getAddresses() {
    return this.http.get(`${this.apiUrl}/get-address`, {headers: new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    })});
  }

  createAddress(data) {
    return this.http.post(`${this.apiUrl}/create-address`, data, {headers: new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    })});
  }
  

}
