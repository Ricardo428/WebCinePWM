import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoBizum } from './pago-bizum';

describe('PagoBizum', () => {
  let component: PagoBizum;
  let fixture: ComponentFixture<PagoBizum>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagoBizum],
    }).compileComponents();

    fixture = TestBed.createComponent(PagoBizum);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
