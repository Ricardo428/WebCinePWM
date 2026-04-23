import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import {Carrusel} from '../../shared/carrusel/carrusel';
import { RecaptchaModule } from 'ng-recaptcha';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, Carrusel, RecaptchaModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  errorLogin: boolean = false;
  recaptchaResuelto: boolean = false;
  siteKey: string = environment.recaptchaSiteKey;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {}

    captchaResuelto(tokenValido: string | null) {
    this.recaptchaResuelto = !!tokenValido;
    }
    intentarEntrar() {
    if (this.loginForm.invalid){
      this.loginForm.markAllAsTouched();
      return;
    }
    if (!this.recaptchaResuelto) {
      alert("Por favor, verifica que no eres un robot resolviendo el captcha.");
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



  }
}
