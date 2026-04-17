import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import {Carrusel} from '../../shared/carrusel/carrusel';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, Carrusel],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  errorLogin: boolean = false;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    captcha: new FormControl(false, [Validators.requiredTrue]),
  });

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {}

  intentarEntrar() {
    if (this.loginForm.invalid){
      this.loginForm.markAllAsTouched();
      return;
    }

    const email = this.loginForm.value.email!;
    const password = this.loginForm.value.password!;

    this.loginService.loginFire(email, password).then(exito =>{
        this.errorLogin = false;
        this.loginService.actualizarEstado(true)
        localStorage.setItem('emailUsuario', this.loginForm.value.email!);
        this.router.navigate(['/']);

    }).catch(erro => {
      this.errorLogin = true;
      console.log("Error: ",erro);
    })

    /*
    this.loginService.hacerLogin(email, password).subscribe((exito) => {
      if (exito) {
        this.errorLogin = false;

        localStorage.setItem('isloggedIn', 'true');
        localStorage.setItem('emailUsuario', email);

        this.router.navigate(['']);
      } else {
        this.errorLogin = true;
      }
    });
    */

  }
}
