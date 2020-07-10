import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from './guards/auth-guard.guard';
import { LoginAccessGuard } from './guards/login-access.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
    canActivate: [LoginAccessGuard]
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule),
    canActivate: [LoginAccessGuard]
  },
  {
    path: 'home',
    canActivate: [AuthGuardGuard],
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'teclado',
    canActivate: [AuthGuardGuard],
    children: [
      {path: '', canActivate: [AuthGuardGuard], loadChildren: () => import('./pages/teclado/teclado.module').then( m => m.TecladoPageModule) },
      {path: 'edit/:idProd/:cant', canActivate: [AuthGuardGuard], loadChildren: () => import('./pages/teclado/teclado.module').then( m => m.TecladoPageModule),}
    ]
  },
  {
    path: 'pedidos',
    canActivate: [AuthGuardGuard],
    loadChildren: () => import('./pages/pedidos/pedidos.module').then( m => m.PedidosPageModule)
  },
  {
    path: 'carrito',
    canActivate: [AuthGuardGuard],
    loadChildren: () => import('./pages/carrito/carrito.module').then( m => m.CarritoPageModule)
  },
  {
    path: 'domicilio',
    canActivate: [AuthGuardGuard],
    loadChildren: () => import('./pages/domicilio/domicilio.module').then( m => m.DomicilioPageModule)
  },
  {
    path: 'domicilio-nuevo',
    canActivate: [AuthGuardGuard],
    loadChildren: () => import('./pages/domicilio-nuevo/domicilio-nuevo.module').then( m => m.DomicilioNuevoPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
