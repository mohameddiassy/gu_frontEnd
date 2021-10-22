import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterConsommationComponent } from './ajouter-consommation.component';

describe('AjouterConsommationComponent', () => {
  let component: AjouterConsommationComponent;
  let fixture: ComponentFixture<AjouterConsommationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterConsommationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterConsommationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
