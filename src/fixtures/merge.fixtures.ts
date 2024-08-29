import { articleTest } from '@_src/fixtures/article.fixture';
import { pageObjectTest } from '@_src/fixtures/page-object.fixtures';
import { mergeTests } from '@playwright/test';

export const test = mergeTests(pageObjectTest, articleTest);

export { expect } from '@playwright/test';
