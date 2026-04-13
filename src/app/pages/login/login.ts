import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms'; // ¡Importante!
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
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
    private router: Router,
  ) {}

  intentarEntrar() {
    if (this.loginForm.invalid){
      this.loginForm.markAllAsTouched();
      return;
    }

    const email = this.loginForm.value.email!;
    const password = this.loginForm.value.password!;


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
  }
}
