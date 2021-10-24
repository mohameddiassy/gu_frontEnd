import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeProductionComponent } from './liste-production.component';

describe('ListeProductionComponent', () => {
  let component: ListeProductionComponent;
  let fixture: ComponentFixture<ListeProductionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeProductionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeProductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
