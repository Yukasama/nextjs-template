import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test.describe('Homepage', () => {
  test('loads correctly with title and no accessibility issues', async ({
    page,
  }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Next.js Template/);

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('displays main content and components', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('h1').first()).toHaveText('Next.js Template');

    await expect(
      page.locator('button[aria-label="Toggle theme"]'),
    ).toBeVisible();

    await expect(page.locator('h1').nth(1)).toHaveText('Template Features');

    await expect(
      page.getByText('Built with enterprise-grade tools'),
    ).toBeVisible();

    await expect(
      page.locator('button').filter({ hasText: 'A+ Security Headers' }),
    ).toBeVisible();
    await expect(
      page.locator('button').filter({ hasText: 'Docker-Ready' }),
    ).toBeVisible();
    await expect(
      page.locator('button').filter({ hasText: 'Quality Assurance' }),
    ).toBeVisible();

    await expect(
      page.getByRole('link', { name: 'View Source Code' }),
    ).toBeVisible();
  });

  test('theme toggle functionality', async ({ page }) => {
    await page.goto('/');

    const themeToggle = page.locator('button[aria-label="Toggle theme"]');
    await expect(themeToggle).toBeVisible();

    const initialIcon = themeToggle.locator('svg').first();
    await expect(initialIcon).toBeVisible();

    await themeToggle.click();

    await expect(themeToggle.locator('svg')).toBeVisible();

    await themeToggle.click();

    await expect(themeToggle).toBeVisible();
  });

  test('GitHub link opens in new tab with correct attributes', async ({
    page,
  }) => {
    await page.goto('/');

    const githubLink = page.getByRole('link', { name: 'View Source Code' });
    await expect(githubLink).toBeVisible();

    await expect(githubLink).toHaveAttribute(
      'href',
      'https://github.com/Yukasama/nextjs-template',
    );
    await expect(githubLink).toHaveAttribute('target', '_blank');
    await expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');

    await expect(githubLink.locator('svg')).toBeVisible();
  });

  test('visual hover effects on feature cards', async ({ page }) => {
    await page.goto('/');

    const securityCard = page
      .locator('button')
      .filter({ hasText: 'A+ Security Headers' });

    await securityCard.hover();

    await expect(securityCard).toBeVisible();

    await securityCard.click();
    await expect(
      page.getByText('Content Security Policy with nonce'),
    ).toBeVisible();
  });
});
