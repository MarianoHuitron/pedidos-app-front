import { Component, OnInit } from '@angular/core';
import { MenuController, LoadingController } from '@ionic/angular';
import { Producto } from '../../interfaces/producto.interface';
import { ProductoService } from '../../services/producto.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  cantidad: Number = 1;
  Productos: Array<Producto> = [];
  load;

  constructor(
    public menuCtrl: MenuController, 
    public prodService: ProductoService, 
    public auth: AuthService,
    public loadingCtrl: LoadingController
    ) { }

  ngOnInit() {
    
    
  }


  ionViewWillEnter() {
    this.menuCtrl.enable(true)

    if(localStorage.getItem('cant')) {
      this.cantidad = parseInt(localStorage.getItem('cant'));
    } else {
      this.cantidad = 1;
      localStorage.setItem('cant', this.cantidad.toString());
    }

    this.loading();

    this.prodService.getProducts()
      .subscribe((res: Producto[]) => {
        this.Productos = res;
        this.load.dismiss();
      }, err => {
        console.log(err)
      })
  }

  add(producto) {

    
  
    console.log(producto)
    this.cantidad = 1;

    localStorage.removeItem('cant');
    localStorage.setItem('cant', this.cantidad.toString());
  }

  logout() {
    this.auth.logOut();
  }


  async loading() {
    this.load = await this.loadingCtrl.create({
      cssClass: 'my-custom-class',
      message: 'Por favor espere...'
    });
    await this.load.present();

    const { role, data } = await this.load.onDidDismiss();
  }

}
