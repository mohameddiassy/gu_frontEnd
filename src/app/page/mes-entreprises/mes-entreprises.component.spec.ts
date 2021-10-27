import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesEntreprisesComponent } from './mes-entreprises.component';

describe('MesEntreprisesComponent', () => {
  let component: MesEntreprisesComponent;
  let fixture: ComponentFixture<MesEntreprisesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MesEntreprisesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MesEntreprisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
