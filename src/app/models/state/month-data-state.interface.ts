import { MonthlyData } from '../month/monthly-data.interface';

export interface MonthPlanState {
  monthlyData: MonthlyData;
  currentMonthlyData: MonthlyData;
  isCurrent: boolean;
}
