import { LoginUserModel } from '../src/models/user.model';
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
      const expectedWelcomeTitle = 'Welcome';

      // Act
      await loginPage.goto();
      await loginPage.login(testUser1);

      const welcomePage = new WelcomePage(page);
      const title = await welcomePage.getTitle();

      // Assert
      expect(title).toContain(expectedWelcomeTitle);
    },
  );
  test(
    'Reject login with incorrect credentials - password',
    { tag: '@GAD-R02-01' },
    async ({ page }) => {
      // Arrange
      const loginPage = new LoginPage(page);

      const loginUserData: LoginUserModel = {
        userEmail: testUser1.userEmail,
        userPassword: 'incorrectPassword',
      };
      const expectedLoginTitle = 'Login';

      // Act
      await loginPage.goto();
      await loginPage.login(loginUserData);

      // Assert
      const loginError = loginPage.loginError;
      await expect.soft(loginError).toHaveText('Invalid username or password');

      const title = await loginPage.getTitle();
      expect.soft(title).toContain(expectedLoginTitle);
    },
  );
});
