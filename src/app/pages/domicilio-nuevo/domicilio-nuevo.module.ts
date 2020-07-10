import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DomicilioNuevoPageRoutingModule } from './domicilio-nuevo-routing.module';

import { DomicilioNuevoPage } from './domicilio-nuevo.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DomicilioNuevoPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [DomicilioNuevoPage]
})
export class DomicilioNuevoPageModule {}
