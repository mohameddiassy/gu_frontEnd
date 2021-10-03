import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnteteAnalyticsComponent } from './entete-analytics.component';

describe('EnteteAnalyticsComponent', () => {
  let component: EnteteAnalyticsComponent;
  let fixture: ComponentFixture<EnteteAnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnteteAnalyticsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnteteAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
