import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { DeleteExpenseDialogData } from 'src/app/models/expense/delete-expense-dialog-data.interface';
import { Utility } from 'src/app/services/utilities/utilities';
import { AppState } from 'src/app/store/app.reducer';
import { DeleteExpense } from '../../../../../store/month-plan/month-plan.actions';
import * as fromMonthActions from '../../../../../store/month-plan/month-plan.actions';

@Component({
  selector: 'app-delete-expense',
  templateUrl: './delete-expense.component.html',
  styleUrls: ['./delete-expense.component.scss'],
})
export class DeleteExpenseComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DeleteExpenseDialogData,
    private matDialogRef: MatDialogRef<DeleteExpenseComponent>,
    private actions$: Actions,
    public utilities: Utility,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.actions$
      .pipe(ofType(fromMonthActions.DELETE_EXPENSE))
      .subscribe(() => {
        this.matDialogRef.close();
      });
  }

  public onDeleteExpense(): void {
    this.store.dispatch(
      new DeleteExpense({
        id: this.data.expense.id,
        year: this.data.year,
        month: this.data.month,
      })
    );
  }
}
