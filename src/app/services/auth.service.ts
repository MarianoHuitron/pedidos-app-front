import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  logged = false;

  constructor(private http: HttpClient, private router: Router) { }


  login(token) {
    if(localStorage.getItem('token')) {
      localStorage.removeItem('token');
    }
    localStorage.setItem('token', token);
  }

  logOut() {
    this.logged = false;
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isLogged() {
    return (localStorage.getItem('token'))? true : false; 
  }

  getToken() {
    return localStorage.getItem('token')
  }
}
