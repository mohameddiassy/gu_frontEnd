import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasDroiteComponent } from './bas-droite.component';

describe('BasDroiteComponent', () => {
  let component: BasDroiteComponent;
  let fixture: ComponentFixture<BasDroiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasDroiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasDroiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
