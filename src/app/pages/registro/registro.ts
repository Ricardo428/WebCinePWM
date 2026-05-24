import { Component, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';
import { Usuario } from '../../models/usuario';

import { IonicModule, AlertController } from '@ionic/angular';
import { Footer } from '../../shared/footer/footer';

@Component({
  selector: 'app-registro',
  host: { class: 'ion-page' },
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
    private alertController: AlertController,
    private cdr: ChangeDetectorRef
  ) {}

  async mostrarErrorAlert(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Error al registrar',
      message: mensaje,
      buttons: ['Aceptar']
    });
    await alert.present();
  }

  /** Captura la foto seleccionada, la redimensiona y comprime usando un canvas para evitar exceder el límite de Firestore (1MB) */
  onFotoSeleccionada(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e: any) => {
      const img = new Image();
      img.onload = () => {
        // Ajustar a un tamaño máximo de 300px manteniendo el aspecto
        const maxDim = 300;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxDim) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          }
        } else {
          if (height > maxDim) {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          // Comprimir como JPEG al 70% de calidad (tamaño típico <30KB)
          const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
          this.fotoBase64 = compressedBase64;
          this.fotoPreview = compressedBase64;
          this.cdr.detectChanges();
        }
      };
      img.src = e.target.result;
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
        this.mostrarErrorAlert(error.message);
      });
  }
}
