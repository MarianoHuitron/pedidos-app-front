import { Component, OnInit } from '@angular/core';
import { MenuController, LoadingController } from '@ionic/angular';
import { Producto } from '../../interfaces/producto.interface';
import { ProductoService } from '../../services/producto.service';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  cantidad: number = 1;
  Productos: Array<Producto> = [];
  filterProducts: Array<Producto> = [];
  load;
  infoPedido = {
    cant: 0,
    total: 0
  }

  constructor(
    public menuCtrl: MenuController, 
    public prodService: ProductoService, 
    public auth: AuthService,
    public loadingCtrl: LoadingController,
    public userService: UserService 
    ) { }

  ngOnInit() {
     
    this.loading('Por favor espere...');
    setTimeout(()=> {
      this.getProducts();
    },700);
    
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(true);
    this.cantButton();
    this.getInfoPedido();
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

  getInfoPedido() {
    
    this.userService.getCartProducts()
      .subscribe((res: any) => {
        this.infoPedido.cant = 0;
        this.infoPedido.total = 0;
        if(res.length > 0) {
          res.map(p => {
            this.infoPedido.cant += p.cant;
            this.infoPedido.total += p.subtotal;
          })
        }
       
      }) 
  }

  add(producto) {
    
    const data = {
      product: producto,
      cant: this.cantidad
    };

    this.userService.addCart(data)
      .subscribe(res => {
        this.cantidad = 1;
        localStorage.removeItem('cant');
        localStorage.setItem('cant', this.cantidad.toString());
        this.getInfoPedido();

      }, err => console.error(err))
    
    
    
  }

  
  async loading(mensaje) {
    this.load = await this.loadingCtrl.create({
      cssClass: 'loading',
      message: mensaje,
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
