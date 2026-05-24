import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DecimalPipe, Location } from '@angular/common';
import { Router } from '@angular/router';
import { BarraPasos } from '../../shared/barra-pasos/barra-pasos';
import { Temporizador } from '../../shared/temporizador/temporizador';
import { ChangeDetectorRef } from '@angular/core';
import { IonicModule, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-entradas',
  host: { class: 'ion-page' },
  standalone: true,
  imports: [FormsModule, DecimalPipe, BarraPasos, Temporizador, IonicModule],
  templateUrl: './entradas.html',
  styleUrl: './entradas.css',
})
export class Entradas implements OnInit {
  precioNormal = 8.0;
  precioAdulto = 6.5;
  precioNino = 5.0;

  cantNormal = 0;
  cantAdulto = 0;
  cantNino = 0;

  butacasPermitidas: number = 0;

  constructor(
    private location: Location,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
    private alertController: AlertController,
  ) {}

  async mostrarAlert(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Atención',
      message: mensaje,
      buttons: ['Aceptar']
    });
    await alert.present();
  }

  ngOnInit() {
    this.butacasPermitidas = parseInt(sessionStorage.getItem("total_butacas") || '0', 10)
    const cantNormalSession = sessionStorage.getItem('cantNormal') || 0;
    const cantAdultoSession = sessionStorage.getItem('cantAdulto') || 0;
    const cantNinoSession = sessionStorage.getItem('cantNino') || 0;

    if (cantNormalSession) this.cantNormal = parseInt(cantNormalSession);
    if (cantAdultoSession) this.cantAdulto = parseInt(cantAdultoSession);
    if (cantNinoSession) this.cantNino = parseInt(cantNinoSession);
    this.changeDetectorRef.detectChanges();
  }

  get totalNormal(): number {
    return this.cantNormal * this.precioNormal;
  }

  get totalAdulto(): number {
    return this.cantAdulto * this.precioAdulto;
  }

  get totalNino(): number {
    return this.cantNino * this.precioNino;
  }

  get dineroTotal(): number {
    return this.totalNormal + this.totalAdulto + this.totalNino;
  }

  get totalEntradas(): number {
    return this.cantNormal + this.cantAdulto + this.cantNino;
  }

  onSubmit(event: Event) {
    if (this.totalEntradas == 0) {
      event.preventDefault();
      this.mostrarAlert('Por favor, selecciona al menos una entrada para poder continuar.');
      return;
    }
    if (this.totalEntradas !== this.butacasPermitidas) {
      event.preventDefault(); // Evitar envío
      this.mostrarAlert(`Has reservado ${this.butacasPermitidas} butacas. Tienes que elegir exactamente ${this.butacasPermitidas} entradas. Actualmente has elegido ${this.totalEntradas}.`);
      return;
    }

    sessionStorage.setItem('dinero', this.dineroTotal.toFixed(2));

    sessionStorage.setItem('Adulto', this.cantAdulto.toString());
    sessionStorage.setItem('Niños', this.cantNino.toString());
    sessionStorage.setItem('Normal', this.cantNormal.toString());

    this.router.navigate(['/snacks']);
  }

  volverAtras() {
    this.router.navigate(['/sala']);
  }


}


