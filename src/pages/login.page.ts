import { LoginUserModel } from '@_src/models/user.model';
import { BasePage } from '@_src/pages/base.page';
import { WelcomePage } from '@_src/pages/welcome.page';
import { Page } from '@playwright/test';

export class LoginPage extends BasePage {
  url = '/login/';
  loginError = this.page.getByTestId('login-error');
  constructor(page: Page) {
    super(page);
  }

  async login(loginUserData: LoginUserModel): Promise<WelcomePage> {
    await this.page.getByPlaceholder('Enter User Email').fill(loginUserData.userEmail);
    await this.page.getByPlaceholder('Enter Password').fill(loginUserData.userPassword);
    await this.page.getByRole('button', { name: 'LogIn' }).click();

    return new WelcomePage(this.page);
  }
}
