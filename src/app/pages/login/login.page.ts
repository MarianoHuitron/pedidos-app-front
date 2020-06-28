import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { AlertController, NavController, MenuController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';

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
    public menuCtrl: MenuController,
    private authService: AuthService
  ) { 

    this.form = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)])
    });

  }

  ngOnInit() {
    if(this.authService.isLogged()) {
      this.router.navigate(['/home']);
    }
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false)
  }

  login() {
    
    this.userService.login(this.form.value)
      .subscribe((res:any) => {
       
        this.form.reset();
        this.authService.login(res.token);
        this.navCtrl.navigateRoot(['home']);

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
