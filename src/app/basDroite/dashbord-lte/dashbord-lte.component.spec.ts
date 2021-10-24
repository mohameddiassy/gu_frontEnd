import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbordLteComponent } from './dashbord-lte.component';

describe('DashbordLteComponent', () => {
  let component: DashbordLteComponent;
  let fixture: ComponentFixture<DashbordLteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashbordLteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashbordLteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
