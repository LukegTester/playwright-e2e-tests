import { LoginPage } from '../src/pages/login.page';
import { WelcomePage } from '../src/pages/welcome.page';
import { expect, test } from '@playwright/test';

test(
  'Verify login with correct credentials',
  { tag: '@GAD-R02-01' },
  async ({ page }) => {
    // Arrange
    const loginPage = new LoginPage(page);
    const userEmail = 'Moses.Armstrong@Feest.ca';
    const userPassword = 'test1';

    // Act
    await loginPage.goto();
    await loginPage.login(userEmail, userPassword);

    const welcomePage = new WelcomePage(page);
    const title = await welcomePage.title();

    // Assert
    expect(title).toContain('Welcome');
  },
);