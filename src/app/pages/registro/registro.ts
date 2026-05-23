import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';
import { Usuario } from '../../models/usuario';

import { IonicModule } from '@ionic/angular';
import { Footer } from '../../shared/footer/footer';

@Component({
  selector: 'app-registro',
  imports: [ReactiveFormsModule, IonicModule, Footer],
  templateUrl: './registro.html',
  styleUrl: './registro.css',
  standalone: true,
})
export class Registro {

  fotoPreview: string | null = null;
  private fotoBase64: string | null = null;

  registerForm = new FormGroup({
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern('(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}'),
    ]),
    born: new FormControl('', [Validators.required]),
  });

  constructor(
    private router: Router,
    private loginService: LoginService,
    private usuariosService: UsuariosService,
  ) {}

  /** Captura la foto seleccionada y la convierte a Base64 para previsualizar y guardar */
  onFotoSeleccionada(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      this.fotoBase64 = reader.result as string;
      this.fotoPreview = this.fotoBase64;
    };
    reader.readAsDataURL(file);
  }

  registro(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const email = this.registerForm.value.email!;
    const password = this.registerForm.value.password!;

    this.loginService.registerFire(email, password)
      .then(async (value) => {
        console.log('¡Usuario autenticado!', value.user.uid);

        const nuevoUsuario: Usuario = {
          uid: value.user.uid,
          nombre: this.registerForm.value.name ?? '',
          apellido: this.registerForm.value.surname ?? '',
          email: email,
          nacimiento: this.registerForm.value.born ?? '',
          password: password,
          foto: this.fotoBase64 ?? '',
          generos: ['Vacio'],
          actores: ['Vacio'],
          puntos: 0,
        };

        await this.usuariosService.crearUsuario(nuevoUsuario);
        this.router.navigate(['/eleccion']);
      })
      .catch((error) => {
        console.error('Error en el registro:', error);
        alert('Error al registrar: ' + error.message);
      });
  }
}
