import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnteteMoisComponent } from './entete-mois.component';

describe('EnteteMoisComponent', () => {
  let component: EnteteMoisComponent;
  let fixture: ComponentFixture<EnteteMoisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnteteMoisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnteteMoisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
