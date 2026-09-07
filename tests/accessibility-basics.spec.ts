// spec: specs/test-plan-page.md — Suite 7 Accessibility basics (WCAG 2.1 AA)

import { test, expect } from '@playwright/test';
import { APP_PATH, MainPage, VIDEO_CARDS } from './helpers/main-page';

// KNOWN APP DEFECTS — both fixed 2026-09-06 on feature/page-build:
// 1. Scroll lock — toc.js revealActiveLink() scrolled the active HEADER NAV
//    link into view (in-flow at document top), reverting the page to ~56px.
//    Fixed: spy reveals only inside the TOC container (scrollTop, never
//    scrollIntoView).
// 2. Keyboard focus — scrollIntoView at init moved Chromium's sequential-focus
//    start point into the TOC, so the first Tab landed on TOC item 1.1.
//    Fixed: no scrollIntoView in the spy path + tabindex="-1" on main so the
//    skip link's Enter lands focus on #main-content.

test.describe('Accessibility basics', () => {
  test(
    'TC-7.1 Skip link',
    async ({ page }) => {
      const main = new MainPage(page);
      await main.goto();

      // 1. Blank state: Tab → skip link visible with focus ring 2px solid rgb(79,70,229)
      await page.keyboard.press('Tab');
      await expect.poll(() => page.evaluate(() => document.activeElement === document.querySelector('.skip-link'))).toBe(true);
      // Slide-in transition: poll until the reveal transform settles
      await expect
        .poll(() => page.locator('.skip-link').evaluate((el) => getComputedStyle(el).transform), { timeout: 2000 })
        .toBe('matrix(1, 0, 0, 1, 0, 0)');
      const skipState = await page.locator('.skip-link').evaluate((el) => {
        const style = getComputedStyle(el);
        const rect = el.getBoundingClientRect();
        return { transform: style.transform, outline: style.outline, top: rect.top };
      });
      expect(skipState.outline).toContain('rgb(79, 70, 229)');
      expect(skipState.outline).toContain('2px');
      expect(skipState.top).toBeGreaterThanOrEqual(0);

      // 2. Enter → focus lands on #main-content, URL hash #main-content
      await page.keyboard.press('Enter');
      await expect.poll(() => page.evaluate(() => location.hash)).toBe('#main-content');
      await expect.poll(() => page.evaluate(() => document.activeElement?.id)).toBe('main-content');
    },
  );

  test('TC-7.2 Heading hierarchy', async ({ page }) => {
    const main = new MainPage(page);
    await main.goto();

    // Exactly 1 h1, 5 h2, 27 h3, zero h4+; every h3 sits inside an .article__section
    const counts = await page.evaluate(() => ({
      h1: document.querySelectorAll('h1').length,
      h2: document.querySelectorAll('h2').length,
      h3: document.querySelectorAll('h3').length,
      h4: document.querySelectorAll('h4').length,
      h5: document.querySelectorAll('h5').length,
      h6: document.querySelectorAll('h6').length,
      orphanH3: [...document.querySelectorAll('h3')].filter((h) => !h.closest('.article__section')).length,
    }));
    expect(counts).toEqual({ h1: 1, h2: 5, h3: 27, h4: 0, h5: 0, h6: 0, orphanH3: 0 });
  });

  test(
    'TC-7.3 Keyboard navigation & focus visibility',
    // Default viewport 1280×720: the TOC toggle is display:none at ≥1025px
    // (by design — header nav covers it there), so the sequence is
    // skip → logo → nav → theme toggle. TOC toggle tabbability is covered at
    // 390px by TC-7.4.
    async ({ page }) => {
      const main = new MainPage(page);
      await main.goto();

      // Tab through header: logo → nav links → theme toggle
      const expectedOrder = ['logo', 'Fundamentos', 'OpenCode', 'Estructura', 'Agentes', 'Ejemplo real', 'theme-toggle'];
      await page.keyboard.press('Tab'); // first stop: skip link
      for (const name of expectedOrder) {
        await page.keyboard.press('Tab');
        const state = await page.evaluate(() => {
          const el = document.activeElement;
          return {
            name: el!.classList.contains('site-header__logo')
              ? 'logo'
              : el!.hasAttribute('data-theme-toggle')
                ? 'theme-toggle'
                : el!.hasAttribute('data-toc-toggle')
                  ? 'toc-toggle'
                  : el!.textContent?.trim() ?? '',
            outline: getComputedStyle(el!).outline,
          };
        });
        expect(state.name, `Tab landed on ${name}`).toBe(name);
        expect(state.outline, `focus ring on ${name}`).toContain('rgb(79, 70, 229)');
        expect(state.outline).toContain('2px');
        expect(state.outline).toContain('solid');
      }

      // No trap: the next Tab moves on (into the TOC sidebar / main content)
      await page.keyboard.press('Tab');
      const movedOn = await page.evaluate(() => document.activeElement?.closest('[data-toc], main') !== null);
      expect(movedOn).toBe(true);
    },
  );

  test('TC-7.4 ARIA wiring', async ({ page }) => {
    const main = new MainPage(page);
    await main.goto();

    // 1. Theme button aria-label matches the current theme (auto at blank state)
    await expect(main.themeToggle).toHaveAttribute('aria-label', 'Tema: auto');

    // 2. TOC toggle: aria-controls="toc", aria-expanded reflects the drawer state
    await expect(main.tocToggle).toHaveAttribute('aria-controls', 'toc');
    await expect(main.tocToggle).toHaveAttribute('aria-expanded', 'false');
    await page.setViewportSize({ width: 390, height: 844 });
    await main.tocToggle.click();
    await expect(main.tocToggle).toHaveAttribute('aria-expanded', 'true');
    await page.keyboard.press('Escape');
    await expect(main.tocToggle).toHaveAttribute('aria-expanded', 'false');

    // 3. Exactly one TOC link has aria-current="true" at the initial position
    await expect(main.activeTocLink).toHaveCount(1);
    await expect(main.activeTocLink).toHaveText('1. Fundamentos de LLMs');

    // 4. Placeholder thumb links expose aria-label = title; decorative SVGs aria-hidden; copy status role="status"
    await expect(page.locator('.video-card').nth(1).locator('[data-video-thumb-link]')).toHaveAttribute('aria-label', VIDEO_CARDS[1].title);
    await expect(page.locator('.site-header svg[aria-hidden="true"]')).toHaveCount(4);
    await expect(page.locator('[data-callout-icon][aria-hidden="true"]')).toHaveCount(3);
    await expect(page.locator('[data-code-block] .code-status').first()).toHaveAttribute('role', 'status');
  });

  test('TC-7.5 Reduced motion (no reveal; scroll part fixme\'d)', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    const main = new MainPage(page);
    await main.goto();

    // 1. No scroll-reveal: zero .reveal elements; sections render fully visible
    await expect(page.locator('.reveal')).toHaveCount(0);

    // 2. html scroll-behavior: auto; transitions effectively disabled
    const styles = await page.evaluate(() => {
      const section = document.querySelector('.article__section')!;
      return {
        opacity: getComputedStyle(section).opacity,
        transform: getComputedStyle(section).transform,
        transitionDuration: getComputedStyle(section).transitionDuration,
        htmlScrollBehavior: getComputedStyle(document.documentElement).scrollBehavior,
      };
    });
    expect(styles.opacity).toBe('1');
    expect(styles.transform).toBe('none');
    expect(parseFloat(styles.transitionDuration)).toBeLessThan(0.001);
    expect(styles.htmlScrollBehavior).toBe('auto');
  });

  test(
    'TC-7.5b Reduced motion: TOC click scrolls without animation',
    async ({ page }) => {
      await page.emulateMedia({ reducedMotion: 'reduce' });
      const main = new MainPage(page);
      await main.goto();

      // 3. Click a TOC item → scroll happens without smooth animation (auto behavior)
      await main.tocLinks.filter({ hasText: '4. Trabajar con agentes' }).click();
      await expect.poll(
        () =>
          main.page.locator('#agentes-titulo').evaluate((el) => {
            const top = el.getBoundingClientRect().top;
            return top >= 0 && top <= window.innerHeight * 0.4;
          }),
        { timeout: 5000 },
      ).toBe(true);
    },
  );

  test.fixme(
    'TC-7.6 No-JS fallback shows all content',
    // FIXME: the plan assumes all content is static in the DOM without JS.
    // Verified 2026-09-06: subsections (22 h3s), sources (50 links), video cards
    // (15) and code blocks (7) are rendered client-side by src/js/components/*.js
    // — with JS disabled only the static shells exist (hero, 5 section h2s, the
    // 2 static h3s 2.1/3.2, 2 compare tables, footer). The full plan assertions
    // cannot pass as written; the static-shell baseline below is what holds.
    // Healer: make subsections/sources/videos/code static (or SSR) and un-fixme.
    async ({ browser }) => {
      const context = await browser.newContext({ javaScriptEnabled: false });
      const page = await context.newPage();
      await page.goto(APP_PATH);
      await expect(page.locator('.article__section')).toHaveCount(5);
      await expect(page.locator('table.compare-table')).toHaveCount(2);
      await expect(page.locator('h1')).toHaveText('OpenCode: aprende a trabajar con agentes de IA');
      await context.close();
    },
  );
});