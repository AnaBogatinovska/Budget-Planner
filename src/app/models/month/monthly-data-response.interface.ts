import { MonthlyData } from './monthly-data.interface';

export interface MonthlyDataResponse {
  success: boolean;
  message: string;
  data: MonthlyData;
}
