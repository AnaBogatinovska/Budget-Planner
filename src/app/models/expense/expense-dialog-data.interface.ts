import { Expense } from './expense.interface';

export interface ExpenseDialogData {
  mode: string;
  expense: Expense;
  year: number;
  month: number;
}
