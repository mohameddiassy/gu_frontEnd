import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeEntreeComponent } from './liste-entree.component';

describe('ListeEntreeComponent', () => {
  let component: ListeEntreeComponent;
  let fixture: ComponentFixture<ListeEntreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeEntreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeEntreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
