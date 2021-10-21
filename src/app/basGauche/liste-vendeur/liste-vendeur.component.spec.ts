import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeVendeurComponent } from './liste-vendeur.component';

describe('ListeVendeurComponent', () => {
  let component: ListeVendeurComponent;
  let fixture: ComponentFixture<ListeVendeurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeVendeurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeVendeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
