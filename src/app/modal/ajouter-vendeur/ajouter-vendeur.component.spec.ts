import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterVendeurComponent } from './ajouter-vendeur.component';

describe('AjouterVendeurComponent', () => {
  let component: AjouterVendeurComponent;
  let fixture: ComponentFixture<AjouterVendeurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterVendeurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterVendeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
