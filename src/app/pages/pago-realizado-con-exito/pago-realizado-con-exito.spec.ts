import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoRealizadoConExito } from './pago-realizado-con-exito';

describe('PagoRealizadoConExito', () => {
  let component: PagoRealizadoConExito;
  let fixture: ComponentFixture<PagoRealizadoConExito>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagoRealizadoConExito]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagoRealizadoConExito);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
