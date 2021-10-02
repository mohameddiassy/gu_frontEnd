import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListejoursComponent } from './listejours.component';

describe('ListejoursComponent', () => {
  let component: ListejoursComponent;
  let fixture: ComponentFixture<ListejoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListejoursComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListejoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
