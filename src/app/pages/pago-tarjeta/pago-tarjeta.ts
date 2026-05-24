import { Component, OnInit } from '@angular/core';
import { BarraPasos } from '../../shared/barra-pasos/barra-pasos';
import { Temporizador } from '../../shared/temporizador/temporizador';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {Router} from '@angular/router';

import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-pago-tarjeta',
  host: { class: 'ion-page' },
  imports: [BarraPasos, Temporizador, FormsModule, CommonModule, IonicModule],
  templateUrl: './pago-tarjeta.html',
  styleUrl: './pago-tarjeta.css',
  standalone: true,
})
export class PagoTarjeta implements OnInit {
  procesando: boolean = false;
  importeTotal: number = 0;

  numeroTarjeta: string = '';
  caducidad: string = '';
  cvv: string = '';
  peliID = sessionStorage.getItem('pelicula_id');

  errores = {
    numero: '',
    caducidad: '',
    cvv: '',
  };

  constructor(private router: Router) {}

  ngOnInit() {
    const entradas = parseFloat(sessionStorage.getItem('dinero') || '0');
    const snacks = parseFloat(sessionStorage.getItem('totalSnacks') || '0');
    this.importeTotal = entradas + snacks;
  }
  formatearTarjeta(valor: string) {
    this.numeroTarjeta = valor.replace(/\D/g, '').substring(0, 16);
    this.errores.numero = '';
  }

  formatearCaducidad(valor: string) {
    let limpio = valor.replace(/\D/g, '');
    if (limpio.length > 2) {
      this.caducidad = limpio.substring(0, 2) + '/' + limpio.substring(2, 4);
    } else {
      this.caducidad = limpio;
    }
    this.errores.caducidad = '';
  }

  formatearCVV(valor: string) {
    this.cvv = valor.replace(/\D/g, '').substring(0, 3);
    this.errores.cvv = '';
  }


  validarDatos(): boolean {
    let esValido = true;
    this.errores = { numero: '', caducidad: '', cvv: '' };

    if (this.numeroTarjeta.length !== 16) {
      this.errores.numero = 'Debe tener exactamente 16 dígitos.';
      esValido = false;
    }


    if (this.caducidad.length !== 5) {
      this.errores.caducidad = 'Formato incompleto (MM/AA).';
      esValido = false;
    } else {
      const partes = this.caducidad.split('/');
      const mes = parseInt(partes[0], 10);
      const anio = parseInt(partes[1], 10);

      const fechaActual = new Date();
      const mesActual = fechaActual.getMonth() + 1;
      const anioActual = parseInt(fechaActual.getFullYear().toString().substring(2), 10);

      if (mes < 1 || mes > 12) {
        this.errores.caducidad = 'Mes inválido (01-12).';
        esValido = false;
      } else if (anio < anioActual || (anio === anioActual && mes < mesActual)) {
        this.errores.caducidad = 'La tarjeta ha caducado.';
        esValido = false;
      }
    }

    // 3. CVV
    if (this.cvv.length !== 3) {
      this.errores.cvv = 'Debe tener 3 dígitos.';
      esValido = false;
    }

    return esValido;
  }
  procesarPagoTarjeta(event: Event) {
    event.preventDefault();

    if (!this.validarDatos()) {
      return;
    }
    this.procesando = true;

    setTimeout(() => {
      this.router.navigate(['/exito', this.peliID]);
    }, 2500);
  }

  protected readonly Math = Math;

  volverInfoFilm() {
    const ID = this.peliID;
    if (ID) {
      this.router.navigate(['/info', ID]);
    } else {
      this.router.navigate(['/']);
    }
  }
}
