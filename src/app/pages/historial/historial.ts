import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { HistorialService } from '../../services/historialService';
import {LoginService} from '../../services/login.service';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-historial',
  imports: [
    RouterLink
  ],
  templateUrl: './historial.html',
  styleUrl: './historial.css',
  standalone: true,
})
export class Historial implements OnInit {
  compras: any[] = [];
  userUid?: string;

  constructor(private historialService: HistorialService,
              private cdr: ChangeDetectorRef,
              private loginService: LoginService) {}

  ngOnInit() {
    this.loginService.obtnerUsuarioActual().subscribe(user =>{
      if (user) {
        this.userUid = user.uid
      }

      this.historialService.getHistorial(<string>this.userUid).subscribe({
        next: data => {
          this.compras = data;
          this.cdr.detectChanges();
        }
      })
    })
  }
}
