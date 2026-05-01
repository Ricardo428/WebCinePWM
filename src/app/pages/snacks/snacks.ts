import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { BarraPasos } from '../../shared/barra-pasos/barra-pasos';
import { Temporizador } from '../../shared/temporizador/temporizador';
import { Location, CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SnacksService } from '../../services/snacks.service';
import {ItemCarrito, Producto} from '../../models/snack';

@Component({
  selector: 'app-snacks',
  standalone: true,
  imports: [BarraPasos, Temporizador, CommonModule],
  templateUrl: './snacks.html',
  styleUrl: './snacks.css',
})

export class Snacks implements OnInit {
  productosOriginales: Producto[] = [];
  productosFiltrados: Producto[] = [];
  carrito: ItemCarrito[] = [];

  categoriaSeleccionada: string = 'Bebida'
  categorias: string[] = ['Bebida', 'Palomitas', 'Menús', 'Otros'];

  constructor(private router: Router, private snackService: SnacksService, private location: Location, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.snackService.getSnacks().subscribe({
      next: (snacks) => {
        this.productosOriginales = snacks;
        this.filtrarPorCategoria(this.categoriaSeleccionada);
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error("Error cargando JSON. Revisa que HttpClient esté en app.config.ts:", err);
    }
    });
  }
  cambiarCategoria(categoria: string) {
    this.categoriaSeleccionada = categoria;
    this.filtrarPorCategoria(categoria);
  }

  filtrarPorCategoria(categoria: string) {
    this.productosFiltrados = this.productosOriginales.filter(p => p.category === categoria);
  }

  agregarAlCarrito(producto: Producto) {
    const itemExistente = this.carrito.find(item => item.producto.id === producto.id);

    if (itemExistente) {
      itemExistente.cantidad++;
    } else {
      this.carrito.push({ producto, cantidad: 1 });
    }
  }

  eliminarDelCarrito(producto: Producto) {
    const index = this.carrito.findIndex(item => item.producto.id === producto.id);

    if (index > -1) {
      if (this.carrito[index].cantidad > 1) {
        this.carrito[index].cantidad--;
      } else {
        this.carrito.splice(index, 1);
      }
    }
  }

  calcularTotal(): number {
    return this.carrito.reduce((total, item) => total + (item.producto.price * item.cantidad), 0)
  }

  volverAtras() {
    this.router.navigate(['/entradas']);
  }

  onSubmit(event: Event) {
    event.preventDefault();

    sessionStorage.setItem('carritoSnacks', JSON.stringify(this.carrito));
    sessionStorage.setItem('totalSnacks', this.calcularTotal().toFixed(2));

    const peliId = sessionStorage.getItem('pelicula_id');
    this.router.navigate(['/resumen', peliId]);
  }

}
