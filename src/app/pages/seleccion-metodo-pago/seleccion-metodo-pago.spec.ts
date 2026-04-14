import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionMetodoPago } from './seleccion-metodo-pago';

describe('SeleccionMetodoPago', () => {
  let component: SeleccionMetodoPago;
  let fixture: ComponentFixture<SeleccionMetodoPago>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeleccionMetodoPago],
    }).compileComponents();

    fixture = TestBed.createComponent(SeleccionMetodoPago);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
