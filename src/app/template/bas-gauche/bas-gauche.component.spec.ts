import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasGaucheComponent } from './bas-gauche.component';

describe('BasGaucheComponent', () => {
  let component: BasGaucheComponent;
  let fixture: ComponentFixture<BasGaucheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasGaucheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasGaucheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
