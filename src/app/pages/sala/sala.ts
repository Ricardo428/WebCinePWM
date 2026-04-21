import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {BarraPasos} from '../../shared/barra-pasos/barra-pasos';
import {Temporizador} from '../../shared/temporizador/temporizador';

@Component({
  selector: 'app-sala',
  imports: [BarraPasos, Temporizador],
  templateUrl: './sala.html',
  styleUrl: './sala.css',
  standalone: true,
})
export class Sala implements OnInit {
  constructor(private location: Location, private router: Router) {}

  ngOnInit() {
    const peliId = sessionStorage.getItem('pelicula_id');
    if (!peliId) {
      this.router.navigate(['/']);
    }
  }
  volverAtras() {
    this.location.back();
  }

  continuar() {
    sessionStorage.setItem('butacas_seleccionadas', '14A, 14B');
    sessionStorage.setItem('fila_seleccionada', '14');
    this.router.navigate(['/entradas']);
  }
}
