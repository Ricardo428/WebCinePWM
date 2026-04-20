import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { Carrusel } from '../../shared/carrusel/carrusel';

// 1. IMPORTAMOS LOS MÉTODOS DE FIRESTORE
import { Firestore, doc, getDoc, updateDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-eleccion',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, Carrusel],
  templateUrl: './eleccion_preferencias.html',
  styleUrl: './eleccion_preferencias.css',
})
export class Eleccion implements OnInit {
  // 2. INYECTAMOS FIRESTORE
  private firestore: Firestore = inject(Firestore);

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

  // Convertimos la función en async para usar await y que quede más limpia
  async cargarDatos(): Promise<void> {
    if (!this.emailActivo) return;

    // En Firestore usamos 'doc' y podemos usar el email normal con puntos
    const userRef = doc(this.firestore, `usuarios/${this.emailActivo}`);

    try {
      const snapshot = await getDoc(userRef); // Usamos getDoc

      if (snapshot.exists()) {
        const datos = snapshot.data(); // En Firestore es .data(), no .val()
        console.log("Datos recuperados de Firestore:", datos);

        // Firestore respeta los arrays, solo nos aseguramos de que no vengan undefined
        const g_raw = Array.isArray(datos['generos']) ? datos['generos'] : [];
        const a_raw = Array.isArray(datos['actores']) ? datos['actores'] : [];

        // Limpiamos la palabra Vacio si por algún motivo la tiene
        this.generos_elegidos = g_raw.filter((g: any) =>
          typeof g === 'string' && g.toLowerCase() !== 'vacio' && g.toLowerCase() !== 'inicial'
        );

        this.actores_elegidos = a_raw.filter((a: any) =>
          typeof a === 'string' && a.toLowerCase() !== 'vacio' && a.toLowerCase() !== 'inicial'
        );

        this.cdr.detectChanges();
      }
    } catch (err) {
      console.error("Error al cargar datos:", err);
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
    if (!this.emailActivo) return;

    const userRef = doc(this.firestore, `usuarios/${this.emailActivo}`);

    const generosLimpios = this.generos_elegidos.filter(g => g.toLowerCase() !== 'vacio');
    const actoresLimpios = this.actores_elegidos.filter(a => a.toLowerCase() !== 'vacio');

    const updates: any = {};
    // En Firestore no hay problema en guardar arrays vacíos []
    updates['generos'] = generosLimpios.length > 0 ? [...new Set(generosLimpios)] : [];
    updates['actores'] = actoresLimpios.length > 0 ? actoresLimpios : [];

    try {
      await updateDoc(userRef, updates); // Usamos updateDoc
      console.log("¡Datos actualizados en Firestore!");

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
