import {AfterViewInit, Component, computed, ElementRef, OnDestroy, OnInit, signal, ViewChild} from '@angular/core';
import {CommonModule, Location} from '@angular/common';
import {Router} from '@angular/router';
import {BarraPasos} from '../../shared/barra-pasos/barra-pasos';
import {Temporizador} from '../../shared/temporizador/temporizador';
import Panzoom, {PanzoomObject} from '@panzoom/panzoom';

export type EstadoButaca = 'libre' | 'ocupada' | 'seleccionada';

export interface Butaca {
  id: string;
  fila: number;
  asiento: number;
  estado: EstadoButaca;
}

@Component({
  selector: 'app-sala',
  imports: [BarraPasos, Temporizador, CommonModule],
  templateUrl: './sala.html',
  styleUrl: './sala.css',
  standalone: true,
})
export class Sala implements AfterViewInit, OnDestroy {
  @ViewChild('lienzoButacas') lienzo!: ElementRef;
  @ViewChild('contenedorPanzoom') contenedor!: ElementRef;
  panzoomInstance!: PanzoomObject;

  // SIGNAL: Estado principal de todas las butacas
  butacas = signal<Butaca[]>([]);

  // COMPUTED: Se actualiza solo cuando cambia el signal de butacas
  seleccionadasCount = computed(() =>
    this.butacas().filter(b => b.estado === 'seleccionada').length
  );

  constructor(private location: Location, private router: Router) {
    this.inicializarMapa();
  }

  inicializarMapa() {
    const mapa: Butaca[] = [];
    const filas = 6;
    const asientosPorFila = 10;

    for (let f = 1; f <= filas; f++) {
      for (let a = 1; a <= asientosPorFila; a++) {
        mapa.push({
          id: `F${f}-A${a}`,
          fila: f,
          asiento: a,
          estado: Math.random() < 0.15 ? 'ocupada' : 'libre' // 15% ocupadas al azar
        });
      }
    }
    this.butacas.set(mapa);
  }

  ngAfterViewInit() {
    this.panzoomInstance = Panzoom(this.lienzo.nativeElement, {
      maxScale: 3,
      minScale: 1,
      contain: 'outside',
      cursor: 'grab'
    });

    this.contenedor.nativeElement.addEventListener('wheel', this.panzoomInstance.zoomWithWheel);
  }

  seleccionarButaca(butaca: Butaca) {
    if (butaca.estado === 'ocupada') return;

    // Actualización reactiva del Signal
    this.butacas.update(actuales =>
      actuales.map(b => b.id === butaca.id
        ? { ...b, estado: b.estado === 'libre' ? 'seleccionada' : 'libre' }
        : b
      )
    );
  }

  continuar() {
    const seleccion = this.butacas().filter(b => b.estado === 'seleccionada');
    if (seleccion.length === 0) {
      alert('Por favor, selecciona al menos una butaca.');
      return;
    }

    sessionStorage.setItem('butacas_seleccionadas', seleccion.map(b => b.id).join(', '));
    sessionStorage.setItem('total_butacas', seleccion.length.toString())
    this.router.navigate(['/entradas']);
  }

  // Controles de Zoom
  zoomIn() { this.panzoomInstance.zoomIn(); }
  zoomOut() { this.panzoomInstance.zoomOut(); }
  resetZoom() { this.panzoomInstance.reset(); }
  volverAtras() { this.location.back(); }

  ngOnDestroy() {
    if (this.contenedor) {
      this.contenedor.nativeElement.removeEventListener('wheel', this.panzoomInstance.zoomWithWheel);
    }
  }
}
