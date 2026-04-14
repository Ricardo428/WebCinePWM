import { Component } from '@angular/core';

@Component({
  selector: 'app-carrusel',
  imports: [],
  templateUrl: './carrusel.html',
  styleUrl: './carrusel.css',
  standalone: true,
})
export class Carrusel {
  peliculas_poster: any[] = [
    'assets/img/Mario_galaxy.jpg',
    'assets/img/Kill_bill.jpg',
    'assets/img/Torrente presidente carrusel.jpg',
  ];
  indice: number = 0;

  avanzar(): void {
    this.indice = (this.indice + 1 + this.peliculas_poster.length) % this.peliculas_poster.length;
  }

  retroceder(): void {
    this.indice = (this.indice - 1 + this.peliculas_poster.length) % this.peliculas_poster.length;
  }
}
