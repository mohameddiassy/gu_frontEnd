import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HautDroiteOptionnelComponent } from './haut-droite-optionnel.component';

describe('HautDroiteOptionnelComponent', () => {
  let component: HautDroiteOptionnelComponent;
  let fixture: ComponentFixture<HautDroiteOptionnelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HautDroiteOptionnelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HautDroiteOptionnelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
