import { Component } from '@angular/core';
import { Temporizador } from '../../shared/temporizador/temporizador';
import { BarraPasos } from '../../shared/barra-pasos/barra-pasos';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-pago-paypal',
  host: { class: 'ion-page' },
  imports: [Temporizador, BarraPasos, FormsModule, CommonModule, IonicModule],
  templateUrl: './pago-paypal.html',
  styleUrl: './pago-paypal.css',
  standalone: true,
})
export class PagoPaypal {
  tipoPago: string = 'saldo';
  procesando: boolean = false;

  constructor(private router: Router) {}

  procesarPagoPaypal(event: Event) {
    const peliID = sessionStorage.getItem('pelicula_id');
    event.preventDefault();
    this.procesando = true;
    setTimeout(() => {
      this.router.navigate(['/exito', peliID]);
    }, 2500)
  }

  volverInfoFilm() {
    const peliID = sessionStorage.getItem('pelicula_id');
    if (peliID) {
      this.router.navigate(['/info', peliID]);
    } else {
      this.router.navigate(['/']);
    }
  }
}
