import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PedidoService } from '../../services/pedido.service';
import { WebSocketService } from '../../services/web-socket.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {

  constructor(
    private _route: ActivatedRoute, 
    public pedidoService: PedidoService,
    public wsService: WebSocketService
  ) { }

  ngOnInit() {
    this._route.params.subscribe(params => {
      if(params.session) {
        this.pedidoService.checkSession(params.session)
          .subscribe(res => {
            if(res) {
              localStorage.removeItem('cart');
              this.wsService.emit('pay-success');
            }
          }, err => console.log(err))
      }
    })
  }

}
