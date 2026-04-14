import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../services/login.service';
import {Subscription} from 'rxjs';
import {Carrusel} from '../../shared/carrusel/carrusel';

@Component({
  selector: 'app-perfil',
  imports: [RouterLink, Carrusel],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css',
  standalone: true,
})
export class Perfil implements OnInit, OnDestroy {
  user: any;
  loginSub!: Subscription;

  constructor(
    private http: HttpClient,
    private router: Router,
    private loginService: LoginService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loginSub =  this.loginService.estadoLogin$.subscribe((estado) => {
      const email = localStorage.getItem('emailUsuario');

      if (estado && email) {
        this.cargarDatos(email);
      } else {
        this.router.navigate(['/login']);
      }
    });
  }
  ngOnDestroy(): void {
    if (this.loginSub) {
      this.loginSub.unsubscribe();
    }
  }


  private cargarDatos(email: string) {
    this.loginService.getUsers().subscribe({
      next: (data) => {
        this.user = data.find((dateUser: any) => dateUser.email == email);
        this.cdr.detectChanges();
      },
      error: (err) => console.error("No se pudo conectar con el JSON", err)
    });
  }
}






