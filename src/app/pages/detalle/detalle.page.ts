import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../../services/pedido.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {

  pedido: any;
  color = 'warning';
  contenido = false;

  constructor(public pedidoService: PedidoService, private router: Router) { }

  ngOnInit() {
    this.getPedido()
  }

  ionViewWillEnter() {
    this.getPedido();
  }


  getPedido() {
    this.pedido = this.pedidoService.getDetalle();
    if(JSON.stringify(this.pedido) == '{}') {
      this.contenido = false;
      this.router.navigate(['pedidos']);
    } else {
      this.contenido = true;
    }
    
    if(this.pedido.status == 'pending') {
      this.color = 'warning';
    } else if(this.pedido.status == 'delivery') {
      this.color = 'secondary';
    } else {
      this.color = 'success';
    }
  }



}
