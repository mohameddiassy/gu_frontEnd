import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnteteJourComponent } from './entete-jour.component';

describe('EnteteJourComponent', () => {
  let component: EnteteJourComponent;
  let fixture: ComponentFixture<EnteteJourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnteteJourComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnteteJourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
