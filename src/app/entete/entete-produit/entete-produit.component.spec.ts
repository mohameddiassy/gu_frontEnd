import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnteteProduitComponent } from './entete-produit.component';

describe('EnteteProduitComponent', () => {
  let component: EnteteProduitComponent;
  let fixture: ComponentFixture<EnteteProduitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnteteProduitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnteteProduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
