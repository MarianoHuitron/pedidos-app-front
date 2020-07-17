import { Injectable } from '@angular/core';
import { ItemCart } from '../interfaces/carrito.interface';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // Variables
  itemsCart: Array<ItemCart> = [];

  constructor() { }

  
  addCart(producto: ItemCart) {
      
    let exist = false;

    if(localStorage.getItem('cart')) {
      this.itemsCart = JSON.parse(localStorage.getItem('cart'));
    }

    this.itemsCart.map(p => {
      if(p.product._id == producto.product._id) {
          p.cant = Number(p.cant) + Number(producto.cant);
          p.subtotal = Number(p.cant) * Number(producto.product.price);
          exist = true;
      }
    });


    if(!exist) {
      const element = {
          product: producto.product,
          cant: producto.cant,
          subtotal: (Number(producto.cant) * Number(producto.product.price))
      };
      this.itemsCart.push(element);
    }


    this.changeStorage();

  }


  getInfoCart() {
    if(localStorage.getItem('cart')) {
      this.itemsCart = JSON.parse(localStorage.getItem('cart'));
    }

    return this.itemsCart;
  }


  removeItem(prod) {

    this.itemsCart = this.getInfoCart();

    this.itemsCart = this.itemsCart.filter(p => { 
      return p.product._id != prod
    });

    this.changeStorage();

  }

  updateCantcart(datos) {
    this.itemsCart = this.getInfoCart();
    this.itemsCart.map(p => {
      if(p.product._id == datos.product) {
          p.cant = datos.cant;
          p.subtotal = (Number(p.cant) * Number(p.product.price));
      }
    });

    this.changeStorage();
  }


  changeStorage() {
    localStorage.removeItem('cart');
    localStorage.setItem('cart', JSON.stringify(this.itemsCart));
  }

}
