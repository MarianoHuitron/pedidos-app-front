import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  cantidad: Number = 1;

  constructor(public menuCtrl: MenuController) { }

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
  }

  add() {
    this.cantidad = 1;

    localStorage.removeItem('cant');
    localStorage.setItem('cant', this.cantidad.toString());
  }

}
