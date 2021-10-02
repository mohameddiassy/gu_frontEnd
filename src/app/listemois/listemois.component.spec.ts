import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListemoisComponent } from './listemois.component';

describe('ListemoisComponent', () => {
  let component: ListemoisComponent;
  let fixture: ComponentFixture<ListemoisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListemoisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListemoisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
