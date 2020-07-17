import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-teclado',
  templateUrl: './teclado.page.html',
  styleUrls: ['./teclado.page.scss'],
})
export class TecladoPage implements OnInit {

  constructor(
    private router: Router, 
    private _route: ActivatedRoute, 
    public userService: UserService,
    public cartService: CartService
    ) { }
  cantidad = 1;
  changeKey = false;
  title = 'Cantidad';
  description = `La cantidad se aplicará a \n su próxima selección`;
  update = false;
  product = '';
  ngOnInit() {
  }
  
  ionViewWillEnter() {

    this.changeKey = false;

    this._route.params.subscribe(params => {
      if(params.idProd && params.cant) {
        this.title = `Editar cantidad`;
        this.description = `Editar la cantidad de piezas`;
        this.product = params.idProd;
        this.cantidad = params.cant;
        this.update = true;
      } else {      
        this.cantidad = parseInt(localStorage.getItem('cant'));     
      }
    })

  }


  add() {
    this.cantidad++;
  }

  remove() {
    this.cantidad--;
    if(this.cantidad < 1 ) { this.cantidad = 1}
  }

  setNum(num) {

    if(!this.changeKey) {
      
      if(num != 0) {
        this.changeKey = true;
        this.cantidad = num;
      }

    } else {
      const temp = this.cantidad.toString();
      const numero = temp + num;
      this.cantidad = parseInt(numero);
    }
  }

  backSpace() {     
    const characters = this.cantidad.toString();

    if(characters.length > 1) {
      const newCant = characters.substring(0, characters.length - 1);
      this.cantidad = parseInt(newCant);
    } else {
      this.cantidad = 0;
    }

    
  }

  save() {

    if(this.update) {
      const data = {
        product: this.product,
        cant: this.cantidad
      };

      this.cartService.updateCantcart(data);     
      this.router.navigate(['/carrito']);
      
    } else {

      if(localStorage.getItem('cant')) {
        localStorage.removeItem('cant');
      }
      localStorage.setItem('cant', this.cantidad.toString());
      this.router.navigate(['/home']);

    }


    
  }


}
