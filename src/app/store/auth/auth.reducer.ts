import { AuthState } from 'src/app/models/state/auth-state.interface';
import { User } from 'src/app/models/user/user.interface';
import * as authActions from './auth.actions';

const initialState: AuthState = {
  user: null,
  authError: null,
};

export function authReducer(
  state: AuthState = initialState,
  action: authActions.AuthActions
): AuthState {
  switch (action.type) {
    case authActions.AUTHENTICATE_SUCCESS:
      const user: User = {
        name: action.payload.data.name,
        token: action.payload.data.token,
      };
      return {
        ...state,
        user,
        authError: null,
      };

    case authActions.REGISTER:
      return {
        ...state,
        authError: null,
      };

    case authActions.LOGIN:
      return {
        ...state,
        authError: null,
      };

    case authActions.LOGOUT:
      return {
        ...state,
        user: null,
        authError: null,
      };

    case authActions.AUTHENTICATE_FAIL:
      return {
        ...state,
        user: null,
        authError: action.payload,
      };

    default:
      return state;
  }
}
