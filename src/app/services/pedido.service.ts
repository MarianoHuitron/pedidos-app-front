import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  // apiUrl = 'https://server-app-pedidos.herokuapp.com/pedido';
  apiUrl = 'http://localhost:3000/pedido';

  detallePedido = {};

  constructor(private http: HttpClient, public authService: AuthService) { }


  checkOut(items, address) {
    return this.http.post(`${this.apiUrl}/checkout`, {items: items, address: address}, {headers: new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    })});
  }

  checkSession(session) {
    return this.http.get(`${this.apiUrl}/checkout-session/${session}`, {headers: new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    })});
  }


  getPedidos() {
    return this.http.get(`${this.apiUrl}/list-pedidos-user`, {headers: new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    })});
  }




  setDetalle(detalle) {
    this.detallePedido = detalle;
  }

  getDetalle() {
    return this.detallePedido;
  }
}
