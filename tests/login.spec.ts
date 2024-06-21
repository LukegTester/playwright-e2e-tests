import { LoginPage } from '../src/pages/login.page';
import { WelcomePage } from '../src/pages/welcome.page';
import { testUser1 } from '../src/test-data/user.data';
import { expect, test } from '@playwright/test';

test.describe('Verify login', () => {
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
  test(
    'Reject login with incorrect credentials - password',
    { tag: '@GAD-R02-01' },
    async ({ page }) => {
      // Arrange
      const loginPage = new LoginPage(page);
      const userEmail = testUser1.userEmail;
      const userPassword = 'incorrectPassword';

      // Act
      await loginPage.goto();
      await loginPage.login(userEmail, userPassword);

      // Assert
      const loginError = loginPage.loginError;
      await expect.soft(loginError).toHaveText('Invalid username or password');

      const title = await loginPage.title();
      expect.soft(title).toContain('Login');
    },
  );
});
