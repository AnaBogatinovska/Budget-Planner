import { ActionReducerMap } from '@ngrx/store';
import { AuthState } from '../models/state/auth-state.interface';
import { MonthPlanState } from '../models/state/month-data-state.interface';
import * as fromAuth from '../store/auth/auth.reducer';
import * as fromMonth from '../store/month-plan/month-plan.reducer';
import * as fromYear from '../store/year-plan/year-plan.reducer';
import * as fromCategory from './category/category.reducer';
import { YearDataState } from '../models/state/year-data-state.interface';
import { CategoryState } from '../models/state/category-state.interface';

export interface AppState {
  auth: AuthState;
  month: MonthPlanState;
  year: YearDataState;
  category: CategoryState;
}

export const appReducer: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  month: fromMonth.monthPlanReducer,
  year: fromYear.yearPlanReducer,
  category: fromCategory.categoryReducer,
};
