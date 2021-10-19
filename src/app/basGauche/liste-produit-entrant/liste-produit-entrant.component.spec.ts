import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeProduitEntrantComponent } from './liste-produit-entrant.component';

describe('ListeProduitEntrantComponent', () => {
  let component: ListeProduitEntrantComponent;
  let fixture: ComponentFixture<ListeProduitEntrantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeProduitEntrantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeProduitEntrantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
