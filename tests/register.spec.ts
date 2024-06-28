import { RegisterUser } from '../src/models/user.model';
import { LoginPage } from '../src/pages/login.page';
import { RegisterPage } from '../src/pages/register.page';
import { WelcomePage } from '../src/pages/welcome.page';
import { faker } from '@faker-js/faker/locale/en';
import { expect, test } from '@playwright/test';

test.describe('Verify register', () => {
  test(
    'Verify register with correct data',
    { tag: ['@GAD-R03-01', '@GAD-R03-02', '@GAD-R03-03'] },
    async ({ page }) => {
      // Arrange
      const registerUserData: RegisterUser = {
        userFirstName: faker.person.firstName().replace(/[^A-Za-z]/g, ''),
        userLastName: faker.person.lastName().replace(/[^A-Za-z]/g, ''),
        userEmail: '',
        userPassword: faker.internet.password({ length: 8 }),
      };

      registerUserData.userEmail = faker.internet.email({
        firstName: registerUserData.userFirstName,
        lastName: registerUserData.userLastName,
      });

      const registerPage = new RegisterPage(page);

      // Act
      await page.goto(registerPage.url);
      await registerPage.register(registerUserData);

      // Assert 1
      const expectedMessage = 'User created';
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
});
