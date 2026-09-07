// spec: specs/test-plan-page.md — Suite 6 Mobile viewport (390 × 844)

import { test, expect } from '@playwright/test';
import { MainPage, expectDrawer } from './helpers/main-page';

// KNOWN DEFECT (P1) — FIXED 2026-09-06 on feature/page-build: the closed
// off-canvas drawer (.toc, position: fixed; translateX(100%)) extended the
// document's scrollable overflow at ≤1024px (measured 656 vs 390). Fixed with
// overflow-x: hidden on body (propagates to the viewport, clips the drawer,
// body stays the scroller). TC-6.4 re-enabled; the assertions confirm the fix.

test.describe('Mobile viewport', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('TC-6.1 TOC hidden by default; toggle opens drawer', async ({ page }) => {
    const main = new MainPage(page);
    await main.goto();

    // 1. Closed by default: no .is-open, visibility hidden, off-canvas, aria-expanded=false, backdrop [hidden]
    await expectDrawer(page, false);
    await expect(main.toc).toHaveCSS('visibility', 'hidden');
    const closedLeft = await main.toc.evaluate((el) => el.getBoundingClientRect().left);
    expect(closedLeft).toBeGreaterThanOrEqual(390);

    // 2. Click toggle → drawer slides in: .is-open, aria-expanded=true, rect inside viewport, backdrop visible
    await main.tocToggle.click();
    await expectDrawer(page, true);
    await expect.poll(
      () =>
        main.toc.evaluate((el) => {
          const r = el.getBoundingClientRect();
          return r.left >= 0 && r.right <= window.innerWidth;
        }),
      { timeout: 2000 },
    ).toBe(true);

    // TOC links are clickable (first/last bounding boxes inside the viewport)
    const firstBox = await main.tocLinks.first().boundingBox();
    const lastBox = await main.tocLinks.last().boundingBox();
    expect(firstBox!.x).toBeGreaterThanOrEqual(0);
    expect(firstBox!.x + firstBox!.width).toBeLessThanOrEqual(390);
    expect(lastBox!.x).toBeGreaterThanOrEqual(0);
    expect(lastBox!.x + lastBox!.width).toBeLessThanOrEqual(390);
  });

  test('TC-6.2 Escape closes drawer', async ({ page }) => {
    const main = new MainPage(page);
    await main.goto();
    await main.tocToggle.click();
    await expectDrawer(page, true);

    // Press Escape → drawer closes, backdrop hidden again
    await page.keyboard.press('Escape');
    await expectDrawer(page, false);
  });

  test('TC-6.3 Backdrop click closes drawer', async ({ page }) => {
    const main = new MainPage(page);
    await main.goto();
    await main.tocToggle.click();
    await expectDrawer(page, true);

    // Click the backdrop (left of the drawer) → drawer closes
    await main.tocBackdrop.click({ position: { x: 30, y: 100 } });
    await expectDrawer(page, false);
  });

  test('TC-6.6 Clicking a TOC item closes the drawer', async ({ page }) => {
    const main = new MainPage(page);
    await main.goto();
    await main.tocToggle.click();
    await expectDrawer(page, true);

    // TOC item click closes the drawer (scroll covered by TC-1.3)
    await main.tocLinks.filter({ hasText: '2.2 OpenCode Zen' }).click();
    await expectDrawer(page, false);
  });

  test(
    'TC-6.4 No page-level horizontal overflow at 390 px (KNOWN DEFECT P1 fixed)',
    async ({ page }) => {
      const main = new MainPage(page);
      await main.goto();

      // Closed drawer: document must not scroll horizontally
      await expectDrawer(page, false);
      const widths = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
      }));
      expect(widths.scrollWidth).toBeLessThanOrEqual(widths.clientWidth);
    },
  );

  test('TC-6.4b Tables self-scroll; code blocks scroll within their container', async ({ page }) => {
    const main = new MainPage(page);
    await main.goto();

    // 2. .compare-table scrolls internally: scrollWidth > clientWidth, overflow-x auto
    const table = page.locator('table.compare-table').first();
    await expect(table).toHaveCSS('overflow-x', 'auto');
    await expect.poll(() => table.evaluate((el) => el.scrollWidth > el.clientWidth)).toBe(true);

    // Swipe/scroll table 1 to reveal the Codex column ("Cuota en planes")
    await table.evaluate((el) => {
      el.scrollLeft = el.scrollWidth;
    });
    const codexVisible = await page.evaluate(() => {
      const tbl = document.querySelector('table.compare-table')!;
      const cell = [...tbl.querySelectorAll('td')].find((td) => td.textContent === 'Cuota en planes')!;
      const tr = tbl.getBoundingClientRect();
      const cr = cell.getBoundingClientRect();
      return cr.left >= tr.left && cr.right <= tr.right;
    });
    expect(codexVisible).toBe(true);

    // 3. Code blocks scroll horizontally inside their own container (pre overflow-x auto)
    const pre = page.locator('[data-code-block] pre').first();
    await expect(pre).toHaveCSS('overflow-x', 'auto');
    await expect.poll(() => pre.evaluate((el) => el.scrollWidth >= el.clientWidth)).toBe(true);
  });

  test('TC-6.5 Header remains usable at 390 px', async ({ page }) => {
    const main = new MainPage(page);
    await main.goto();

    // Logo + 2 icon buttons visible; nav links hidden; no overflow contribution from the header
    await expect(page.locator('.site-header__logo')).toBeVisible();
    await expect(page.locator('[data-toc-toggle]')).toBeVisible();
    await expect(page.locator('[data-theme-toggle]')).toBeVisible();
    await expect(main.headerNav).toBeHidden();
    const headerWidth = await page.locator('.site-header').evaluate((el) => el.getBoundingClientRect().width);
    expect(headerWidth).toBeLessThanOrEqual(390);
  });
});