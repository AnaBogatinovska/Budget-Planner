import { Action } from '@ngrx/store';
import { YearDataResponse } from 'src/app/models/year/year-data-response.interface';

export const GET_YEAR_DATA = '[Year] GET_YEAR_DATA';
export const GET_YEAR_DATA_SUCCESS = '[Year] GET_YEAR_DATA_SUCCESS';
export const GET_YEAR_DATA_FAIL = '[Year] GET_YEAR_DATA_FAIL';

export class GetYearData implements Action {
  readonly type = GET_YEAR_DATA;
  constructor(public payload: { year: number }) {}
}

export class GetYearDataSuccess implements Action {
  readonly type = GET_YEAR_DATA_SUCCESS;
  constructor(public payload: { yearData: YearDataResponse; year: number }) {}
}
export class GetYearDataFail implements Action {
  readonly type = GET_YEAR_DATA_FAIL;
  constructor(public payload: string) {}
}
export type YearActions = GetYearData | GetYearDataSuccess | GetYearDataFail;
