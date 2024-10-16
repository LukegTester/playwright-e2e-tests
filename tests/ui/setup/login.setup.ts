import { STORAGE_STATE } from '@_pw-config';
import { expect, test as setup } from '@_src/ui/fixtures/merge.fixtures';
import { testUser1 } from '@_src/ui/test-data/user.data';

setup('login and save session', { tag: '@GAD-R02-01' }, async ({ loginPage, page }) => {
  // Arrange
  const expectedWelcomeTitle = 'Welcome';

  // Act
  const welcomePage = await loginPage.login(testUser1);

  const title = await welcomePage.getTitle();

  // Assert
  expect(title).toContain(expectedWelcomeTitle);
  await page.context().storageState({ path: STORAGE_STATE });
});
