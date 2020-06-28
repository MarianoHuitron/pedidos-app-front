import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { AlertController, NavController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form: FormGroup;

 

  constructor(
    private userService: UserService, 
    private router: Router, 
    public alertController: AlertController,
    private navCtrl: NavController,
    public menuCtrl: MenuController
  ) { 

    this.form = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)])
    });

  }

  ngOnInit() {
    
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false)
  }

  login() {
    
    this.userService.login(this.form.value)
      .subscribe((res:any) => {
        if(localStorage.getItem('token')) {
          localStorage.removeItem('token');
        }
        localStorage.setItem('token', res.token);
        this.form.reset();
        // this.router.navigate(['/home'])
        this.navCtrl.navigateRoot(['home']);

        // document.getElementById('auth').classList.add('hide');

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
