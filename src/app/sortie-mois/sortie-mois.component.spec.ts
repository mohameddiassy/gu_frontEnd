import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortieMoisComponent } from './sortie-mois.component';

describe('SortieMoisComponent', () => {
  let component: SortieMoisComponent;
  let fixture: ComponentFixture<SortieMoisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SortieMoisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SortieMoisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
