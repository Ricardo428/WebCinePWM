import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { InfoFilm } from './pages/info-film/info-film'
import { Sala } from './pages/sala/sala'
import { Entradas } from './pages/entradas/entradas';
import { Snacks } from './pages/snacks/snacks';
import { Login } from './pages/login/login';
import { SeleccionMetodoPago } from './pages/seleccion-metodo-pago/seleccion-metodo-pago';
import { Registro } from './pages/registro/registro';
import { Resumen } from './pages/resumen-registrado/resumen_registrado';
import { Exito } from './pages/pago-realizado-con-exito/pago_realizado_con_exito';
import {Perfil} from './pages/perfil/perfil';
import { Historial } from './pages/historial/historial';
import {Preferencias} from './pages/preferencias/preferencias';
import { Eleccion } from './pages/eleccion-preferencias/eleccion_preferencias'
import {PagoBizum} from './pages/pago-bizum/pago-bizum';
import { PagoPaypal } from './pages/pago-paypal/pago-paypal';
import { PagoTarjeta } from './pages/pago-tarjeta/pago-tarjeta';
import { authGuard } from './guards/auth.guard';


export const routes: Routes = [
  { path: '', component: Home },
  { path: 'info/:id', component: InfoFilm },
  { path: 'login', component: Login },
  { path: 'registro', component: Registro },

  // Rutas protegidas — requieren sesión iniciada
  { path: 'sala',                  component: Sala,                  canActivate: [authGuard] },
  { path: 'entradas',              component: Entradas,              canActivate: [authGuard] },
  { path: 'snacks',                component: Snacks,                canActivate: [authGuard] },
  { path: 'seleccion-metodo-pago', component: SeleccionMetodoPago,   canActivate: [authGuard] },
  { path: 'resumen/:id',           component: Resumen,               canActivate: [authGuard] },
  { path: 'perfil',                component: Perfil,                canActivate: [authGuard] },
  { path: 'historial',             component: Historial,             canActivate: [authGuard] },
  { path: 'preferencias',          component: Preferencias,          canActivate: [authGuard] },
  { path: 'pago-bizum',            component: PagoBizum,             canActivate: [authGuard] },
  { path: 'pago-paypal',           component: PagoPaypal,            canActivate: [authGuard] },
  { path: 'pago-tarjeta',          component: PagoTarjeta,           canActivate: [authGuard] },
  { path: 'exito/:id',             component: Exito,                 canActivate: [authGuard] },
  { path: 'eleccion',              component: Eleccion,              canActivate: [authGuard] },
];
