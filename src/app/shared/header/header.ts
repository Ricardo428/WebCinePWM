import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {Peliculas} from '../../services/peliculas';
import {LoginService} from '../../services/login.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
  standalone: true,
})
export class Header implements OnInit, OnDestroy {
  isLoggedIn: boolean = false;
  todasPeliculas: any[] = [];
  resultados: any[] = [];
  private loginSub!: Subscription;

  constructor(
    private router: Router,
    private peliculas: Peliculas,
    private cdr: ChangeDetectorRef,
    private loginService: LoginService,
  ) {}



  ngOnInit(): void {
    this.loginSub = this.loginService.estadoLogin$.subscribe(estado => {
      this.isLoggedIn = estado;
    });

    this.peliculas.getPeliculas().subscribe({
      next: (datos) => {
        this.todasPeliculas = datos.peliculas ? datos.peliculas : datos;
      },
    });

    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    if (this.loginSub) {
      this.loginSub.unsubscribe();
    }
  }

  buscarPeliculas(event: Event): void {
    const input = event.target as HTMLInputElement;
    const texto = input.value.trim().toLowerCase();

    if (texto.length > 0) {
      this.resultados = this.todasPeliculas.filter((p) => p.titulo.toLowerCase().includes(texto));
    } else {
      this.resultados = [];
    }
  }

  irAPelicula(id: number, inputBuscador: HTMLInputElement): void {
    this.resultados = [];
    inputBuscador.value = '';
    this.router.navigate(['/info', id]);
  }

  cerrarSesion(): void {
    // TO DO: Revision de emailUsuario .... (Firebase)
    localStorage.removeItem('emailUsuario');
    this.loginService.cerrarSesion().then(r => {
      this.router.navigate(['/']);
    })
  }
}
