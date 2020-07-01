import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teclado',
  templateUrl: './teclado.page.html',
  styleUrls: ['./teclado.page.scss'],
})
export class TecladoPage implements OnInit {

  constructor(private router: Router) { }
  cantidad = 1;
  changeKey = false;
  ngOnInit() {
  }
  
  ionViewWillEnter() {
    this.cantidad = parseInt(localStorage.getItem('cant'));
    this.changeKey = false;
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
    if(localStorage.getItem('cant')) {
      localStorage.removeItem('cant');
    }
    localStorage.setItem('cant', this.cantidad.toString());
    this.router.navigate(['/home']);
  }


}
