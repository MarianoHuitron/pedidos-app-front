import { Component, OnInit } from '@angular/core';
import { MenuController, LoadingController } from '@ionic/angular';
import { Producto } from '../../interfaces/producto.interface';
import { ProductoService } from '../../services/producto.service';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { ItemCart } from '../../interfaces/carrito.interface';
import { CartService } from '../../services/cart.service';

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
    public userService: UserService,
    public cartService: CartService
    ) { }

  async ngOnInit() {
     
    await this.loading('Por favor espere...');
    // setTimeout(()=> {
    // },200);
    this.getProducts();
    
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
    
    const res: any = this.cartService.getInfoCart();
    
    this.infoPedido.cant = 0;
    this.infoPedido.total = 0;
    if(res.length > 0) {
      res.map(p => {
        this.infoPedido.cant += p.cant;
        this.infoPedido.total += p.subtotal;
      })
    }
  }

  add(producto: Producto) {
    
    const data: ItemCart = {
      product: {
        _id: producto._id,
        name: producto.name,
        price: Number(producto.price),
        status: producto.status,
        img_path: producto.img_path
      },
      cant: this.cantidad,
      subtotal: (this.cantidad * Number(producto.price))
    };

    this.cartService.addCart(data);
    this.cantidad = 1;
    localStorage.removeItem('cant');
    localStorage.setItem('cant', this.cantidad.toString());
    this.getInfoPedido();
    
  }

  
  async loading(mensaje) {
    this.load = await this.loadingCtrl.create({
      cssClass: 'loading',
      message: mensaje,
    });
    await this.load.present();
    return 'ok';

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
