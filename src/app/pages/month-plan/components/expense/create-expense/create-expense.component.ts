import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CategoryData } from 'src/app/models/category/category-data.interface';
import { ExpenseDialogData } from 'src/app/models/expense/expense-dialog-data.interface';
import { ExpenseFormData } from 'src/app/models/expense/expense-form-data.interface';
import { AppState } from 'src/app/store/app.reducer';
import {
  AddExpense,
  UpdateExpense,
} from '../../../../../store/month-plan/month-plan.actions';
import { CreateCategoryComponent } from '../../category/create-category/create-category.component';
import { UserCategorySettingsComponent } from '../../category/user-category-settings/user-category-settings.component';
import * as fromMonthActions from '../../../../../store/month-plan/month-plan.actions';

@Component({
  selector: 'app-create-expense',
  templateUrl: './create-expense.component.html',
  styleUrls: ['./create-expense.component.scss'],
})
export class CreateExpenseComponent implements OnInit {
  public categories$: Observable<CategoryData[]>;
  public userCategories$: Observable<CategoryData[]>;
  public minDate: Date;
  public maxDate: Date;
  public selectedDate: Date;
  public expenseForm: FormGroup;
  public currentBalance: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ExpenseDialogData,
    private dialog: MatDialog,
    private matDialogRef: MatDialogRef<CreateExpenseComponent>,
    private actions$: Actions,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    if (this.data.expense) {
      this.selectedDate = new Date(
        this.data.year,
        this.data.month - 1,
        this.data.expense.day
      );
    } else {
      const year = this.data.year;
      const month = this.data.month;
      const days = new Date(year, month, 0).getDate();
      this.selectedDate =
        year === new Date().getFullYear() && month === new Date().getMonth() + 1
          ? new Date()
          : new Date(year, month - 1, days);
    }

    this.buildForm();
    this.minMaxDateRange();
    this.categorySelector();

    this.actions$.pipe(ofType(fromMonthActions.ADD_EXPENSE, fromMonthActions.UPDATE_EXPENSE)).subscribe(() => {
      this.matDialogRef.close();
    });
  }

  public buildForm(): void {
    this.expenseForm = new FormGroup({
      name: new FormControl(
        (this.data.expense && this.data.expense.name) || null,
        [Validators.required]
      ),
      day: new FormControl(
        new Date(this.selectedDate) || null,
        Validators.required
      ),
      category: new FormControl(
        (this.data.expense && this.data.expense.categoryId) || '',
        Validators.required
      ),
      amount: new FormControl(
        (this.data.expense && this.data.expense.amount) || 1,
        Validators.required
      ),
    });
  }

  private categorySelector(): void {
    this.categories$ = this.store
      .select('category')
      .pipe(map((categoryState) => categoryState.categories));

    this.userCategories$ = this.store
      .select('category')
      .pipe(map((categoryState) => categoryState.userCategories));
  }

  private minMaxDateRange(): void {
    const daysInMonth = new Date(
      this.selectedDate.getFullYear(),
      this.selectedDate.getMonth(),
      0
    ).getDate();

    this.minDate = new Date(
      this.selectedDate.getFullYear(),
      this.selectedDate.getMonth(),
      1
    );
    this.maxDate = new Date(
      this.selectedDate.getFullYear(),
      this.selectedDate.getMonth() + 1,
      daysInMonth
    );
  }

  public openCreateCategoryDialog(id: number): void {
    this.dialog.open(CreateCategoryComponent, {
      data: {
        id,
      },
      disableClose: true,
    });
  }

  public openUserCategoriesSettingsDialog(): void {
    this.dialog.open(UserCategorySettingsComponent, {
      disableClose: true,
    });
  }

  public onAddExpense(): void {
    if (this.currentBalance - this.expenseForm.controls.amount.value < 0) {
      const cnf = confirm(
        'Your balance will be under 0, are you sure you want to proceed?'
      );
      if (cnf) {
        if (this.data.expense) {
          this.updateExpense();
        } else {
          this.submitExpense();
        }
      }
    } else {
      if (this.data.expense) {
        this.updateExpense();
      } else {
        this.submitExpense();
      }
    }
  }

  private submitExpense(): void {
    let day: number;
    if (this.expenseForm.get('day').value) {
      day = new Date(this.expenseForm.get('day').value).getDate();
    }

    const formData: ExpenseFormData = {
      day,
      name: this.expenseForm.get('name').value,
      categoryId: this.expenseForm.get('category').value,
      amount: this.expenseForm.get('amount').value,
    };

    this.store.dispatch(
      new AddExpense({
        expenseData: formData,
        year: this.selectedDate.getFullYear(),
        month: this.selectedDate.getMonth() + 1,
      })
    );
  }

  private updateExpense(): void {
    let day: number;
    if (this.expenseForm.get('day').value) {
      day = new Date(this.expenseForm.get('day').value).getDate();
    }
    const formData: ExpenseFormData = {
      day,
      name: this.expenseForm.get('name').value,
      categoryId: this.expenseForm.get('category').value,
      amount: this.expenseForm.get('amount').value,
    };
    this.store.dispatch(
      new UpdateExpense({
        expenseData: formData,
        id: this.data.expense.id,
        year: new Date(this.selectedDate).getFullYear(),
        month: new Date(this.selectedDate).getMonth() + 1,
      })
    );
  }
}
