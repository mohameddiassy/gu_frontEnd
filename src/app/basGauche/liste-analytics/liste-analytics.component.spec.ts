import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeAnalyticsComponent } from './liste-analytics.component';

describe('ListeAnalyticsComponent', () => {
  let component: ListeAnalyticsComponent;
  let fixture: ComponentFixture<ListeAnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeAnalyticsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
