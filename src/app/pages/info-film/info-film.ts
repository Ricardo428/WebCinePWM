import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink, Router} from '@angular/router';
import {Peliculas} from '../../services/peliculas';

@Component({
  selector: 'app-info-film',
  templateUrl: './info-film.html',
  styleUrl: './info-film.css',
  standalone: true,
})
export class InfoFilm implements OnInit {
  pelicula: any;

  constructor(
    private route: ActivatedRoute,
    private peliculasService: Peliculas,
    private cdr: ChangeDetectorRef,
    private router: Router,
  ) {}

  seleccionarSesion(hora: string, peliId: number) {
    const emailActivo = localStorage.getItem('emailUsuario');

    if (!emailActivo) {
      this.router.navigate(['/registro']);
      return;
    }

    sessionStorage.setItem('pelicula_id', peliId.toString());
    sessionStorage.setItem('hora_seleccionada', hora);

    this.router.navigate(['/sala']);
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.peliculasService.getPeliculas().subscribe({
        next: (datos) => {
          const todas = datos.peliculas ? datos.peliculas : datos;
          this.pelicula = todas.find((p: any) => p.id == id);
          this.cdr.detectChanges();
        },
      });
    }
  }
}
