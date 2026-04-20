import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { Database, ref, set } from '@angular/fire/database';

@Component({
  selector: 'app-registro',
  imports: [ReactiveFormsModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css',
  standalone: true,
})
export class Registro {
  private db: Database = inject(Database);

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

  constructor(private router: Router,
              private loginService: LoginService) {}

  async crearUsuario(usuario: any) {
    const emailKey = usuario.email.replace(/\./g, '_');

    const userRef = ref(this.db, 'usuarios/' + emailKey);

    return set(userRef, usuario);
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
        console.log("¡Usuario autenticado!", value.user.email);

        const nuevoUsuario = {
          nombre: this.registerForm.value.name,
          apellido: this.registerForm.value.surname,
          email: email,
          nacimiento: this.registerForm.value.born,
          password: password,
          generos: ['Vacio'],
          actores: ['Vacio']
        };

        await this.crearUsuario(nuevoUsuario);

        this.loginService.actualizarEstado(true);
        localStorage.setItem('emailUsuario', email);
        this.router.navigate(['/eleccion']);
      })
      .catch((error) => {
        console.error("Error en el registro:", error);
        alert("Error al registrar: " + error.message);
      });

  }
}
