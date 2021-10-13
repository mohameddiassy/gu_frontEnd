import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterGerantComponent } from './ajouter-gerant.component';

describe('AjouterGerantComponent', () => {
  let component: AjouterGerantComponent;
  let fixture: ComponentFixture<AjouterGerantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterGerantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterGerantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
