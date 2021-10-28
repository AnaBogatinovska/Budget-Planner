import { User } from '../user/user.interface';

export interface AuthLoginResponseData {
  success: boolean;
  message: string;
  data: User;
}
