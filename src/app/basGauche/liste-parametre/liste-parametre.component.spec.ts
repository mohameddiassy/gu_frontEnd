import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeParametreComponent } from './liste-parametre.component';

describe('ListeParametreComponent', () => {
  let component: ListeParametreComponent;
  let fixture: ComponentFixture<ListeParametreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeParametreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeParametreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
