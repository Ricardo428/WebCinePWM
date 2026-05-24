import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Peliculas } from '../../services/peliculas';
import { LoginService } from '../../services/login.service';
import { DatabaseService } from '../../services/database.service';
import { Subscription } from 'rxjs';

import { IonicModule } from '@ionic/angular';
import { Footer } from '../../shared/footer/footer';
import { heart, heartOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-info-film',
  host: { class: 'ion-page' },
  templateUrl: './info-film.html',
  styleUrl: './info-film.css',
  standalone: true,
  imports: [IonicModule, Footer]
})
export class InfoFilm implements OnInit, OnDestroy {
  pelicula: any;
  isFavorito: boolean = false;
  isLoggedIn: boolean = false;
  private loginSub!: Subscription;
  private favoritosSub!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private peliculasService: Peliculas,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private loginService: LoginService,
    private db: DatabaseService,
  ) {
    addIcons({ heart, heartOutline });
  }

  seleccionarSesion(hora: string, peliId: number) {
    if (!this.isLoggedIn) {
      this.router.navigate(['/login']);
      return;
    }
    sessionStorage.setItem('pelicula_id', peliId.toString());
    sessionStorage.setItem('hora_seleccionada', hora);
    this.router.navigate(['/sala']);
  }

  async toggleFavorito() {
    if (!this.isLoggedIn) {
      this.router.navigate(['/login']);
      return;
    }
    const idStr = String(this.pelicula.id);
    if (this.isFavorito) {
      await this.db.removeFavorito(idStr);
    } else {
      await this.db.addFavorito(idStr);
    }
  }

  async ngOnInit(): Promise<void> {
    this.loginSub = this.loginService.estadoLogin$.subscribe(estado => {
      this.isLoggedIn = estado;
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.peliculasService.getPeliculas().subscribe({
        next: (datos) => {
          this.pelicula = datos.find((p: any) => p.id == id);
          this.cdr.detectChanges();
        },
      });

      this.favoritosSub = this.db.favoritos$.subscribe(ids => {
        this.isFavorito = ids.includes(String(id));
        this.cdr.detectChanges();
      });
    }
  }

  ngOnDestroy(): void {
    if (this.loginSub) this.loginSub.unsubscribe();
    if (this.favoritosSub) this.favoritosSub.unsubscribe();
  }
}
