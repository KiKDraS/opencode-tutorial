// spec: specs/test-plan-page.md — Suite 1 Navigation (header nav + TOC anchors)

import { test, expect } from '@playwright/test';
import { MainPage, NAV_LINKS, TOC_SECTIONS, expectDrawer, expectNativeAnchorJump } from './helpers/main-page';

// KNOWN APP DEFECT — FIXED 2026-09-06 on feature/page-build: toc.js
// revealActiveLink() called link.scrollIntoView({ block: 'nearest' }) on EVERY
// [data-spy-link] — including the header nav links, whose in-flow position is
// the document top — yanking the page back to ~56px on any scroll crossing the
// spy band. Fixed: the spy now activates aria-current on all links but reveals
// only inside the TOC container (scrollTop assignment; scrollIntoView banned —
// it also moves Chromium's sequential-focus start point). TC-1.3/TC-1.4 and
// the suite-5/7 scroll scenarios are re-enabled.

test.describe('Navigation', () => {
  test('TC-1.1 Header nav renders 5 links, all targets exist', async ({ page }) => {
    const main = new MainPage(page);
    await main.goto();

    // 2. Locate nav[aria-label="Navegación principal"]
    const nav = main.headerNav;
    await expect(nav).toBeVisible();

    // 3. Assert link texts + 4. each href resolves to a section element
    const links = nav.locator('a[data-spy-link]');
    await expect(links).toHaveCount(NAV_LINKS.length);
    for (let i = 0; i < NAV_LINKS.length; i++) {
      const link = links.nth(i);
      await expect(link).toHaveText(NAV_LINKS[i].label);
      await expect(link).toHaveAttribute('href', NAV_LINKS[i].href);
      const exists = await page.evaluate((id) => document.getElementById(id) !== null, NAV_LINKS[i].href.slice(1));
      expect(exists, `target of ${NAV_LINKS[i].href} exists`).toBe(true);
    }
  });

  test('TC-1.2 TOC renders 5 groups + 22 items with valid hrefs', async ({ page }) => {
    const main = new MainPage(page);
    await main.goto();

    // 2. Group links, verbatim (group 3 label contains inline <code>.opencode/</code>)
    const groups = page.locator('[data-toc-group-link]');
    await expect(groups).toHaveCount(5);
    await expect(groups).toHaveText(TOC_SECTIONS.map((s) => s.label));

    // 3. 22 item links; every TOC link href (groups + items) points to an existing element id
    const items = page.locator('[data-toc-sublist] a');
    await expect(items).toHaveCount(22);
    await expect(items).toHaveText(TOC_SECTIONS.flatMap((s) => s.items.map((i) => i.label)));
    for (const section of TOC_SECTIONS) {
      await expect(page.locator(`[data-toc-group-link][href="${section.href}"]`)).toHaveCount(1);
      for (const item of section.items) {
        await expect(page.locator(`[data-toc-list] a[href="${item.href}"]`)).toHaveCount(1);
        const exists = await page.evaluate((id) => document.getElementById(id) !== null, item.href.slice(1));
        expect(exists, `target of ${item.href} exists`).toBe(true);
      }
    }
  });

  test(
    'TC-1.3 TOC item click jumps to heading (native) and closes drawer',
    async ({ page }) => {
      const main = new MainPage(page);
      await main.goto();

      // 1-2. Desktop: click TOC items → native hash jump; target lands at the
      // scroll-padding-top offset (instant, no smooth phase)
      for (const item of ['2.2 OpenCode Zen', '4.9 MCP', '5.2 Flujo de trabajo']) {
        const href = TOC_SECTIONS.flatMap((s) => s.items).find((i) => i.label === item)!.href;
        await main.tocLinks.filter({ hasText: item }).click();
        await expectNativeAnchorJump(page, href);
      }

      // 3. Mobile: repeat with drawer open — click closes the drawer
      await page.setViewportSize({ width: 390, height: 844 });
      await main.tocToggle.click();
      await expectDrawer(page, true);
      await main.tocLinks.filter({ hasText: '4.9 MCP' }).click();
      await expectDrawer(page, false);
      await expectNativeAnchorJump(page, '#mcp');
    },
  );

  test(
    'TC-1.4 Header nav link click jumps to section',
    async ({ page }) => {
      const main = new MainPage(page);
      await main.goto();

      // 1-2. Click header link "Agentes" → native hash jump to the section
      await main.headerNav.getByRole('link', { name: 'Agentes' }).click();
      await expectNativeAnchorJump(page, '#agentes');

      // 3. Repeat for "Fundamentos" (top of the page)
      await main.headerNav.getByRole('link', { name: 'Fundamentos' }).click();
      await expectNativeAnchorJump(page, '#fundamentos');
    },
  );

  test('TC-1.5 All 22 TOC anchors land on the correct heading (id match sweep)', async ({ page }) => {
    const main = new MainPage(page);
    await main.goto();

    // Every TOC item href resolves to an h3 whose text starts with the item's numbering
    for (const section of TOC_SECTIONS) {
      for (const item of section.items) {
        const id = item.href.slice(1);
        const numbering = item.label.split(' ')[0];
        const ok = await page.evaluate(
          ({ id, numbering }) => {
            const el = document.getElementById(id);
            return el?.tagName === 'H3' && el.textContent.startsWith(numbering);
          },
          { id, numbering },
        );
        expect(ok, `#${id} is an h3 starting with "${numbering}"`).toBe(true);
      }
    }
  });
});