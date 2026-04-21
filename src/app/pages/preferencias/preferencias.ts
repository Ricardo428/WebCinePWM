import { ChangeDetectorRef, Component, OnInit, inject, NgZone } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Carrusel } from '../../shared/carrusel/carrusel';
import { CommonModule } from '@angular/common';

import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-preferencias',
  standalone: true,
  imports: [RouterLink, Carrusel, CommonModule],
  templateUrl: './preferencias.html',
  styleUrl: './preferencias.css',
})
export class Preferencias implements OnInit {

  private usuariosService: UsuariosService = inject(UsuariosService);
  private ngZone: NgZone = inject(NgZone);

  generos: any[] = [];
  actores: any[] = [];

  constructor(
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.cargarPreferencias();
  }

  async cargarPreferencias() {
    const email = localStorage.getItem('emailUsuario');
    if (!email) return;

    try {
      const datos: any = await this.usuariosService.obtenerPreferencias(email);

      if (datos) {
        this.ngZone.run(() => {
          this.generos = datos['generos'] || [];
          this.actores = datos['actores'] || [];

          console.log('Preferencias cargadas mediante el servicio:', this.generos, this.actores);
          this.cdr.detectChanges();
        });
      }
    } catch (error) {
      console.error("Error al cargar preferencias:", error);
    }
  }
}
