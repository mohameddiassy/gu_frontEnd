import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HautGaucheComponent } from './haut-gauche.component';

describe('HautGaucheComponent', () => {
  let component: HautGaucheComponent;
  let fixture: ComponentFixture<HautGaucheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HautGaucheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HautGaucheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
