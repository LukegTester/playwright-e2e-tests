import { LoginUserModel } from '../models/user.model';

export const testUser1: LoginUserModel = {
  userEmail: process.env.USER_EMAIL ?? '[NOT SET]',
  userPassword: process.env.USER_PASSWORD ?? '[NOT SET]',
};
