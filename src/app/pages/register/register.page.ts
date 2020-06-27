import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  user = {
    name: '',
    email: '',
    password: '',
    password2: ''
  };

  constructor() { }

  ngOnInit() {
  }

  register() {
    console.log('registro')
  }

}
