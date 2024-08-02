import { STORAGE_STATE } from '@_pw-config';
import { LoginPage } from '@_src/pages/login.page';
import { WelcomePage } from '@_src/pages/welcome.page';
import { testUser1 } from '@_src/test-data/user.data';
import { expect, test as setup } from '@playwright/test';

setup('login and save session', { tag: '@GAD-R02-01' }, async ({ page }) => {
  // Arrange
  const expectedWelcomeTitle = 'Welcome';
  const loginPage = new LoginPage(page);
  const welcomePage = new WelcomePage(page);

  // Act
  await loginPage.goto();
  await loginPage.login(testUser1);

  const title = await welcomePage.getTitle();

  // Assert
  expect(title).toContain(expectedWelcomeTitle);
  await page.context().storageState({ path: STORAGE_STATE });
});
