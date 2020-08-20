import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  apiUrl = 'http://localhost:3000/mail';

  constructor(private http: HttpClient) { }


  sendMail(body) {
    return this.http.post(`${this.apiUrl}/send`, body);
  }

}
