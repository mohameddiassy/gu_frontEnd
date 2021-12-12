import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutChequeComponent } from './ajout-cheque.component';

describe('AjoutChequeComponent', () => {
  let component: AjoutChequeComponent;
  let fixture: ComponentFixture<AjoutChequeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutChequeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutChequeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
