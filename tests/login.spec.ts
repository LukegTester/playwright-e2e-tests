import { LoginPage } from '../src/pages/login.page';
import { WelcomePage } from '../src/pages/welcome.page';
import { testUser1 } from '../src/test-data/user.data';
import { expect, test } from '@playwright/test';

test(
  'Verify login with correct credentials',
  { tag: '@GAD-R02-01' },
  async ({ page }) => {
    // Arrange
    const loginPage = new LoginPage(page);
    const userEmail = testUser1.userEmail;
    const userPassword = testUser1.userPassword;

    // Act
    await loginPage.goto();
    await loginPage.login(userEmail, userPassword);

    const welcomePage = new WelcomePage(page);
    const title = await welcomePage.title();

    // Assert
    expect(title).toContain('Welcome');
  },
);
