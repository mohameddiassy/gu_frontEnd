import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeDashbordComponent } from './liste-dashbord.component';

describe('ListeDashbordComponent', () => {
  let component: ListeDashbordComponent;
  let fixture: ComponentFixture<ListeDashbordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeDashbordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeDashbordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
