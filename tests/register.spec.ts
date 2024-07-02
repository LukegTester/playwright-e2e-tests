import { randomUserData } from '../src/factories/user.factory';
import { LoginPage } from '../src/pages/login.page';
import { RegisterPage } from '../src/pages/register.page';
import { WelcomePage } from '../src/pages/welcome.page';
import { expect, test } from '@playwright/test';

test.describe('Verify register', () => {
  test(
    'Verify register with correct data',
    { tag: ['@GAD-R03-01', '@GAD-R03-02', '@GAD-R03-03'] },
    async ({ page }) => {
      // Arrange
      const registerUserData = randomUserData();
      const registerPage = new RegisterPage(page);

      // Act
      await page.goto(registerPage.url);
      await registerPage.register(registerUserData);

      const expectedMessage = 'User created';

      // Assert 1
      await expect.soft(registerPage.alertPopUp).toHaveText(expectedMessage);

      const loginPage = new LoginPage(page);
      await loginPage.waitForPageToLoadUrl();
      const titleLogin = await loginPage.title();
      expect(titleLogin).toContain('Login');

      // Assert 2
      await loginPage.login({
        userEmail: registerUserData.userEmail,
        userPassword: registerUserData.userPassword,
      });

      const welcomePage = new WelcomePage(page);
      const titleWelcome = await welcomePage.title();

      expect(titleWelcome).toContain('Welcome');
    },
  );
  test(
    'Verify not register with incorrect data - not valid email',
    { tag: '@GAD-R03-04' },
    async ({ page }) => {
      // Arrange
      const registerUserData = randomUserData();
      registerUserData.userEmail = '#$%1';

      const expectedErrorText = 'Please provide a valid email address';
      const registerPage = new RegisterPage(page);

      // Act
      await page.goto(registerPage.url);
      await registerPage.register(registerUserData);

      // Assert
      await expect(registerPage.emailErrorText).toHaveText(expectedErrorText);
    },
  );
  test(
    'Verify not register with incorrect data - email not provided',
    { tag: '@GAD-R03-04' },
    async ({ page }) => {
      // Arrange
      const registerUserData = randomUserData();
      const registerPage = new RegisterPage(page);
      const expectedErrorText = 'This field is required';

      // Act
      await page.goto(registerPage.url);
      await registerPage.userFirstNameInput.fill(
        registerUserData.userFirstName,
      );
      await registerPage.userLastNameInput.fill(registerUserData.userLastName);
      await registerPage.userPasswordInput.fill(registerUserData.userPassword);
      await registerPage.registerButton.click();

      // Assert
      await expect(registerPage.emailErrorText).toHaveText(expectedErrorText);
    },
  );
});
