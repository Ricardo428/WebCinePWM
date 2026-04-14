import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-eleccion',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './eleccion_preferencias.html',
  styleUrl: './eleccion_preferencias.css',
})
export class Eleccion implements OnInit {
  listaGenerosDisponibles = ['Acción', 'Comedia', 'Drama', 'Terror', 'Sci-Fi', 'Infantil'];

  actores_elegidos: string[] = [];
  generos_elegidos: string[] = [];
  actorControl = new FormControl('');
  emailActivo: string | null = null;

  constructor(
    private loginService: LoginService,
    private cdr: ChangeDetectorRef,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.emailActivo = localStorage.getItem('emailUsuario');
    this.cargarDatos();
  }

  cargarDatos(): void {
    const email = localStorage.getItem('emailUsuario');
    const guardadoLocal = localStorage.getItem(`preferencias_${email}`);

    if (guardadoLocal) {
      const datos = JSON.parse(guardadoLocal);
      this.generos_elegidos = datos.generos || [];
      this.actores_elegidos = datos.actores || [];
    } else {
      this.loginService.getUsers().subscribe((usuarios) => {
        const user = usuarios.find((u: any) => u.email === email);
        if (user) {
          this.generos_elegidos = [...user.generos];
          this.actores_elegidos = [...user.actores];
        }
      });
    }
  }

  eleccionesGeneros(evento: any, genero: string): void {
    const check = evento.target.checked;

    if (check) {
      if (!this.generos_elegidos.includes(genero)) {
        this.generos_elegidos.push(genero);
      }
    } else {
      this.generos_elegidos = this.generos_elegidos.filter((g) => g !== genero);
    }

    console.log('Lista actual de géneros:', this.generos_elegidos);
  }

  estaSeleccionado(genero: string): boolean {
    return this.generos_elegidos.includes(genero);
  }

  anadirActor(): void {
    const nombre = this.actorControl.value?.trim();
    if (nombre) {
      this.actores_elegidos.push(nombre);
      this.actorControl.setValue('');
    }
  }

  eliminarActor(index: number): void {
    this.actores_elegidos.splice(index, 1);
  }

  guardar(): void {
    const generosLimpios = [...new Set(this.generos_elegidos)];

    const dataToSave = {
      generos: generosLimpios,
      actores: this.actores_elegidos,
    };

    localStorage.setItem(`preferencias_${this.emailActivo}`, JSON.stringify(dataToSave));
    this.router.navigate(['/preferencias']);
  }
}
