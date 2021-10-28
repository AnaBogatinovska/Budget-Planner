import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.actions';

import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { AuthRegisterResponseData } from 'src/app/models/auth/auth-register-response-data.interface';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { NotificationService } from 'src/app/notification.service';
import { AuthLoginResponseData } from 'src/app/models/auth/auth-login-response-data.interface';

@Injectable()
export class AuthEffects {
  constructor(
    private http: HttpClient,
    private router: Router,
    private actions$: Actions,
    private notificationService: NotificationService
  ) {}

  // effect for register
  public authRegister = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.REGISTER),
      switchMap((registerAction: AuthActions.Register) => {
        return this.http
          .post<AuthRegisterResponseData>(`${environment.API_URL}auth/signup`, {
            name: registerAction.payload.name,
            email: registerAction.payload.email,
            password: registerAction.payload.password,
          })
          .pipe(
            map((responseData) => {
              const data = {
                success: responseData.success,
                message: responseData.message,
                data: {
                  name: registerAction.payload.name,
                },
              };

              return this.handleAuthentication(data);
            }),
            catchError((error) => {
              return this.handleError(error);
            })
          );
      })
    );
  });
  //  Effect for login
  public authLogin = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.LOGIN),
      switchMap((loginData: AuthActions.Login) => {
        return this.http
          .post<AuthLoginResponseData>(`${environment.API_URL}auth/login`, {
            email: loginData.payload.email,
            password: loginData.payload.password,
          })
          .pipe(
            map((responseData) => {
              const data = {
                success: responseData.success,
                message: responseData.message,
                data: {
                  name: responseData.data.name,
                  token: responseData.data.token,
                },
              };
              this.setLocalStorageAfterAuthenticationSuccess(responseData);
              this.navigateAfterAuthenticationSuccess();
              return this.handleAuthentication(data);
            }),
            catchError((error) => {
              return this.handleError(error);
            })
          );
      })
    );
  });

  // Effect for logout
  public logout = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.LOGOUT),
        tap(() => {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          this.router.navigate(['auth/login']);
          this.notificationService.pushNotification('Please log in', 'info');
        })
      );
    },
    { dispatch: false }
  );

  private setLocalStorageAfterAuthenticationSuccess(response): void {
    localStorage.setItem(
      'user',
      JSON.stringify({
        name: response.data.name,
      })
    );
    localStorage.setItem('token', response.data.token);
  }

  private navigateAfterAuthenticationSuccess(): void {
    this.router.navigate([
      'plan/month',
      new Date().getFullYear(),
      new Date().getMonth() + 1,
    ]);
  }

  private handleAuthentication(response): Action {
    this.setLocalStorageAfterAuthenticationSuccess(response);
    this.navigateAfterAuthenticationSuccess();

    this.notificationService.pushNotification(response.message, 'positive');
    return new AuthActions.AuthenticateSuccess({
      success: true,
      message: response.message,
      data: response.data,
    });
  }
  private handleError(error: HttpErrorResponse): Observable<any> {
    this.notificationService.pushNotification(error.error, 'info');
    return of(new AuthActions.AuthenticateFail(error.error));
  }
}
