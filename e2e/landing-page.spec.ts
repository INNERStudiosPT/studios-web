import { test, expect } from '@playwright/test';

test('has title and brand text', async ({ page }) => {
  await page.goto('/');

  // Verify brand logo is visible
  await expect(page.getByAltText('inner studios').first()).toBeVisible();

  // Verify CTA button is visible
  await expect(page.locator('button:has-text("Open an Account")').first()).toBeVisible();

  // Verify heading text is visible
  await expect(page.locator('text=Global payments built for')).toBeVisible();
});
