
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Peliculas } from '../../services/peliculas';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {Carrusel} from '../../shared/carrusel/carrusel';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, Carrusel],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  peliculas: any[] = [];
  peliculasFiltradas: any[] = [];
  generos: string[] = ["Comedia", "Drama", "Accion"];
  menuFiltrosVisible: boolean = false;


  constructor(
    private peliculasService: Peliculas,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.peliculasService.getPeliculas().subscribe({
      next: (datos) => {
        this.peliculas = datos;
        this.peliculasFiltradas = [...this.peliculas];

        this.cdr.detectChanges();
      },
      error: (error) => console.error("Fallo:", error)
    });
  }

  esEstreno(fechaString: string): boolean {
    if (!fechaString) return false;
    const hoy = new Date();
    const partes = fechaString.split('-');
    if (partes.length !== 3) return false;
    const fechaEstreno = new Date(Number(partes[2]), Number(partes[1]) - 1, Number(partes[0]));
    const diferenciaDias = Math.abs((hoy.getTime() - fechaEstreno.getTime()) / (1000 * 60 * 60 * 24));
    return diferenciaDias <= 30;
  }

  cargarCartelera(soloEstrenos: boolean) {
    if (soloEstrenos) {
      this.peliculasFiltradas = this.peliculas.filter(p => this.esEstreno(p.fecha));
    } else {
      this.peliculasFiltradas = [...this.peliculas];
    }
  }

  filtrarPorGenero(genero: string) {
    this.peliculasFiltradas = this.peliculas.filter(p =>
      p.genero.toLowerCase() === genero.toLowerCase()
    );
    this.menuFiltrosVisible = false;
  }

  toggleFiltros() {
    this.menuFiltrosVisible = !this.menuFiltrosVisible;
  }
}
