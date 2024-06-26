import { LoginUser } from '../models/user.model';
import { BasePage } from './base.page';
import { Page } from '@playwright/test';

export class LoginPage extends BasePage {
  url = '/login/';
  loginError = this.page.getByTestId('login-error');
  constructor(page: Page) {
    super(page);
  }

  async login(userEmail: string, userPassword: string): Promise<void> {
    await this.page.getByPlaceholder('Enter User Email').fill(userEmail);
    await this.page.getByPlaceholder('Enter Password').fill(userPassword);
    await this.page.getByRole('button', { name: 'LogIn' }).click();
  }

  async loginNew(loginUserData: LoginUser): Promise<void> {
    await this.page
      .getByPlaceholder('Enter User Email')
      .fill(loginUserData.userEmail);
    await this.page
      .getByPlaceholder('Enter Password')
      .fill(loginUserData.userPassword);
    await this.page.getByRole('button', { name: 'LogIn' }).click();
  }
}
