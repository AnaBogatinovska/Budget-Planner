import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const token: string = this.authService.token;

    if (
      state.url === '/' ||
      state.url.includes('auth/login') ||
      state.url.includes('auth/register')
    ) {
      if (token) {
        return this.router.createUrlTree([
          '/plan/month',
          new Date().getFullYear(),
          new Date().getMonth() + 1,
        ]);
      } else {
        return true;
      }
    }

    if (state.url === '/auth') {
      return this.router.createUrlTree(['/']);
    }
    if (state.url === '/plan') {
      return this.router.createUrlTree([
        '/plan/month',
        new Date().getFullYear(),
        new Date().getMonth() + 1,
      ]);
    }

    if (state.url.includes('plan')) {
      if (!token) {
        return this.router.createUrlTree(['/auth/login']);
      } else {
        return true;
      }
    }
  }
}
