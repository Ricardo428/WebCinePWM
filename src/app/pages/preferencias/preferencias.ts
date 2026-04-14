import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {LoginService} from '../../services/login.service';
import {RouterLink} from '@angular/router';


@Component({
  selector: 'app-preferencias',
  imports: [RouterLink],
  templateUrl: './preferencias.html',
  styleUrl: './preferencias.css',
  standalone: true,
})
export class Preferencias implements OnInit {
  generos: any[] = [];
  actores: any[] = [];

  constructor(
    private loginService: LoginService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    const email = localStorage.getItem('emailUsuario');

    const preferenciasGuardadas = localStorage.getItem(`preferencias_${email}`);

    if (preferenciasGuardadas) {
      const datos = JSON.parse(preferenciasGuardadas);
      this.generos = datos.generos;
      this.actores = datos.actores;
      this.cdr.detectChanges();
    } else {
      this.loginService.getUsers().subscribe({
        next: (data) => {
          const usuarioJson = data.find((user: any) => user.email === email);
          if (usuarioJson) {
            this.generos = usuarioJson.generos;
            this.actores = usuarioJson.actores;
            this.cdr.detectChanges();
          }
        },
      });
    }
  }
}
