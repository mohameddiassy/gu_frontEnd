import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeConsommationComponent } from './liste-consommation.component';

describe('ListeConsommationComponent', () => {
  let component: ListeConsommationComponent;
  let fixture: ComponentFixture<ListeConsommationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeConsommationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeConsommationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
