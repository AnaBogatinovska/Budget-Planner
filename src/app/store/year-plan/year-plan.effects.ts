import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { YearDataResponse } from 'src/app/models/year/year-data-response.interface';
import { NotificationService } from 'src/app/notification.service';
import { environment } from 'src/environments/environment';
import * as fromYearActions from './year-plan.actions';

@Injectable()
export class YearPlanEffects {
  constructor(
    private http: HttpClient,
    private actions$: Actions,
    private notificationService: NotificationService
  ) {}

  public geYearData = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromYearActions.GET_YEAR_DATA),
      switchMap((getYearDataAction: fromYearActions.GetYearData) => {
        return this.http
          .get<YearDataResponse>(
            `${environment.API_URL}plan/${getYearDataAction.payload.year}`
          )
          .pipe(
            map((response) => {
              return new fromYearActions.GetYearDataSuccess({
                yearData: response,
                year: getYearDataAction.payload.year,
              });
            }),
            catchError((error) => {
              return this.handleError(error);
            })
          );
      })
    );
  });

  private handleError(error: HttpErrorResponse): Observable<any> {
    this.notificationService.pushNotification(error.error, 'info');
    return of(new fromYearActions.GetYearDataFail(error.error));
  }
}
