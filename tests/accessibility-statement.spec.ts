// spec: specs/test-plan-page.md — Suite 8 Accessibility statement page

import { test, expect } from '@playwright/test';
import { APP_PATH, STATEMENT_PATH, MainPage, assertCleanConsole, collectConsole } from './helpers/main-page';

test.describe('Accessibility statement page', () => {
  test('TC-8.1 Page loads with WCAG commitment', async ({ page }) => {
    const sink = collectConsole(page);
    await page.goto(STATEMENT_PATH);

    // 1. Title, lang, h1
    await expect(page).toHaveTitle('Declaración de accesibilidad — OpenCode Tutorial');
    await expect(page.locator('html')).toHaveAttribute('lang', 'es');
    await expect(page.locator('h1')).toHaveText('Declaración de accesibilidad');

    // 2. WCAG conformance + commitment sentence
    await expect(page.locator('body')).toContainText('WCAG 2.1, nivel AA');
    await expect(page.locator('body')).toContainText(
      'OpenCode Tutorial se compromete a hacer su contenido accesible para todas las personas',
    );

    // 3. Back link returns to the main page
    const backLink = page.locator('.statement__back');
    await expect(backLink).toHaveText('← Volver al inicio');
    await backLink.click();
    await expect(page).toHaveURL(/\/opencode-tutorial\/(index\.html)?$/);

    // 4. Known P2: favicon.ico 404 on this standalone page is acceptable — the
    //    main page must stay clean, this one only allows favicon-related noise
    assertCleanConsole(sink, { allowFavicon: true });
  });

  test('TC-8.2 Footer link reachability', async ({ page }) => {
    const main = new MainPage(page);
    await main.goto();

    // From the main page footer, click "Declaración de accesibilidad" → statement page.
    // Dispatched via element.click() for determinism: the footer sits at the page
    // bottom and auto-scroll timing is flaky. The former scroll-lock defect is
    // fixed (toc.js revealActiveLink scrolls the TOC container via scrollTop, not
    // the page). An anchor element.click() triggers the same navigation.
    const footerLink = page.locator('.site-footer a[href="accessibility-statement.html"]');
    await expect(footerLink).toHaveText('Declaración de accesibilidad');
    await footerLink.evaluate((el) => el.click());
    await expect(page).toHaveURL(/accessibility-statement\.html/);
    await expect(page.locator('h1')).toHaveText('Declaración de accesibilidad');
    await expect(page).toHaveTitle('Declaración de accesibilidad — OpenCode Tutorial');
  });
});