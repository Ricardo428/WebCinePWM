import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenRegistrado } from './resumen-registrado';

describe('ResumenRegistrado', () => {
  let component: ResumenRegistrado;
  let fixture: ComponentFixture<ResumenRegistrado>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumenRegistrado]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumenRegistrado);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
