import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  apiUrl = 'http://localhost:3000/user';


  register(data) {
    return this.http.post(`${this.apiUrl}/create`, data);
  }

}
