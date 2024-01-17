import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage),
  },
  {
    path: 'sigin',
    loadComponent: () => import('./pages/sigin/sigin.page').then( m => m.SiginPage)
  },  {
    path: 'nueva-publicacion',
    loadComponent: () => import('./nueva-publicacion/nueva-publicacion.page').then( m => m.NuevaPublicacionPage)
  },


];
