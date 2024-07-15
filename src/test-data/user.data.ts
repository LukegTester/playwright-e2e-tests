import { USER_EMAIL, USER_PASSWORD } from '../env.config';
import { LoginUserModel } from '../models/user.model';

export const testUser1: LoginUserModel = {
  userEmail: USER_EMAIL,
  userPassword: USER_PASSWORD,
};
