import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { catchError } from 'rxjs/operators';
import { NotificationService } from 'src/app/notification.service';
import { AppState } from 'src/app/store/app.reducer';
import { Store } from '@ngrx/store';
import { Logout } from 'src/app/store/auth/auth.actions';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
    private store: Store<AppState>
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this.authService.token;

    const tokenizedReq = request.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });

    return next.handle(tokenizedReq).pipe(
      catchError((error) => {
        if (error.status === 401) {
          this.store.dispatch(new Logout());
        } else if (error.status === 400) {
          if (error.error.message) {
            this.notificationService.pushNotification(
              error.error.message,
              'negative'
            );
          }
        }
        return throwError(error);
      })
    );
  }
}
