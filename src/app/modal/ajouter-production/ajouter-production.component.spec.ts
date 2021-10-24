import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterProductionComponent } from './ajouter-production.component';

describe('AjouterProductionComponent', () => {
  let component: AjouterProductionComponent;
  let fixture: ComponentFixture<AjouterProductionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterProductionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterProductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
