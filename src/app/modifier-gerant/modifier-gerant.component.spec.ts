import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierGerantComponent } from './modifier-gerant.component';

describe('ModifierGerantComponent', () => {
  let component: ModifierGerantComponent;
  let fixture: ComponentFixture<ModifierGerantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifierGerantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierGerantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
