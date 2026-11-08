// spec: specs/test-plan-page.md — Suite 3 Theme toggle (light ↔ dark + system default)

import { test, expect } from '@playwright/test';
import { APP_PATH, MainPage, assertCleanConsole, collectConsole, expectThemeState } from './helpers/main-page';

const SUN = '.icon-button__icon--sun';
const MOON = '.icon-button__icon--moon';

test.describe('Theme toggle', () => {
  // Every test runs in a fresh context, so localStorage starts empty and the
  // system preference decides the initial theme (never persisted until click).
  test('TC-3.1 System light default; click toggles light ↔ dark', async ({ page }) => {
    const main = new MainPage(page);
    await main.goto();

    // 1. No stored preference + light system → explicit light, sun icon, no storage
    await expectThemeState(page, 'light', { stored: false });
    await expect(page.locator(SUN)).toBeVisible();
    await expect(page.locator(MOON)).toBeHidden();

    // 2. Click → dark, moon icon, stored
    await main.themeToggle.click();
    await expectThemeState(page, 'dark');
    await expect(page.locator(SUN)).toBeHidden();
    await expect(page.locator(MOON)).toBeVisible();

    // 3. Click → light, sun icon, stored
    await main.themeToggle.click();
    await expectThemeState(page, 'light');
    await expect(page.locator(SUN)).toBeVisible();
    await expect(page.locator(MOON)).toBeHidden();
  });

  test('TC-3.2 System dark default', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' });
    const main = new MainPage(page);
    await main.goto();

    // Dark resolution is explicit in the DOM but not persisted
    await expectThemeState(page, 'dark', { stored: false });
    await expect(page.locator(SUN)).toBeHidden();
    await expect(page.locator(MOON)).toBeVisible();
  });

  test('TC-3.3 Stored preference wins over system', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' });
    const main = new MainPage(page);
    await main.goto();
    await expectThemeState(page, 'dark', { stored: false });

    await page.evaluate(() => localStorage.setItem('theme', 'light'));
    await page.reload();

    await expectThemeState(page, 'light');
    await expect(page.locator(SUN)).toBeVisible();
    await expect(page.locator(MOON)).toBeHidden();
  });

  test('TC-3.4 Persistence across reload', async ({ page }) => {
    const main = new MainPage(page);
    await main.goto();

    // 1. Click to dark, reload → dark
    await main.themeToggle.click();
    await expectThemeState(page, 'dark');
    await page.reload();
    await expectThemeState(page, 'dark');

    // 2. Click to light, reload → light
    await main.themeToggle.click();
    await expectThemeState(page, 'light');
    await page.reload();
    await expectThemeState(page, 'light');
  });

  test('TC-3.5 Storage failure', async ({ page }) => {
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
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
    await expect(page.locator('[data-theme-toggle]')).toHaveAttribute('aria-label', 'Tema: claro');

    // Click still updates data-theme for the session
    await page.locator('[data-theme-toggle]').click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    await expect(page.locator('[data-theme-toggle]')).toHaveAttribute('aria-label', 'Tema: oscuro');
    assertCleanConsole(sink);
  });
});
