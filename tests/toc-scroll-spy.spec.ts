// spec: specs/test-plan-page.md — Suite 5 TOC scroll-spy (aria-current follows scroll)

import { test, expect } from '@playwright/test';
import { MainPage, scrollHeadingToProbe, expectNativeAnchorJump } from './helpers/main-page';

// KNOWN APP DEFECT — FIXED 2026-09-06 on feature/page-build: the page was
// effectively unscrollable because toc.js revealActiveLink() scrolled the
// ACTIVE HEADER NAV LINK into view (in-flow at the document top), reverting
// any scroll crossing the spy band (50px..20% viewport) to ~56px. Fixed: spy
// reveals only inside the TOC container (scrollTop assignment). All scenarios
// below are re-enabled.

test.describe('TOC scroll-spy', () => {
  test(
    'TC-5.1 Active link updates while scrolling',
    async ({ page }) => {
      const main = new MainPage(page);
      await main.goto();

      // 1. Blank state at top: group 1 active, exactly one aria-current link
      await expect(main.activeTocLink).toHaveCount(1);
      await expect(main.activeTocLink).toHaveText('1. Fundamentos de LLMs');

      // 2. Scroll until #opencode-titulo crosses the 20 %-viewport probe line → group 2 active
      await scrollHeadingToProbe(page, 'opencode-titulo', 0.15);
      await expect.poll(() => main.activeTocLink.textContent(), { timeout: 5000 }).toBe('2. OpenCode');

      // 3. Continue to section 5 → group 5 active (Fuentes h3s are excluded from the spy)
      await scrollHeadingToProbe(page, 'ejemplo-titulo', 0.15);
      await expect.poll(() => main.activeTocLink.textContent(), { timeout: 5000 }).toBe('5. Ejemplo real');
    },
  );

  test(
    'TC-5.2 Item-level activation for deep headings',
    async ({ page }) => {
      const main = new MainPage(page);
      await main.goto();

      // 1. Scroll so #mcp heading top ≤ 20 % viewport → item "4.9 MCP" active, group 4 not
      await scrollHeadingToProbe(page, 'mcp', 0.15);
      await expect.poll(() => main.activeTocLink.textContent(), { timeout: 5000 }).toBe('4.9 MCP');
      await expect(main.tocLinks.filter({ hasText: '4. Trabajar con agentes' })).not.toHaveAttribute('aria-current', 'true');

      // 2. Only one link active at a time
      await expect(main.activeTocLink).toHaveCount(1);
    },
  );

  test(
    'TC-5.3 Clicking an active TOC link still jumps correctly',
    async ({ page }) => {
      const main = new MainPage(page);
      await main.goto();

      // 1. Click TOC item "3.3 opencode.json" → native hash jump to the h3
      await main.tocLinks.filter({ hasText: '3.3 opencode.json' }).click();
      await expectNativeAnchorJump(page, '#opencode-json');

      // aria-current moves to the item after the jump settles
      await expect.poll(() => main.activeTocLink.textContent(), { timeout: 5000 }).toBe('3.3 opencode.json');
    },
  );
});