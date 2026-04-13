import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoFilm } from './info-film';

describe('InfoFilm', () => {
  let component: InfoFilm;
  let fixture: ComponentFixture<InfoFilm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoFilm],
    }).compileComponents();

    fixture = TestBed.createComponent(InfoFilm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
