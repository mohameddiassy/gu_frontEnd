import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifieProduitComponent } from './modifie-produit.component';

describe('ModifieProduitComponent', () => {
  let component: ModifieProduitComponent;
  let fixture: ComponentFixture<ModifieProduitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifieProduitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifieProduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
