import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { AlertController, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  user: FormGroup = new FormGroup({
    name: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
    // password2: new FormControl(null, [Validators.required, Validators.minLength(8)])
  });

  constructor(
    private userService: UserService, 
    public alertController: AlertController, 
    private router: Router,
    public menuCtrl: MenuController
  ) { 

  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false)
  }

  register() {

    const dataUser = {
      name: this.user.value.name,
      email: this.user.value.email,
      password: this.user.value.password,
      rol: 'customer'
    }
    
    this.userService.register(dataUser)
      .subscribe(res => {
        this.user.reset();
        this.router.navigate(['/login']);
      }, err => {
       
        const mensaje = (err.error.errors.email) ? err.error.errors.email: err.error.errors.password;
        this.Alert(mensaje.properties.message)
      });
  }


  async Alert(message) {
    const alert = await this.alertController.create({
      header: 'Ups! :(',
      message: message,
      buttons: ['OK'],
      mode: 'ios'
    });

    await alert.present();
  }

  

}