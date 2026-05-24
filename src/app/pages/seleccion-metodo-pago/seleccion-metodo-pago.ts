import { ChangeDetectorRef, Component } from '@angular/core';
import { BarraPasos } from '../../shared/barra-pasos/barra-pasos';
import { Temporizador } from '../../shared/temporizador/temporizador';
import {Router} from '@angular/router';
import {OnInit} from '@angular/core';
import { SeleccionPagoService } from '../../services/seleccion-metodo-pago.service';
import { CommonModule } from '@angular/common';
import { MetodoPago } from '../../models/metodo-pago';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-seleccion-metodo-pago',
  host: { class: 'ion-page' },
  imports: [BarraPasos, Temporizador, CommonModule, IonicModule],
  templateUrl: './seleccion-metodo-pago.html',
  styleUrl: './seleccion-metodo-pago.css',
  standalone: true,
})
export class SeleccionMetodoPago implements OnInit{
  metodos: MetodoPago[] = [];

  constructor(private metodoPagoService: SeleccionPagoService, private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.metodoPagoService.getMetodosPago().subscribe({
      next: metodosPago => {
        this.metodos = metodosPago;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error("Error cargando JSON. Revisa que HttpClient esté en app.config.ts:", err)
      }
    })
  }

  irAPasarela(metodo: MetodoPago) {
    sessionStorage.setItem('metodoPagoElegido', metodo.name);
    this.router.navigate([metodo.route]);
  }

  volverInfoFilm() {
    const peliID = sessionStorage.getItem("pelicula_id")
    this.router.navigate(['/info', peliID]);

  }
}
