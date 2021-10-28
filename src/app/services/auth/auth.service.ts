import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { Login } from 'src/app/store/auth/auth.actions';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private store: Store<AppState>) {}

  // store
  public loginAfterRegister(email: string, password: string): void {
    this.store.dispatch(new Login({ email, password }));
  }

  get token(): string {
    return localStorage.getItem('token');
  }

  public getUserData(): null | { name: string } {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
}
