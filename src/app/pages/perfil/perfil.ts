import {Component, OnInit} from '@angular/core';
import {RouterLink } from '@angular/router';
import { LoginService } from '../../services/login.service';
import {Carrusel} from '../../shared/carrusel/carrusel';

@Component({
  selector: 'app-perfil',
  imports: [RouterLink, Carrusel],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css',
  standalone: true,
})
export class Perfil implements OnInit {
  user: any;

  constructor(
    private loginService: LoginService,
  ) {}

  ngOnInit(): void {
    // Nos suscribimos para recibir los datos (email, puntos, preferencias...)
    this.loginService.obtnerUsuarioActual().subscribe(datos => {
      this.user = datos;
      console.log('Datos cargados de Firestore:', this.user);
    });
  }
}






