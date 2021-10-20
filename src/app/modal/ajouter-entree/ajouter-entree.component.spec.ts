import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterEntreeComponent } from './ajouter-entree.component';

describe('AjouterEntreeComponent', () => {
  let component: AjouterEntreeComponent;
  let fixture: ComponentFixture<AjouterEntreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterEntreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterEntreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
