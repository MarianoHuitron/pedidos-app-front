import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Observable } from 'rxjs';
import { Menu } from '../../interfaces/interfaces';
import { AuthService } from '../../services/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {


  menuOpt: Observable<Menu[]>;

  constructor(
    private dataService: DataService, 
    public auth: AuthService,
    private alertCtrl: AlertController
    ) { }

  ngOnInit() {
    this.menuOpt = this.dataService.getMenu();
  }


  logOut() {
   this.alert();
  }


  async alert() {
    const alerta = await this.alertCtrl.create({
      header: 'Cerrar sesión?',
      mode: 'ios',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {}
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.auth.logOut();
          }
        }
      ]
    })

    await alerta.present();
  }

}
