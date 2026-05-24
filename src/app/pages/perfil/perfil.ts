import {Component, OnInit, OnDestroy, ChangeDetectorRef} from '@angular/core';
import {RouterLink } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { UsuariosService } from '../../services/usuarios.service';
import {Carrusel} from '../../shared/carrusel/carrusel';
import { Subscription } from 'rxjs';
import { personCircleOutline, cameraOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';

import { IonicModule } from '@ionic/angular';
import { Footer } from '../../shared/footer/footer';

@Component({
  selector: 'app-perfil',
  host: { class: 'ion-page' },
  imports: [RouterLink, Carrusel, IonicModule, Footer],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css',
  standalone: true,
})
export class Perfil implements OnInit, OnDestroy {
  user: any;
  private authSub!: Subscription;

  constructor(
    private loginService: LoginService,
    private usuariosService: UsuariosService,
    private cdr: ChangeDetectorRef
  ) {
    addIcons({ personCircleOutline, cameraOutline });
  }

  ngOnInit(): void {
    this.authSub = this.loginService.obtnerUsuarioActual().subscribe(datos => {
      this.user = datos;
      console.log('Datos cargados de Firestore:', this.user);
    });
  }

  onFotoSeleccionada(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file || !this.user?.uid) return;

    const reader = new FileReader();
    reader.onload = (e: any) => {
      const img = new Image();
      img.onload = async () => {
        // Redimensionar a un tamaño máximo de 300px manteniendo el aspecto
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
          const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);

          try {
            await this.usuariosService.actualizarFotoPerfil(this.user.uid, compressedBase64);
            console.log('Foto de perfil actualizada en Firestore');
          } catch (error) {
            console.error('Error al actualizar la foto de perfil:', error);
          }
        }
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  ngOnDestroy(): void {
    if (this.authSub) {
      this.authSub.unsubscribe();
    }
  }
}






