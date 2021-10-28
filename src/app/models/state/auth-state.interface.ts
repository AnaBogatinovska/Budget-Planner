import { User } from '../user/user.interface';

export interface AuthState {
  user: User;
  authError: string;
}
