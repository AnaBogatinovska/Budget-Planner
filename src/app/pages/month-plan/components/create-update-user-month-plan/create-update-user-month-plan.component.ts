import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { UpdateMonthPlanDialogData } from 'src/app/models/month/update-month-plan-dialog-data.interface';
import { AppState } from 'src/app/store/app.reducer';
import * as fromMonthActions from '../../../../store/month-plan/month-plan.actions';

@Component({
  selector: 'app-create-update-user-month-plan',
  templateUrl: './create-update-user-month-plan.component.html',
  styleUrls: ['./create-update-user-month-plan.component.scss'],
})
export class CreateUpdateUserMonthPlanComponent implements OnInit {
  public controlData = new FormControl(
    this.data.mode === 'income' ? this.data.income : this.data.budget
  );

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: UpdateMonthPlanDialogData,
    private matDialogRef: MatDialogRef<CreateUpdateUserMonthPlanComponent>,
    private actions$: Actions,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.actions$
      .pipe(ofType(fromMonthActions.CREATE_UPDATE_MONTH_DATA))
      .subscribe(() => {
        this.matDialogRef.close();
      });
  }

  public onSubmit(): void {
    this.store.dispatch(
      new fromMonthActions.CrateUpdateMonthData({
        year: this.data.year,
        month: this.data.month,
        data: {
          income:
            this.data.mode === 'income'
              ? this.controlData.value
              : this.data.income,
          budget:
            this.data.mode === 'budget'
              ? this.controlData.value
              : this.data.budget,
        },
      })
    );
  }
}
