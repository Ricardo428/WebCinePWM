import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EleccionPreferencias } from './eleccion-preferencias';

describe('EleccionPreferencias', () => {
  let component: EleccionPreferencias;
  let fixture: ComponentFixture<EleccionPreferencias>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EleccionPreferencias]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EleccionPreferencias);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
