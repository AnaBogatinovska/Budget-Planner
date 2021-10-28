import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fromMonthActions from './month-plan.actions';

import { catchError, switchMap, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { NotificationService } from 'src/app/notification.service';
import { MonthlyData } from 'src/app/models/month/monthly-data.interface';
import { ExpenseDataResponse } from 'src/app/models/expense/expense-data-response.interface';
import { Utility } from 'src/app/services/utilities/utilities';

@Injectable()
export class MonthPlanEffects {
  constructor(
    private http: HttpClient,
    private actions$: Actions,
    private notificationService: NotificationService,
    private utilities: Utility
  ) {}

  // effect for getCURRENTmonthdata
  public getCurrentMonthData = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromMonthActions.GET_CURRENT_MONTH_DATA),
      switchMap((getMonthDataAction: fromMonthActions.GetCurrentMonthData) => {
        return this.http
          .get<MonthlyData>(
            `${environment.API_URL}plan/${getMonthDataAction.payload.year}/${getMonthDataAction.payload.month}`
          )
          .pipe(
            map((response) => {
              return new fromMonthActions.GetCurrentMonthDataSuccess({
                currentMonthlyData: response,
              });
            }),
            catchError((error) => {
              return this.handleError(error);
            })
          );
      })
    );
  });
  // effect for getmonthdata
  public getMonthData = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromMonthActions.GET_MONTH_DATA),
      switchMap((getMonthDataAction: fromMonthActions.GetMonthData) => {
        return this.http
          .get<MonthlyData>(
            `${environment.API_URL}plan/${getMonthDataAction.payload.year}/${getMonthDataAction.payload.month}`
          )
          .pipe(
            map((response) => {
              const y = getMonthDataAction.payload.year;
              const m = getMonthDataAction.payload.month;

              if (
                y === new Date().getFullYear() &&
                m === new Date().getMonth() + 1
              ) {
                return new fromMonthActions.GetMonthDataSuccess({
                  monthlyData: response,
                  isCurrent: true,
                });
              }
              return new fromMonthActions.GetMonthDataSuccess({
                monthlyData: response,
                isCurrent: false,
              });
            }),
            catchError((error) => {
              return this.handleError(error);
            })
          );
      })
    );
  });

  // effect for create_update_month_data
  public createUpdateMonthData = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromMonthActions.CREATE_UPDATE_MONTH_DATA),
      switchMap(
        (
          createUpdateMonthDataAction: fromMonthActions.CrateUpdateMonthData
        ) => {
          return this.http
            .post<any>(
              `${environment.API_URL}plan/${createUpdateMonthDataAction.payload.year}/${createUpdateMonthDataAction.payload.month}`,
              createUpdateMonthDataAction.payload.data
            )
            .pipe(
              map((responseData) => {
                const y = createUpdateMonthDataAction.payload.year;
                const m = createUpdateMonthDataAction.payload.month;

                this.handleNotification(responseData);
                return new fromMonthActions.CrateUpdateMonthDataSuccess({
                  data: responseData,
                  isCurrent: this.utilities.isCurrentMonth(y, m),
                });
              }),
              catchError((error) => {
                return this.handleError(error);
              })
            );
        }
      )
    );
  });

  // Expenses

  public addExpense = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromMonthActions.ADD_EXPENSE),
      switchMap((expenseAction: fromMonthActions.AddExpense) => {
        return this.http
          .post<ExpenseDataResponse>(
            `${environment.API_URL}plan/${expenseAction.payload.year}/${expenseAction.payload.month}/expense`,
            expenseAction.payload.expenseData
          )
          .pipe(
            map((response) => {
              const y = expenseAction.payload.year;
              const m = expenseAction.payload.month;
              this.handleNotification(response);
              return new fromMonthActions.AddExpenseSuccess({
                expense: response,
                isCurrent: this.utilities.isCurrentMonth(y, m),
              });
            }),
            catchError((error) => {
              return this.handleError(error);
            })
          );
      })
    );
  });
  public updateExpense = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromMonthActions.UPDATE_EXPENSE),
      switchMap((expenseAction: fromMonthActions.UpdateExpense) => {
        return this.http
          .put<ExpenseDataResponse>(
            `${environment.API_URL}plan/expense/${expenseAction.payload.id}/edit`,
            expenseAction.payload.expenseData
          )
          .pipe(
            map((response) => {
              this.handleNotification(response);
              return new fromMonthActions.UpdateExpenseSuccess({
                expense: response.data,
                isCurrent: this.utilities.isCurrentMonth(
                  expenseAction.payload.year,
                  expenseAction.payload.month
                ),
              });
            }),
            catchError((error) => {
              return this.handleError(error);
            })
          );
      })
    );
  });
  public deleteExpense = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromMonthActions.DELETE_EXPENSE),
      switchMap((expenseAction: fromMonthActions.DeleteExpense) => {
        return this.http
          .delete<ExpenseDataResponse>(
            `${environment.API_URL}plan/expense/${expenseAction.payload.id}`
          )
          .pipe(
            map((response) => {
              this.handleNotification(response);
              return new fromMonthActions.DeleteExpenseSuccess({
                id: response.data.expense,
                isCurrent: this.utilities.isCurrentMonth(
                  expenseAction.payload.year,
                  expenseAction.payload.month
                ),
              });
            }),
            catchError((error) => {
              return this.handleError(error);
            })
          );
      })
    );
  });

  // notification
  private handleNotification(response): void {
    this.notificationService.pushNotification(response.message, 'positive');
  }

  // error
  private handleError(error: HttpErrorResponse): Observable<any> {
    this.notificationService.pushNotification(error.error, 'info');
    return of(new fromMonthActions.RequestFail(error.error));
  }
}
