import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HautDroiteComponent } from './haut-droite.component';

describe('HautDroiteComponent', () => {
  let component: HautDroiteComponent;
  let fixture: ComponentFixture<HautDroiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HautDroiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HautDroiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
