import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateUserMonthPlanComponent } from './create-update-user-month-plan.component';

describe('CreateUpdateUserMonthPlanComponent', () => {
  let component: CreateUpdateUserMonthPlanComponent;
  let fixture: ComponentFixture<CreateUpdateUserMonthPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUpdateUserMonthPlanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUpdateUserMonthPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
