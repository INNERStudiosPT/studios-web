import { test, expect } from '@playwright/test';

test('landing page loads with stratacoms branding', async ({ page }) => {
  await page.goto('/');

  // Coming-soon is disabled — the home page should render directly.
  await expect(page).not.toHaveURL(/\/coming-soon/);

  // Verify the stratacoms brand logo (navbar link) is visible.
  await expect(page.getByRole('link', { name: 'stratacoms' }).first()).toBeVisible();

  // Verify a primary navigation entry point is present.
  await expect(page.getByRole('link', { name: 'Contacte-nos' }).first()).toBeVisible();
});
