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


export const routes: Routes = [
  { path: '', component: Home },
  { path: 'info/:id', component: InfoFilm },
  { path: 'sala', component: Sala },
  { path: 'entradas', component: Entradas },
  { path: 'snacks', component: Snacks },
  { path: 'login', component: Login },
  { path: 'seleccion-metodo-pago', component: SeleccionMetodoPago },
  { path: 'registro', component: Registro },
  { path: 'resumen/:id', component: Resumen },
  { path: 'perfil', component: Perfil },
  { path: 'historial', component: Historial },
  { path: 'preferencias', component: Preferencias },
  { path: 'pago-bizum', component: PagoBizum },
  { path: 'pago-paypal', component: PagoPaypal },
  { path: 'pago-tarjeta', component: PagoTarjeta },
  { path: 'exito/:id', component: Exito },
  { path: 'eleccion', component: Eleccion },
];
