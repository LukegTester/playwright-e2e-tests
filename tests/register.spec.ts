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
      // Arrange:
      const registerPage = new RegisterPage(page);
      const firstName = faker.person.firstName().replace(/[^A-Za-z]/g, '');
      const lastName = faker.person.lastName().replace(/[^A-Za-z]/g, '');
      const email = faker.internet.email({
        firstName: firstName,
        lastName: lastName,
      });
      const password = faker.internet.password({ length: 8 });

      const expectedMessage = 'User created';

      // Act
      await page.goto(registerPage.url);
      await registerPage.register(firstName, lastName, email, password);

      // Assert 1
      await expect.soft(registerPage.alertPopUp).toHaveText(expectedMessage);

      const loginPage = new LoginPage(page);
      await loginPage.waitForPageToLoadUrl();
      const titleLogin = await loginPage.title();
      expect(titleLogin).toContain('Login');

      // Assert 2
      await loginPage.login(email, password);

      const welcomePage = new WelcomePage(page);
      const titleWelcome = await welcomePage.title();

      expect(titleWelcome).toContain('Welcome');
    },
  );
});
