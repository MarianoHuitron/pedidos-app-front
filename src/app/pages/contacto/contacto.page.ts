import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MailService } from '../../services/mail.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.page.html',
  styleUrls: ['./contacto.page.scss'],
})
export class ContactoPage implements OnInit {

  form: FormGroup;

  constructor(public mailService: MailService, private alertCtrl: AlertController) { 

    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$")]),
      message: new FormControl(null, Validators.required),
    })
  }

  ngOnInit() {
  }

  enviar() {
    if(this.form.valid) {
      this.mailService.sendMail(this.form.value)
        .subscribe((res:any) => {
          console.log(res)
          if(res.result) {
            this.Alert('', 'Mensaje enviado');
            this.form.reset();
          }
        }, err => {
          this.Alert('Ups! :(', 'Hubo un problema al enviar tu mensaje')
        })
    }
  }

  goTo(url) {
    window.open(url, '_blank')
  }


  async Alert(header ,message) {
    const alert = await this.alertCtrl.create({
      header: header,
      message: message,
      buttons: ['OK'],
      mode: 'ios'
    });

    await alert.present();
  }
}
