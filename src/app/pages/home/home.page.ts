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
  filterProducts: Array<Producto> = [];
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
    this.menuCtrl.enable(true);

    this.cantButton();
    this.loading();
    this.getProducts();
    
  }

  getProducts() {
    this.prodService.getProducts()
      .subscribe((res: Producto[]) => {
        this.Productos = res;
        this.filterProducts = this.Productos;
        this.load.dismiss();
      }, err => {
        console.log(err)
      })
  }

  cantButton() {
    if(localStorage.getItem('cant')) {
      this.cantidad = parseInt(localStorage.getItem('cant'));
    } else {            
      this.cantidad = 1;
      localStorage.setItem('cant', this.cantidad.toString());
    }
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


  changeSearch(event) {
    this.filterProducts = this.Productos;
    let busqueda = event.detail.value;
    busqueda = busqueda.trim();
    let filtered: Array<Producto> = [];

    for(let i = 0; i < this.filterProducts.length; i++) {
      if(this.filterProducts[i].name.toLowerCase().includes(busqueda.toLowerCase())) {
        filtered.push(this.filterProducts[i])
      }
    }

    this.filterProducts = filtered;
  }

}
