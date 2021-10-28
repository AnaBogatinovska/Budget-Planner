import { Action } from '@ngrx/store';

export const AUTHENTICATE_SUCCESS = '[Auth] AUTHENTICATE_SUCCESS';
export const AUTHENTICATE_FAIL = '[Auth] AUTHENTICATE_FAIL';
export const REGISTER = '[Auth] REGISTER';
export const LOGIN = '[Auth] LOGIN';
export const LOGOUT = '[Auth] LOGOUT';

export class Register implements Action {
  readonly type = REGISTER;
  constructor(
    public payload: {
      name: string;
      email: string;
      password: string;
    }
  ) {}
}

export class Login implements Action {
  readonly type = LOGIN;

  constructor(
    public payload: {
      email: string;
      password: string;
    }
  ) {}
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class AuthenticateSuccess implements Action {
  readonly type = AUTHENTICATE_SUCCESS;

  constructor(
    public payload: {
      success: boolean;
      message: string;
      data: any;
      error?: any;
    }
  ) {}
}

export class AuthenticateFail implements Action {
  readonly type = AUTHENTICATE_FAIL;

  constructor(public payload: string) {}
}

export type AuthActions =
  | AuthenticateSuccess
  | Register
  | Login
  | Logout
  | AuthenticateFail;
