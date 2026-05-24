import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-temporizador',
  imports: [IonicModule],
  templateUrl: './temporizador.html',
  styleUrl: './temporizador.css',
  standalone: true,
})
export class Temporizador implements OnInit, OnDestroy {
  tiempoDisplay: string = '10:00';
  private totalSegundos: number = 600; // 10 minutos
  private intervalId: any;

  constructor(
    private cdr: ChangeDetectorRef,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    const tiempoGuardado = sessionStorage.getItem('tiempo_restante');
    if (tiempoGuardado) {
      this.totalSegundos = parseInt(tiempoGuardado, 10);
    } else {
      sessionStorage.setItem('tiempo_restante', this.totalSegundos.toString());
    }

    this.actualizarDisplay();

    this.intervalId = setInterval(() => {
      if (this.totalSegundos > 0) {
        this.totalSegundos--;
        sessionStorage.setItem('tiempo_restante', this.totalSegundos.toString());
        this.actualizarDisplay();
        this.cdr.detectChanges();
      } else {
        clearInterval(this.intervalId);
        sessionStorage.removeItem('tiempo_restante');
        sessionStorage.removeItem('pelicula_id');
        sessionStorage.removeItem('hora_seleccionada');
        sessionStorage.removeItem('butacas_seleccionadas');
        sessionStorage.removeItem('fila_seleccionada');
        sessionStorage.removeItem('total_butacas');
        sessionStorage.removeItem('dinero');
        sessionStorage.removeItem('Adulto');
        sessionStorage.removeItem('Niños');
        sessionStorage.removeItem('Normal');
        sessionStorage.removeItem('carritoSnacks');
        this.mostrarExpiradoAlert();
      }
    }, 1000);
  }

  private actualizarDisplay() {
    const minutos = Math.floor(this.totalSegundos / 60);
    const segundos = this.totalSegundos % 60;
    const minutosStr = minutos.toString().padStart(2, '0');
    const segundosStr = segundos.toString().padStart(2, '0');
    this.tiempoDisplay = `${minutosStr}:${segundosStr}`;
  }

  async mostrarExpiradoAlert() {
    const alert = await this.alertController.create({
      header: 'Tiempo Expirado',
      message: 'Tu tiempo de reserva de 10 minutos ha expirado. Serás redirigido a la cartelera.',
      buttons: [{
        text: 'Aceptar',
        handler: () => {
          this.router.navigate(['/']);
        }
      }],
      backdropDismiss: false
    });
    await alert.present();
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
