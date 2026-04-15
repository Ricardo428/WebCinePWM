import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import {AuthService} from '../../services/auth';

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
              private authService: AuthService) {}

  registro(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    this.authService.registerFire(<string>this.registerForm.value.email,<string>this.registerForm.value.password)
      .then((value) => {
        console.log("¡Usuario registrado en Firebase con éxito!", value.user.email);
        this.loginService.actualizarEstado(true);
        localStorage.setItem('emailUsuario', this.registerForm.value.email!);
        this.router.navigate(['/eleccion']);
    })
    .catch((error) => {
      console.log(error);
    })



  }
}

