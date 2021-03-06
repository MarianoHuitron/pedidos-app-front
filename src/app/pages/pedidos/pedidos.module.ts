import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PedidosPageRoutingModule } from './pedidos-routing.module';

import { PedidosPage } from './pedidos.page';
import { ComponentsModule } from '../../components/components.module';
import { StatusPipe } from '../../pipes/status.pipe';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedidosPageRoutingModule,
    ComponentsModule,
    PipesModule
  ],
  declarations: [PedidosPage]
})
export class PedidosPageModule {}
