import { MonthPlanState as MonthPlanState } from 'src/app/models/state/month-data-state.interface';
import * as MonthActions from './month-plan.actions';

export const initialState: MonthPlanState = {
  monthlyData: null,
  currentMonthlyData: null,
  isCurrent: false,
};

export function monthPlanReducer(
  state: MonthPlanState = initialState,
  action: MonthActions.MonthActions
): MonthPlanState {
  switch (action.type) {
    // GET MONTH DATA
    case MonthActions.GET_CURRENT_MONTH_DATA_SUCCESS:
      return {
        ...state,
        currentMonthlyData: { ...action.payload.currentMonthlyData },
        isCurrent: true,
      };
    case MonthActions.GET_MONTH_DATA_SUCCESS:
      return {
        ...state,
        monthlyData: { ...action.payload.monthlyData },
        currentMonthlyData: action.payload.isCurrent
          ? { ...action.payload.monthlyData }
          : { ...state.currentMonthlyData },
        isCurrent: action.payload.isCurrent,
      };
    case MonthActions.REQUEST_FAIL:
      return {
        ...state,
        monthlyData: null,
      };

    // CREATE UPDATE MONTH DATA
    case MonthActions.CREATE_UPDATE_MONTH_DATA:
      return {
        ...state,
      };
    case MonthActions.CREATE_UPDATE_MONTH_DATA_SUCCESS:
      return {
        ...state,
        monthlyData: {
          ...state.monthlyData,
          income: action.payload.data.data.income,
          budget: action.payload.data.data.budget,
          expenses: [...state.monthlyData.expenses],
        },
        currentMonthlyData: action.payload.isCurrent
          ? {
              ...state.currentMonthlyData,
              income: action.payload.data.data.income,
              budget: action.payload.data.data.budget,
              expenses: [...state.currentMonthlyData.expenses],
            }
          : { ...state.currentMonthlyData },
        isCurrent: action.payload.isCurrent,
      };

    //  ADD EXPENSE
    case MonthActions.ADD_EXPENSE:
      return {
        ...state,
      };
    case MonthActions.ADD_EXPENSE_SUCCESS:
      return {
        ...state,
        monthlyData: {
          ...state.monthlyData,
          expenses: [
            ...state.monthlyData.expenses,
            action.payload.expense.data,
          ],
        },
        currentMonthlyData: action.payload.isCurrent
          ? {
              ...state.currentMonthlyData,
              expenses: [
                ...state.currentMonthlyData.expenses,
                action.payload.expense.data,
              ],
            }
          : { ...state.currentMonthlyData },
        isCurrent: action.payload.isCurrent,
      };

    // UPDATE EXPENSE
    case MonthActions.UPDATE_EXPENSE:
      return {
        ...state,
      };
    case MonthActions.UPDATE_EXPENSE_SUCCESS:
      const updatedExpense = action.payload.expense;
      const expensesList = [...state.monthlyData.expenses];
      const idx = expensesList.findIndex((e) => e.id === updatedExpense.id);
      expensesList[idx] = updatedExpense;
      return {
        ...state,
        monthlyData: {
          ...state.monthlyData,
          expenses: expensesList,
        },
        currentMonthlyData: {
          ...state.currentMonthlyData,
          expenses: action.payload.isCurrent
            ? expensesList
            : [...state.currentMonthlyData.expenses],
        },
        isCurrent: action.payload.isCurrent,
      };

    // DELETE EXPENSE
    case MonthActions.DELETE_EXPENSE:
      return {
        ...state,
      };
    case MonthActions.DELETE_EXPENSE_SUCCESS:
      return {
        ...state,
        monthlyData: {
          ...state.monthlyData,
          expenses: state.monthlyData.expenses.filter(
            (expense) => expense.id !== action.payload.id
          ),
        },
        currentMonthlyData: {
          ...state.currentMonthlyData,
          expenses: state.currentMonthlyData.expenses.filter(
            (expense) => expense.id !== action.payload.id
          ),
        },
        isCurrent: action.payload.isCurrent,
      };

    case MonthActions.REQUEST_FAIL:
      return {
        ...state,
        monthlyData: null,
        currentMonthlyData: null,
        isCurrent: false,
      };

    default:
      return state;
  }
}
