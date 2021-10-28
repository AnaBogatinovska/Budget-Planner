import { Expense } from './expense.interface';

export interface DeleteExpenseDialogData {
  expense: Expense;
  year: number;
  month: number;
}
