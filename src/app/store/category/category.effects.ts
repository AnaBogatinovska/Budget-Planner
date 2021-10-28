import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { CategoryDataResponse } from 'src/app/models/category/category-response-data.interface';
import { CreateCategoryResponseData } from 'src/app/models/category/create-category-response-data.interface';
import { NotificationService } from 'src/app/notification.service';
import { environment } from 'src/environments/environment';

import * as fromCategoryActions from './category.actions';

@Injectable()
export class CategoryEffects {
  constructor(
    private http: HttpClient,
    private actions$: Actions,
    private notificationService: NotificationService
  ) {}

  public getCategories = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromCategoryActions.GET_CATEGORIES),
      switchMap(() => {
        return this.http
          .get<CategoryDataResponse>(`${environment.API_URL}plan/category`)
          .pipe(
            map((response) => {
              return new fromCategoryActions.GetCategoriesSuccess(response);
            }),
            catchError((error) => {
              return this.handleError(error);
            })
          );
      })
    );
  });

  public createCategory = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromCategoryActions.CREATE_CATEGORY),
      switchMap((categoryAction: fromCategoryActions.CreateCategory) => {
        return this.http
          .post<CreateCategoryResponseData>(
            `${environment.API_URL}plan/category/create`,
            categoryAction.payload
          )
          .pipe(
            map((response) => {
              return new fromCategoryActions.CreateCategorySuccess(
                response.data.category
              );
            }),
            catchError((error) => {
              return this.handleError(error);
            })
          );
      })
    );
  });

  public updateCategory = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromCategoryActions.UPDATE_CATEGORY),
      switchMap((categoryAction: fromCategoryActions.UpdateCategory) => {
        return this.http
          .post<CreateCategoryResponseData>(
            `${environment.API_URL}plan/category/${categoryAction.payload.id}/edit`,
            categoryAction.payload
          )
          .pipe(
            map((response) => {
              return new fromCategoryActions.UpdateCategorySuccess({
                id: categoryAction.payload.id,
                ...response.data.category,
              });
            }),
            catchError((error) => {
              return this.handleError(error);
            })
          );
      })
    );
  });

  public deleteCategory = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromCategoryActions.DELETE_CATEGORY),
      switchMap((categoryAction: fromCategoryActions.DeleteCategory) => {
        return this.http
          .delete<CreateCategoryResponseData>(
            `${environment.API_URL}plan/category/${categoryAction.payload.id}/delete`
          )
          .pipe(
            map(() => {
              return new fromCategoryActions.DeleteCategorySuccess({
                id: categoryAction.payload.id,
              });
            }),
            catchError((error) => {
              return this.handleError(error);
            })
          );
      })
    );
  });

  // error
  private handleError(error: HttpErrorResponse): Observable<any> {
    this.notificationService.pushNotification(error.error, 'info');
    return of(new fromCategoryActions.GetCategoriesFail(error.error));
  }
}
