export interface RegisterUserModel {
  userFirstName: string;
  userLastName: string;
  userEmail: string;
  userPassword: string;
}

export interface LoginUserModel {
  userEmail: string;
  userPassword: string;
}
