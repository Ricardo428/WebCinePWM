import { ChangeDetectorRef, Component, OnInit, inject, NgZone } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Carrusel } from '../../shared/carrusel/carrusel';
import { CommonModule } from '@angular/common';

import { UsuariosService } from '../../services/usuarios.service';
import {Subscription} from 'rxjs';
import {LoginService} from '../../services/login.service';

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
  authSub: Subscription | null = null;
  uidActivo: string | null | undefined = null;

  constructor(
    private cdr: ChangeDetectorRef,
    private loginService: LoginService,

  ) {}

  ngOnInit(): void {
    this.authSub = this.loginService.obtnerUsuarioActual().subscribe(user => {
      if (user) {
        this.uidActivo = user.uid;
        console.log("Usuario detectado por Firebase:", this.uidActivo);
        this.cargarPreferencias();
      } else {
        console.warn("No hay usuario autenticado");
      }
    });
  }

  async cargarPreferencias() {
    if (!this.uidActivo) return;

    try {
      const datos: any = await this.usuariosService.obtenerPreferencias(this.uidActivo!);

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
