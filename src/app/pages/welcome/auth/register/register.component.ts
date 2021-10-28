import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Action, Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { Register } from '../../../../store/auth/auth.actions';
import { AuthErrorStateMatcher } from 'src/app/services/error-state-matcher/auth-error-state-matcher';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public formRegister: FormGroup;
  public matcher: ErrorStateMatcher = new AuthErrorStateMatcher();

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.formRegister = this.createFormBuilder();
  }

  private matchPassword(control: FormControl): { [s: string]: boolean } {
    if (this.formRegister && this.formRegister.value.password) {
      if (this.formRegister.value.password !== control.value) {
        return { matched: true };
      }
    }
    return null;
  }

  public onSubmitRegister(): void {
    if (this.formRegister.valid) {
      this.store.dispatch(new Register(this.formRegister.value));
    }
  }

  private createFormBuilder(): FormGroup {
    return this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*\d)(?=.*[#?!@$%^&*-])(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])/
          ),
        ],
      ],
      confirmPassword: [
        null,
        [Validators.required, this.matchPassword.bind(this)],
      ],
    });
  }

  public isNameRequired(): boolean {
    return !!this.formRegister.get('name').hasError('required');
  }

  public isEmailValid(): boolean {
    return !!(
      this.formRegister.get('email').hasError('email') &&
      !this.formRegister.get('email').hasError('required')
    );
  }

  public isEmailRequired(): boolean {
    return !!this.formRegister.get('email').hasError('required');
  }

  public isPasswordRequired(): boolean {
    return !!this.formRegister.get('password').hasError('required');
  }

  public isPasswordValid(): boolean {
    return !!(
      this.formRegister.get('password').hasError('pattern') &&
      this.formRegister.get('password').errors.pattern.requiredPattern ===
        '/^(?=.*\\d)(?=.*[#?!@$%^&*-])(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])/'
    );
  }

  public isPasswordShort(): boolean {
    return !!(
      this.formRegister.get('password').hasError('minlength') &&
      !this.formRegister.get('password').hasError('pattern')
    );
  }

  public isPasswordMatched(): boolean {
    if (
      !this.formRegister.get('confirmPassword').hasError('matched') &&
      !this.formRegister.get('confirmPassword').hasError('required')
    ) {
      return false;
    } else {
      return true;
    }
  }

  public isPasswordConfrimRequired(): boolean {
    return !!this.formRegister.get('confirmPassword').hasError('required');
  }
}
