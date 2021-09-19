import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterSortieComponent } from './ajouter-sortie.component';

describe('AjouterSortieComponent', () => {
  let component: AjouterSortieComponent;
  let fixture: ComponentFixture<AjouterSortieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterSortieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterSortieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
