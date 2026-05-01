import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { Router, RouterLink} from '@angular/router';
import {Peliculas} from '../../services/peliculas';
import {CommonModule} from '@angular/common';
import {HistorialService} from '../../services/historialService';
import {LoginService} from '../../services/login.service';

interface ItemTicket {
  nombre: string;
  cantidad: number;
  precio: number;
}

@Component({
  selector: 'app-exito',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './pago_realizado_con_exito.html',
  styleUrl: './pago_realizado_con_exito.css',
})
export class Exito implements OnInit {
  pelicula: any;

  reserva = {
    fecha: new Date().toLocaleDateString(),
    hora: '',
    butaca: '',
    fila: '',
  };
  private uuid: any;

  carrito: ItemTicket[] = [];
  totalCompra: number = 0;
  public user: any;

  constructor(
    private router: Router,
    private peliculasService: Peliculas,
    private cdr: ChangeDetectorRef,
    private historialService: HistorialService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    const peliId = sessionStorage.getItem('pelicula_id');
    console.log('Iniciando pelicula');
    this.reserva.hora = sessionStorage.getItem('hora_seleccionada') || 'Sin hora';
    this.reserva.butaca = sessionStorage.getItem('butacas_seleccionadas') || 'N/A';
    this.reserva.fila = sessionStorage.getItem('fila_seleccionada') || 'N/A';

    // User
    this.loginService.obtnerUsuarioActual().subscribe(user => {
      if (user) {
        this.user = user;
        // Compra
        const compra = {
          user: this.user.uid,
          pelicula: this.pelicula,
          fecha: new Date().toLocaleDateString(),
          hora: this.reserva.hora,
          totalCompra: this.totalCompra,
        };

        this.historialService.addBuy(compra);
      }
    })


    if (!peliId) {
      alert('Error: No se encontró ninguna compra en curso.');
      this.router.navigate(['/']);
      return; // Detenemos la ejecución
    }

    this.peliculasService.getPeliculas().subscribe({
      next: (datos) => {
        this.pelicula = datos.find((p: any) => String(p.id) === String(peliId));
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
