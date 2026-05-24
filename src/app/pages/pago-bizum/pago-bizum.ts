import { Component } from '@angular/core';
import { Temporizador } from '../../shared/temporizador/temporizador';
import { BarraPasos } from '../../shared/barra-pasos/barra-pasos';
import {FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-pago-bizum',
  host: { class: 'ion-page' },
  imports: [Temporizador, BarraPasos, FormsModule, CommonModule, IonicModule],
  templateUrl: './pago-bizum.html',
  styleUrl: './pago-bizum.css',
  standalone: true,
})
export class PagoBizum {
  telefono: string = '';
  procesando: boolean = false;

  constructor(private router: Router) {}

  procesarPagoBizum(event: Event) {
    event.preventDefault();
    if (!this.telefono) return;
    this.procesando = true;
    setTimeout(() => {
      const peliId = sessionStorage.getItem('pelicula_id');
      this.router.navigate(['/exito', peliId]);
    }, 2500);
  }
}
