import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../../services/pedido.service';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
})
export class PedidosPage implements OnInit {

  pedidos = [];
  constructor(public pedidoService: PedidoService, private router: Router) { }

  ngOnInit() {
    
  }
  
  ionViewWillEnter() {
    this.getPedidos();
  }


  getPedidos() {
    this.pedidoService.getPedidos()
      .subscribe((res:any) => {
       
        this.pedidos = res;
      }, err => console.error(err))
  }


  infoPedido(p) {
    this.pedidoService.setDetalle(p);

    this.router.navigate(['pedidos/detalle']);
  }

}
