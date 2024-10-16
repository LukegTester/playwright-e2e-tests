import { articleTest } from '@_src/ui/fixtures/article.fixture';
import { pageObjectTest } from '@_src/ui/fixtures/page-object.fixtures';
import { mergeTests } from '@playwright/test';

export const test = mergeTests(pageObjectTest, articleTest);

export { expect } from '@playwright/test';
