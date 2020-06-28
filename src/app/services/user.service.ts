import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  apiUrl = 'http://localhost:3000/user';
  logged = false;

  register(data) {
    return this.http.post(`${this.apiUrl}/create`, data);
  }

  login(data) {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  

}
