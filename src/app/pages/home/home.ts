import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Peliculas } from '../../services/peliculas';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Carrusel } from '../../shared/carrusel/carrusel';
import { Footer } from '../../shared/footer/footer';
import { heart, heartOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { DatabaseService } from '../../services/database.service';
import { Auth, authState } from '@angular/fire/auth';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, Carrusel, IonicModule, Footer],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit, OnDestroy {
  peliculas: any[] = [];
  peliculasFiltradas: any[] = [];
  favoritosIds: string[] = [];
  generos: string[] = ["Comedia", "Drama", "Accion"];
  menuFiltrosVisible: boolean = false;
  filtroActivo: 'cartelera' | 'proximamente' | 'favoritos' = 'cartelera';
  private authSub!: Subscription;

  constructor(
    private peliculasService: Peliculas,
    private cdr: ChangeDetectorRef,
    private db: DatabaseService,
    private router: Router,
    private auth: Auth,
  ) {
    addIcons({ heart, heartOutline });
  }

  async ngOnInit(): Promise<void> {
    // Cargar películas una vez
    this.peliculasService.getPeliculas().subscribe({
      next: (datos) => {
        this.peliculas = datos;
        this.aplicarFiltros();
        this.cdr.detectChanges();
      },
      error: (error) => console.error("Fallo:", error)
    });

    // Recargar favoritos cada vez que el usuario cambia (login/logout)
    this.authSub = authState(this.auth).subscribe(async () => {
      this.favoritosIds = await this.db.getFavoritos();
      // Si estaba en el filtro de favoritos y se deslogueó, volvemos a cartelera
      if (this.filtroActivo === 'favoritos') {
        this.filtroActivo = 'cartelera';
      }
      this.aplicarFiltros();
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy(): void {
    if (this.authSub) this.authSub.unsubscribe();
  }

  /** Navegar al detalle evitando el problema de doble clic de ion-card */
  irADetalle(id: any, event: Event): void {
    const target = event.target as HTMLElement;
    if (target.closest('.btn-favorito')) return;
    this.router.navigate(['/info', id]);
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

  setFiltroPrincipal(tipo: 'cartelera' | 'proximamente' | 'favoritos') {
    this.filtroActivo = tipo;
    this.menuFiltrosVisible = false;
    this.aplicarFiltros();
  }

  aplicarFiltros() {
    if (this.filtroActivo === 'proximamente') {
      this.peliculasFiltradas = this.peliculas.filter(p => this.esEstreno(p.fecha));
    } else if (this.filtroActivo === 'favoritos') {
      this.peliculasFiltradas = this.peliculas.filter(p => this.favoritosIds.includes(String(p.id)));
    } else {
      this.peliculasFiltradas = [...this.peliculas];
    }
  }

  async toggleFavorito(peliId: any, event: Event) {
    event.stopPropagation();
    event.preventDefault();
    const idStr = String(peliId);

    if (this.favoritosIds.includes(idStr)) {
      await this.db.removeFavorito(idStr);
      this.favoritosIds = this.favoritosIds.filter(id => id !== idStr);
    } else {
      await this.db.addFavorito(idStr);
      this.favoritosIds.push(idStr);
    }

    if (this.filtroActivo === 'favoritos') {
      this.aplicarFiltros();
    }
    this.cdr.detectChanges();
  }

  isFavorito(peliId: any): boolean {
    return this.favoritosIds.includes(String(peliId));
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
