import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitSortantComponent } from './produit-sortant.component';

describe('ProduitSortantComponent', () => {
  let component: ProduitSortantComponent;
  let fixture: ComponentFixture<ProduitSortantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProduitSortantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProduitSortantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
