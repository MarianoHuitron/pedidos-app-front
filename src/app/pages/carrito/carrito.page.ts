import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ItemCart } from '../../interfaces/carrito.interface';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {

  constructor(public userService: UserService, public alertCtrl: AlertController) { }

  productos: ItemCart[] = [];
  total = 0;

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getCarrito();
  }

  getCarrito() {   
    this.userService.getCartProducts()
      .subscribe((res: ItemCart[]) => {
        this.productos = res;
        this.total = 0;
        res.map(p => {
          this.total += p.subtotal;
        })
      });
  }

  remove(prod) {
    this.userService.removeCartProduct(prod)
      .subscribe((res) => {
        this.getCarrito();
      }, err => console.error(err))
  }

  cant() {
    console.log('cantida')
  }


  async confirmRemove(id) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      message: '¿Está seguro de eliminar producto de la lista?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary-alert',
          handler: () => {
            console.log('Cancelado')
          }
        },
        {
          text: 'Si, eliminar',
          cssClass: 'warning',
          handler: () => {
            this.remove(id);
          }
        }
      ]
    });

    await alert.present();
  }
}
