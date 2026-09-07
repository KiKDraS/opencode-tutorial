// spec: specs/test-plan-page.md — Suite 9 Console cleanliness

import { test, expect } from '@playwright/test';
import { MainPage, assertCleanConsole, collectConsole, scrollHeadingToProbe } from './helpers/main-page';

test.describe('Console cleanliness', () => {
  test('TC-9.1 Zero errors/warnings on load (main page)', async ({ page }) => {
    const sink = collectConsole(page);
    const main = new MainPage(page);
    await main.goto();

    // 0 console errors, 0 warnings, 0 uncaught exceptions, 0 failed resources
    await expect(page.locator('main h3')).toHaveCount(27);
    assertCleanConsole(sink);
  });

  test('TC-9.2 Zero errors after full interaction set', async ({ page }) => {
    const sink = collectConsole(page);
    const main = new MainPage(page);
    await main.goto();
    await expect(page.locator('main h3')).toHaveCount(27);

    // Theme cycle ×3 (auto → light → dark → auto)
    await main.themeToggle.click();
    await main.themeToggle.click();
    await main.themeToggle.click();

    // Copy button success (synthetic click for determinism — the former
    // scroll-lock defect is fixed, see copy-buttons.spec.ts note)
    await page.context().grantPermissions(['clipboard-read', 'clipboard-write']);
    await main.copyButton(0).evaluate((btn) => btn.click());
    await expect(main.codeStatus(0)).toHaveText('Copiado al portapapeles');

    // Mobile: TOC open/close via toggle, Escape, backdrop click
    await page.setViewportSize({ width: 390, height: 844 });
    await main.tocToggle.click();
    await expect(main.toc).toHaveClass(/is-open/);
    await page.keyboard.press('Escape');
    await main.tocToggle.click();
    await expect(main.toc).toHaveClass(/is-open/);
    await main.tocBackdrop.click({ position: { x: 30, y: 100 } });
    await expect(main.toc).not.toHaveClass(/is-open/);

    // Scroll through all 5 sections (no scroll assertions — the former
    // scroll-lock defect is fixed via toc.js scrollTop reveal; this only
    // exercises the scroll event path)
    await page.setViewportSize({ width: 1280, height: 720 });
    for (const id of ['fundamentos-titulo', 'opencode-titulo', 'estructura-titulo', 'agentes-titulo', 'ejemplo-titulo']) {
      await scrollHeadingToProbe(page, id, 0.3);
    }

    // Footer statement link round-trip (synthetic click; statement page
    // favicon 404 is known → allowed)
    await page.locator('.site-footer a[href="accessibility-statement.html"]').evaluate((el) => el.click());
    await expect(page).toHaveURL(/accessibility-statement\.html/);
    await page.locator('.statement__back').click();
    await expect(page).toHaveURL(/\/opencode-tutorial\/(index\.html)?$/);

    // Still clean
    assertCleanConsole(sink, { allowFavicon: true });
  });
});