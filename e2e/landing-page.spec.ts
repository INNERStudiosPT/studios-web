import { test, expect } from '@playwright/test';

test('has coming soon text and logo', async ({ page }) => {
  await page.goto('/');

  // Wait for redirect to /coming-soon
  await expect(page).toHaveURL(/\/coming-soon/);

  // Verify brand logo is visible
  await expect(page.getByAltText('Inner Studios').first()).toBeVisible();

  // Verify coming soon heading text is visible
  await expect(page.locator('text=something new is').first()).toBeVisible();
});
