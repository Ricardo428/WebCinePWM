import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { Peliculas } from '../../services/peliculas';
import { CommonModule } from '@angular/common';
import {BarraPasos} from '../../shared/barra-pasos/barra-pasos';
import {Temporizador} from '../../shared/temporizador/temporizador';

interface ItemTicket {
  nombre: string;
  cantidad: number;
  precio: number;
}

@Component({
  selector: 'app-resumen',
  standalone: true,
  imports: [CommonModule, RouterLink, BarraPasos, Temporizador],
  templateUrl: './resumen_registrado.html',
  styleUrl: './resumen_registrado.css',
})
export class Resumen implements OnInit {
  pelicula: any;

  reserva = {
    fecha: new Date().toLocaleDateString(),
    hora: '',
    butaca: '',
    fila: '',
  };

  carrito: ItemTicket[] = [];
  totalCompra: number = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private peliculasService: Peliculas,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    const peliId = sessionStorage.getItem('pelicula_id');
    this.reserva.hora = sessionStorage.getItem('hora_seleccionada') || 'Sin hora';
    this.reserva.butaca = sessionStorage.getItem('butacas_seleccionadas') || 'N/A';
    this.reserva.fila = sessionStorage.getItem('fila_seleccionada') || 'N/A';

    if (!peliId) {
      alert('Error: No se encontró ninguna compra en curso.');
      this.router.navigate(['/']);
      return; // Detenemos la ejecución
    }

    this.peliculasService.getPeliculas().subscribe({
      next: (datos) => {
        const todas = datos.peliculas ? datos.peliculas : datos;
        this.pelicula = todas.find((p: any) => String(p.id) === String(peliId));
        this.cdr.detectChanges();
      },
    });

    this.construirTicket();
  }
  construirTicket() {
    this.carrito = [];
    let sumatorioTotal = 0;

    const cantNormal = parseInt(sessionStorage.getItem('Normal') || '0', 10);
    const cantAdulto = parseInt(sessionStorage.getItem('Adulto') || '0', 10);
    const cantNinos = parseInt(sessionStorage.getItem('Niños') || '0', 10);

    if (cantNormal > 0) {
      this.carrito.push({ nombre: 'Entrada Normal', cantidad: cantNormal, precio: 8.0 });
      sumatorioTotal += cantNormal * 8.0;
    }
    if (cantAdulto > 0) {
      this.carrito.push({ nombre: 'Pack familia Adulto', cantidad: cantAdulto, precio: 6.5 });
      sumatorioTotal += cantAdulto * 6.5;
    }
    if (cantNinos > 0) {
      this.carrito.push({ nombre: 'Pack familia Niño', cantidad: cantNinos, precio: 5.0 });
      sumatorioTotal += cantNinos * 5.0;
    }

    const snacksGuardados = sessionStorage.getItem('carritoSnacks');
    if (snacksGuardados) {
      const snacks = JSON.parse(snacksGuardados);
      snacks.forEach((item: any) => {
        this.carrito.push({
          nombre: item.producto.name,
          cantidad: item.cantidad,
          precio: item.producto.price,
        });
        sumatorioTotal += item.producto.price * item.cantidad;
      });
    }

    this.totalCompra = sumatorioTotal;

  }
}
