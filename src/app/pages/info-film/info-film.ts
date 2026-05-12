import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Peliculas} from '../../services/peliculas';
import {LoginService} from '../../services/login.service';
import {Subscription} from 'rxjs';

import { IonicModule } from '@ionic/angular';
import { Footer } from '../../shared/footer/footer';

@Component({
  selector: 'app-info-film',
  templateUrl: './info-film.html',
  styleUrl: './info-film.css',
  standalone: true,
  imports: [IonicModule, Footer]
})
export class InfoFilm implements OnInit {
  pelicula: any;
  private loginSub!: Subscription;
  isLoggedIn: boolean = false;


  constructor(
    private route: ActivatedRoute,
    private peliculasService: Peliculas,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private loginService: LoginService,
  ) {}

  seleccionarSesion(hora: string, peliId: number) {

    if (!this.isLoggedIn) {
      this.router.navigate(['/login']);
      return;
    }

    sessionStorage.setItem('pelicula_id', peliId.toString());
    sessionStorage.setItem('hora_seleccionada', hora);

    this.router.navigate(['/sala']);
  }

  ngOnInit(): void {
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
    }
  }
}
