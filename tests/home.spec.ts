import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test('has title and no a18n issues', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Next.js Template/);

  const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
  expect(accessibilityScanResults.violations).toEqual([]);
});
