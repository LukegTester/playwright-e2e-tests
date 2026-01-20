import { expect, test } from '@_src/ui/fixtures/merge.fixtures';
import { LoginUserModel } from '@_src/ui/models/user.model';
import { testUser1 } from '@_src/ui/test-data/user.data';

test.describe('Verify login', () => {
  test('Verify login with correct credentials', { tag: ['@sanity', '@GAD-R02-01'] }, async ({ loginPage }) => {
    // Arrange
    const expectedWelcomeTitle = 'Welcome';

    // Act
    const welcomePage = await loginPage.login(testUser1);
    const welcomeTitle = await welcomePage.getTitle();

    // Assert
    expect(welcomeTitle).toContain(expectedWelcomeTitle);
  });
  test(
    'Reject login with incorrect credentials - password',
    { tag: ['@sanity', '@GAD-R02-01'] },
    async ({ loginPage }) => {
      // Arrange
      const expectedLoginTitle = 'Login';

      const loginUserData: LoginUserModel = {
        userEmail: testUser1.userEmail,
        userPassword: 'incorrectPassword',
      };

      // Act
      await loginPage.login(loginUserData);

      // Assert
      const loginError = loginPage.loginError;
      await expect.soft(loginError).toHaveText('Invalid username or password');

      const title = await loginPage.getTitle();
      expect.soft(title).toContain(expectedLoginTitle);
    },
  );
});
