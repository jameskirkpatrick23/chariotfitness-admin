import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutineFormComponent } from './routine-form.component';

describe('RoutineFormComponent', () => {
  let component: RoutineFormComponent;
  let fixture: ComponentFixture<RoutineFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoutineFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutineFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
