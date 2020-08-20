import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Domicilio } from 'src/app/interfaces/domicilio.interface';
import { Router } from '@angular/router';
import { loadStripe } from '@stripe/stripe-js';
import { PedidoService } from '../../services/pedido.service';

@Component({
  selector: 'app-domicilio',
  templateUrl: './domicilio.page.html',
  styleUrls: ['./domicilio.page.scss'],
})
export class DomicilioPage implements OnInit {

  domicilios: Array<Domicilio> = [];
  radioOpt;
  stripe;

  constructor(public userService: UserService, private router: Router, public pedidoService: PedidoService) { }

 async  ngOnInit() {

    this.stripe = await loadStripe('pk_test_51H3X3yIOzkqAV8HlYDhGyt2bW6Zk5WcbOK1AI3hfZBSPz2GhjrLRZV05SnawWRoZV6oEBhU0dB9uuJeATde8aqIr00LUAZ53G3');

  }

  ionViewWillEnter() {
    this.getDoms();
  }

  getDoms() {
    this.userService.getAddresses()
      .subscribe((resp: Domicilio[]) => {
        this.domicilios = resp;
        console.log(this.domicilios);
      }, err => console.log(err));
  }


  next() {
    if(this.radioOpt.value) {
      this.pedidoService.checkOut(JSON.parse(localStorage.getItem('cart')), this.radioOpt.value)
        .subscribe((res:any) => { 
          console.log(res)
          this.stripe.redirectToCheckout({
            sessionId: res.session_id
          })
            .then(function(res) {
            alert('yes')
            console.log(res)
          })
        }, err => console.error(err))
    }
  }

  changeOpt(event) {
    this.radioOpt = event.detail;
  }
}


