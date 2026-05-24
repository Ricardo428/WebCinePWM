import {ChangeDetectorRef, Component, OnInit, OnDestroy} from '@angular/core';
import { HistorialService } from '../../services/historialService';
import {LoginService} from '../../services/login.service';
import { Subscription, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-historial',
  host: { class: 'ion-page' },
  imports: [
    IonicModule
  ],
  templateUrl: './historial.html',
  styleUrl: './historial.css',
  standalone: true,
})
export class Historial implements OnInit, OnDestroy {
  compras: any[] = [];
  userUid?: string;
  private sub!: Subscription;

  constructor(private historialService: HistorialService,
              private cdr: ChangeDetectorRef,
              private loginService: LoginService) {}

  ngOnInit() {
    this.sub = this.loginService.obtnerUsuarioActual().pipe(
      switchMap(user => {
        if (user && user.uid) {
          this.userUid = user.uid;
          return this.historialService.getHistorial(user.uid);
        } else {
          this.userUid = undefined;
          return of([]);
        }
      })
    ).subscribe({
      next: data => {
        this.compras = data;
        this.cdr.detectChanges();
      }
    });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
