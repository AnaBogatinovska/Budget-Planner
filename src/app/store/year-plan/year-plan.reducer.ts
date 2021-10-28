import { YearDataState as YearPlanState } from 'src/app/models/state/year-data-state.interface';
import * as YearActions from './year-plan.actions';

const initialState: YearPlanState = {
  yearData: null,
  year: null,
};

export function yearPlanReducer(
  state: YearPlanState = initialState,
  action: YearActions.YearActions
): YearPlanState {
  switch (action.type) {
    case YearActions.GET_YEAR_DATA:
      return {
        ...state,
      };
    case YearActions.GET_YEAR_DATA_SUCCESS:
      return {
        ...state,
        yearData: { ...action.payload.yearData },
        year: action.payload.year,
      };
    case YearActions.GET_YEAR_DATA_FAIL:
      return {
        ...state,
        yearData: null,
      };
    default:
      return state;
  }
}
