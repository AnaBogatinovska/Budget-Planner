import { Expense } from '../expense/expense.interface';

export interface MonthlyData {
  income: number;
  budget: number;
  expenses: Expense[];
}
