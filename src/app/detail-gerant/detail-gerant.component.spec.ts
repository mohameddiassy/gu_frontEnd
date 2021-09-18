import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailGerantComponent } from './detail-gerant.component';

describe('DetailGerantComponent', () => {
  let component: DetailGerantComponent;
  let fixture: ComponentFixture<DetailGerantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailGerantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailGerantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
