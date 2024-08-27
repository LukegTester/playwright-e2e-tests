import { pageObjectTest } from '@_src/fixtures/page-object.fixtures';
import { mergeTests } from '@playwright/test';

export const test = mergeTests(pageObjectTest);

export { expect } from '@playwright/test';
