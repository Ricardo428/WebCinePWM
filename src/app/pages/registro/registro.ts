import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { Database, ref, set } from '@angular/fire/database';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import {UsuariosService} from '../../services/usuarios.service';

@Component({
  selector: 'app-registro',
  imports: [ReactiveFormsModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css',
  standalone: true,
})
export class Registro {

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
              private loginService: LoginService,
              private usuariosService: UsuariosService) {}



  registro(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const email = this.registerForm.value.email!;
    const password = this.registerForm.value.password!;

    this.loginService.registerFire(email, password)
      .then(async (value) => {
        console.log("¡Usuario autenticado!", value.user.uid);

        const nuevoUsuario = {
          uid: value.user.uid,
          nombre: this.registerForm.value.name,
          apellido: this.registerForm.value.surname,
          email: email,
          nacimiento: this.registerForm.value.born,
          password: password,
          generos: ['Vacio'],
          actores: ['Vacio'],
          puntos: 0
        };

        await this.usuariosService.crearUsuario(nuevoUsuario);
        this.router.navigate(['/eleccion']);
      })
      .catch((error) => {
        console.error("Error en el registro:", error);
        alert("Error al registrar: " + error.message);
      });

  }
}
