import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { Carrusel } from '../../shared/carrusel/carrusel';
import { Database, ref, update, get } from '@angular/fire/database';

@Component({
  selector: 'app-eleccion',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, Carrusel],
  templateUrl: './eleccion_preferencias.html',
  styleUrl: './eleccion_preferencias.css',
})
export class Eleccion implements OnInit {
  private db: Database = inject(Database);

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
    if (!this.emailActivo) return;

    const emailKey = this.emailActivo.replace(/\./g, '_');
    const userRef = ref(this.db, `usuarios/${emailKey}`);

    get(userRef).then((snapshot) => {
      if (snapshot.exists()) {
        const datos = snapshot.val();
        console.log("Datos recuperados de Firebase:", datos);

        const aArray = (valor: any) => {
          if (!valor) return [];
          if (Array.isArray(valor)) return valor;
          return Object.values(valor);
        };

        const g_raw = aArray(datos.generos);
        const a_raw = aArray(datos.actores);

        this.generos_elegidos = g_raw.filter((g: any) =>
          typeof g === 'string' && g.toLowerCase() !== 'vacio' && g.toLowerCase() !== 'inicial'
        );

        this.actores_elegidos = a_raw.filter((a: any) =>
          typeof a === 'string' && a.toLowerCase() !== 'vacio' && a.toLowerCase() !== 'inicial'
        );

        this.cdr.detectChanges();
      }
    }).catch(err => console.error("Error al cargar datos:", err));
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
    if (!this.emailActivo) return;

    const emailKey = this.emailActivo.replace(/\./g, '_');
    const userRef = ref(this.db, `usuarios/${emailKey}`);

    const generosLimpios = this.generos_elegidos.filter(g => g.toLowerCase() !== 'vacio');
    const actoresLimpios = this.actores_elegidos.filter(a => a.toLowerCase() !== 'vacio');

    const updates: any = {};
    updates['generos'] = generosLimpios.length > 0 ? [...new Set(generosLimpios)] : null;
    updates['actores'] = actoresLimpios.length > 0 ? actoresLimpios : null;

    try {
      await update(userRef, updates);
      console.log("¡Datos actualizados!");

      localStorage.setItem(`preferencias_${this.emailActivo}`, JSON.stringify({
        generos: generosLimpios,
        actores: actoresLimpios
      }));

      this.router.navigate(['/preferencias']);
    } catch (error) {
      console.error("Error al guardar:", error);
      alert("Error al conectar con la base de datos.");
    }
  }
}
