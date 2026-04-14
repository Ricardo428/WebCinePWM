import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { HistorialService } from '../../services/historialService';

@Component({
  selector: 'app-historial',
  imports: [],
  templateUrl: './historial.html',
  styleUrl: './historial.css',
  standalone: true,
})
export class Historial implements OnInit {
  compras: any[] = [];


  constructor(private historialService: HistorialService,
              private cdr: ChangeDetectorRef) {}


  ngOnInit() {
    this.historialService.getHistorial().subscribe({
      next: data => {
        this.compras = data;
        this.cdr.detectChanges();
      },
      error: err => {
        console.log("Eroor en la carga de datos",err);
      }
    })
  }

}
