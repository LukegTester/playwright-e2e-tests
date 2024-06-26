export interface RegisterUser {
  userFirstName: string;
  userLastName: string;
  userEmail: string;
  userPassword: string;
}

export interface LoginUser {
  userEmail: string;
  userPassword: string;
}
