import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarraPasos } from './barra-pasos';

describe('BarraPasos', () => {
  let component: BarraPasos;
  let fixture: ComponentFixture<BarraPasos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarraPasos],
    }).compileComponents();

    fixture = TestBed.createComponent(BarraPasos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
