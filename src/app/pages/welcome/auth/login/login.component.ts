import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { Login } from '../../../../store/auth/auth.actions';
import { AuthErrorStateMatcher } from 'src/app/services/error-state-matcher/auth-error-state-matcher';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public emailFormControl: FormControl = new FormControl(null, [
    Validators.required,
    Validators.email,
  ]);
  public passwordFormControl: FormControl = new FormControl(null, [
    Validators.required,
    this.isValid.bind(this),
  ]);
  public passwordInvalid: boolean;
  public matcher: ErrorStateMatcher = new AuthErrorStateMatcher();
  public spinner: boolean;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.spinner = false;
    this.passwordInvalid = false;
  }

  public onSubmitLogin(): void {
    this.spinner = true;

    this.store.dispatch(
      new Login({
        email: this.emailFormControl.value,
        password: this.passwordFormControl.value,
      })
    );
    this.spinner = false;
  }

  public isEmailValid(): boolean {
    return !!(
      this.emailFormControl.hasError('email') &&
      !this.emailFormControl.hasError('required')
    );
  }

  public isEmailRequired(): boolean {
    return !!this.emailFormControl.hasError('required');
  }

  public isPasswordValid(): boolean {
    return this.passwordFormControl.getError('invalid');
  }
  public isPasswordTouced(): boolean {
    return !this.passwordFormControl.value;
  }

  public isPasswordRequired(): boolean {
    return (
      this.passwordFormControl.hasError('required') &&
      this.passwordFormControl.touched
    );
  }

  public isValid(): { [k: string]: boolean } {
    if (this.passwordFormControl && this.passwordFormControl.touched) {
      this.passwordInvalid = false;
      return null;
    }
    if (this.passwordInvalid) {
      this.passwordInvalid = false;
      return {
        invalid: true,
      };
    } else {
      return null;
    }
  }
}
