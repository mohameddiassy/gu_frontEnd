import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasDroiteOptionnelComponent } from './bas-droite-optionnel.component';

describe('BasDroiteOptionnelComponent', () => {
  let component: BasDroiteOptionnelComponent;
  let fixture: ComponentFixture<BasDroiteOptionnelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasDroiteOptionnelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasDroiteOptionnelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
