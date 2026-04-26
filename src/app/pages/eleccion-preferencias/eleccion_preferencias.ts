import {Component, OnInit, ChangeDetectorRef, inject, NgZone, OnDestroy} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { Carrusel } from '../../shared/carrusel/carrusel';

import { UsuariosService } from '../../services/usuarios.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-eleccion',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, Carrusel],
  templateUrl: './eleccion_preferencias.html',
  styleUrl: './eleccion_preferencias.css',
})
export class Eleccion implements OnInit, OnDestroy {

  private usuariosService: UsuariosService = inject(UsuariosService);
  private ngZone: NgZone = inject(NgZone);

  listaGenerosDisponibles = ['Acción', 'Comedia', 'Drama', 'Terror', 'Sci-Fi', 'Infantil'];
  actores_elegidos: string[] = [];
  generos_elegidos: string[] = [];
  actorControl = new FormControl('');
  uidActivo: string | null | undefined = null;
  private authSub: Subscription | null = null;

  constructor(
    private loginService: LoginService,
    private cdr: ChangeDetectorRef,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.authSub = this.loginService.obtnerUsuarioActual().subscribe(user => {
      if (user) {
        this.uidActivo = user.uid;
        console.log("Usuario detectado por Firebase:", this.uidActivo);
        this.cargarDatos();
      } else {
        console.warn("No hay usuario autenticado");
      }
    });

  }
  ngOnDestroy(): void {
    if (this.authSub) this.authSub.unsubscribe();
  }


  async cargarDatos(): Promise<void> {
    if (!this.uidActivo) return;

    try {
      const datos: any = await this.usuariosService.obtenerPreferencias(this.uidActivo);

      if (datos) {
        this.ngZone.run(() => {
          const g_raw = Array.isArray(datos['generos']) ? datos['generos'] : [];
          this.generos_elegidos = g_raw.filter((g: any) => g.toLowerCase() !== 'vacio');

          const a_raw = Array.isArray(datos['actores']) ? datos['actores'] : [];
          this.actores_elegidos = a_raw.filter((a: any) => a.toLowerCase() !== 'vacio');

          console.log("Datos listos para el HTML de elección:", this.generos_elegidos);
          this.cdr.detectChanges();
        });
      }
    } catch (err) {
      console.error("Error cargando:", err);
    }
  }

  eleccionesGeneros(evento: any, genero: string): void {
    const check = evento.target.checked;

    if (check) {
      if (!this.generos_elegidos.includes(genero)) {
        this.generos_elegidos = [...this.generos_elegidos, genero];
      }
    } else {
      this.generos_elegidos = this.generos_elegidos.filter((g) => g !== genero);
    }
    this.cdr.detectChanges();
  }

  estaSeleccionado(genero: string): boolean {
    return this.generos_elegidos.includes(genero);
  }

  anadirActor(): void {
    const nombre = this.actorControl.value?.trim();
    if (nombre && nombre.toLowerCase() !== 'vacio' && nombre.toLowerCase() !== 'inicial') {
      this.actores_elegidos.push(nombre);
      this.actorControl.setValue('');
      this.cdr.detectChanges();
    }
  }

  eliminarActor(index: number): void {
    this.actores_elegidos.splice(index, 1);
    this.cdr.detectChanges();
  }

  async guardar(): Promise<void> {
    if (!this.uidActivo) return;

    const generosLimpios = this.generos_elegidos.filter(g => g.toLowerCase() !== 'vacio');
    const actoresLimpios = this.actores_elegidos.filter(a => a.toLowerCase() !== 'vacio');

    const generosFinales = generosLimpios.length > 0 ? [...new Set(generosLimpios)] : [];
    const actoresFinales = actoresLimpios.length > 0 ? actoresLimpios : [];

    try {
      await this.usuariosService.guardarPreferencias(this.uidActivo, generosFinales, actoresFinales);

      console.log("¡Datos actualizados mediante el servicio!");

      this.router.navigate(['/preferencias']);
    } catch (error) {
      console.error("Error al guardar:", error);
      alert("Error al conectar con la base de datos.");
    }
  }
}
