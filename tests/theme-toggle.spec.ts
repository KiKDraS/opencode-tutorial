// spec: specs/test-plan-page.md — Suite 3 Theme toggle (auto → light → dark + persistence)

import { test, expect } from '@playwright/test';
import { APP_PATH, MainPage, assertCleanConsole, collectConsole, expectThemeState } from './helpers/main-page';

test.describe('Theme toggle', () => {
  // Blank state: every test runs in a fresh context, so localStorage starts
  // empty ("auto"). NOTE: do NOT clear localStorage via addInitScript — it runs
  // on every navigation (including page.reload) and would break TC-3.2.
  test('TC-3.1 Cycle auto → light → dark → auto', async ({ page }) => {
    const main = new MainPage(page);
    await main.goto();

    // 1. Blank state: aria-label "Tema: auto", no data-theme on <html>
    await expectThemeState(page, 'auto');

    // 2. Click once → light
    await main.themeToggle.click();
    await expectThemeState(page, 'light');

    // 3. Click again → dark
    await main.themeToggle.click();
    await expectThemeState(page, 'dark');

    // 4. Click again → auto; data-theme removed; localStorage key removed
    await main.themeToggle.click();
    await expectThemeState(page, 'auto');
    expect(await page.locator('html').getAttribute('data-theme')).toBeNull();
  });

  test('TC-3.2 Persistence across reload', async ({ page }) => {
    const main = new MainPage(page);
    await main.goto();

    // 1. Set dark, reload → still dark
    await main.themeToggle.click();
    await expectThemeState(page, 'light');
    await main.themeToggle.click();
    await expectThemeState(page, 'dark');
    await page.reload();
    await expectThemeState(page, 'dark');

    // 2. Set auto, reload → back to auto (clean-up verified)
    await main.themeToggle.click();
    await expectThemeState(page, 'auto');
    await page.reload();
    await expectThemeState(page, 'auto');
  });

  test('TC-3.3 No-JS/storage-failure resilience', async ({ page }) => {
    // localStorage throws (private mode): theme still applies in-session, no console error
    const sink = collectConsole(page);
    await page.addInitScript(() => {
      Storage.prototype.getItem = () => {
        throw new Error('storage denied');
      };
      Storage.prototype.setItem = () => {
        throw new Error('storage denied');
      };
      Storage.prototype.removeItem = () => {
        throw new Error('storage denied');
      };
    });
    await page.goto(APP_PATH);
    await expect(page.locator('[data-theme-toggle]')).toHaveAttribute('aria-label', 'Tema: auto');

    // Click still updates data-theme for the session
    await page.locator('[data-theme-toggle]').click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
    await expect(page.locator('[data-theme-toggle]')).toHaveAttribute('aria-label', 'Tema: light');
    assertCleanConsole(sink);
  });
});