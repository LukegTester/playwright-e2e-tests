import { expect, test } from '@_src/ui/fixtures/merge.fixtures';

test('Failing Sanity Test', { tag: ['@sanity'] }, async ({ homePage }) => {
  await homePage.navigateToHomePageUser();
  expect(2).toEqual(3);
});

test('Failing API Test', { tag: ['@api'] }, async ({ homePage }) => {
  await homePage.navigateToHomePageUser();
  expect(2).toEqual(3);
});

test('Failing Regression Test', { tag: ['@regression'] }, async ({ homePage }) => {
  await homePage.navigateToHomePageUser();
  expect(2).toEqual(3);
});
