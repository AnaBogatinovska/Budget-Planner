import { Action } from '@ngrx/store';
import { ExpenseDataResponse } from 'src/app/models/expense/expense-data-response.interface';
import { ExpenseFormData } from 'src/app/models/expense/expense-form-data.interface';
import { Expense } from 'src/app/models/expense/expense.interface';
import { MonthlyDataResponse } from 'src/app/models/month/monthly-data-response.interface';
import { MonthlyData } from 'src/app/models/month/monthly-data.interface';

export const REQUEST_FAIL = '[Month] REQUEST_FAIL';

export const GET_MONTH_DATA = '[Month] GET_MONTH_DATA';
export const GET_MONTH_DATA_SUCCESS = '[Month] GET_MONTH_DATA_SUCCESS';

export const GET_CURRENT_MONTH_DATA = '[Month] GET_CURRENT_MONTH_DATA';
export const GET_CURRENT_MONTH_DATA_SUCCESS =
  '[Month] GET_CURRENT_MONTH_DATA_SUCCESS';

export const CREATE_UPDATE_MONTH_DATA = '[Month] CREATE_UPDATE_MONTH_DATA';
export const CREATE_UPDATE_MONTH_DATA_SUCCESS =
  '[Month] CREATE_UPDATE_MONTH_DATA_SUCCESS';

export const ADD_EXPENSE = '[Expense] ADD_EXPENSE';
export const ADD_EXPENSE_SUCCESS = '[Expense] ADD_EXPENSE_SUCCESS';

export const UPDATE_EXPENSE = '[Expense] UPDATE_EXPENSE';
export const UPDATE_EXPENSE_SUCCESS = '[Expense] UPDATE_EXPENSE_SUCCESS';

export const DELETE_EXPENSE = '[Expense] DELETE_EXPENSE';
export const DELETE_EXPENSE_SUCCESS = '[Expense] DELETE_EXPENSE_SUCCESS';

export class RequestFail implements Action {
  readonly type = REQUEST_FAIL;
  constructor(public payload: string) {}
}

export class GetCurrentMonthData implements Action {
  readonly type = GET_CURRENT_MONTH_DATA;
  constructor(public payload: { year: number; month: number }) {}
}

export class GetCurrentMonthDataSuccess implements Action {
  readonly type = GET_CURRENT_MONTH_DATA_SUCCESS;
  constructor(
    public payload: {
      currentMonthlyData: MonthlyData;
    }
  ) {}
}
export class GetMonthData implements Action {
  readonly type = GET_MONTH_DATA;
  constructor(public payload: { year: number; month: number }) {}
}

export class GetMonthDataSuccess implements Action {
  readonly type = GET_MONTH_DATA_SUCCESS;
  constructor(
    public payload: {
      monthlyData: MonthlyData;
      isCurrent: boolean;
    }
  ) {}
}

export class CrateUpdateMonthData implements Action {
  readonly type = CREATE_UPDATE_MONTH_DATA;
  constructor(
    public payload: {
      year: number;
      month: number;
      data: { income: number; budget: number };
    }
  ) {}
}

export class CrateUpdateMonthDataSuccess implements Action {
  readonly type = CREATE_UPDATE_MONTH_DATA_SUCCESS;
  constructor(
    public payload: { data: MonthlyDataResponse; isCurrent: boolean }
  ) {}
}

// Expenses
// -- Add
export class AddExpense implements Action {
  readonly type = ADD_EXPENSE;
  constructor(
    public payload: {
      expenseData: ExpenseFormData;
      year: number;
      month: number;
    }
  ) {}
}

export class AddExpenseSuccess implements Action {
  readonly type = ADD_EXPENSE_SUCCESS;
  constructor(
    public payload: {
      expense: ExpenseDataResponse;
      isCurrent: boolean;
    }
  ) {}
}

// -- Update
export class UpdateExpense implements Action {
  readonly type = UPDATE_EXPENSE;
  constructor(
    public payload: {
      expenseData: ExpenseFormData;
      id: number;
      year: number;
      month: number;
    }
  ) {}
}

export class UpdateExpenseSuccess implements Action {
  readonly type = UPDATE_EXPENSE_SUCCESS;
  constructor(
    public payload: {
      expense: Expense;
      isCurrent: boolean;
    }
  ) {}
}

// -- Delete
export class DeleteExpense implements Action {
  readonly type = DELETE_EXPENSE;
  constructor(
    public payload: {
      id: number;
      year: number;
      month: number;
    }
  ) {}
}

export class DeleteExpenseSuccess implements Action {
  readonly type = DELETE_EXPENSE_SUCCESS;
  constructor(
    public payload: {
      id: number;
      isCurrent: boolean;
    }
  ) {}
}

export type MonthActions =
  | RequestFail
  | GetCurrentMonthData
  | GetCurrentMonthDataSuccess
  | GetMonthData
  | GetMonthDataSuccess
  | CrateUpdateMonthData
  | CrateUpdateMonthDataSuccess
  // Expenses
  | AddExpense
  | AddExpenseSuccess
  | UpdateExpense
  | UpdateExpenseSuccess
  | DeleteExpense
  | DeleteExpenseSuccess;
