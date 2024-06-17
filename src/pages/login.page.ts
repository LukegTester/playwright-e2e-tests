import { BasePage } from './base.page';
import { Page } from '@playwright/test';

export class LoginPage extends BasePage {
  url = '/login';
  constructor(page: Page) {
    super(page);
  }

  async login(userEmail: string, userPassword: string): Promise<void> {
    await this.page.getByPlaceholder('Enter User Email').fill(userEmail);
    await this.page.getByPlaceholder('Enter Password').fill(userPassword);
    await this.page.getByRole('button', { name: 'LogIn' }).click();
  }
}
