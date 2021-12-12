import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutDetteComponent } from './ajout-dette.component';

describe('AjoutDetteComponent', () => {
  let component: AjoutDetteComponent;
  let fixture: ComponentFixture<AjoutDetteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutDetteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutDetteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
