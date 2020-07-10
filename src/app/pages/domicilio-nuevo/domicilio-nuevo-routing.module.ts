import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DomicilioNuevoPage } from './domicilio-nuevo.page';

const routes: Routes = [
  {
    path: '',
    component: DomicilioNuevoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DomicilioNuevoPageRoutingModule {}
