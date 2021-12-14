import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterDepenseComponent } from './ajouter-depense.component';

describe('AjouterDepenseComponent', () => {
  let component: AjouterDepenseComponent;
  let fixture: ComponentFixture<AjouterDepenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterDepenseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterDepenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
