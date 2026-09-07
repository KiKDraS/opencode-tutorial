// spec: specs/test-plan-page.md — Suite 4 Copy buttons (clipboard + status)

import { test, expect } from '@playwright/test';
import { APP_PATH, MainPage } from './helpers/main-page';

test.describe('Copy buttons', () => {
  test.beforeEach(async ({ page }) => {
    // Clipboard needs permissions before the copy calls
    await page.context().grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto(APP_PATH);
    await expect(page.locator('main h3')).toHaveCount(27);
  });

  test('TC-4.1 Copy success on first code block', async ({ page }) => {
    const block = page.locator('[data-code-block]').first();
    const copyButton = block.locator('[data-copy-button]');
    const status = block.locator('.code-status');

    // 1. Blank state: button "Copiar", no aria-pressed, empty status
    await expect(copyButton).toHaveText('Copiar');
    expect(await copyButton.getAttribute('aria-pressed')).toBeNull();
    await expect(status).toHaveText('');

    // 2-3. Click → success status (transient ~2 s) + aria-pressed="true".
    // Note: clicks on below-the-fold content are dispatched via element.click()
    // for determinism (avoids auto-scroll timing). The former scroll-lock defect
    // is fixed: toc.js revealActiveLink scrolls the TOC container via scrollTop
    // instead of scrolling the active header link into view (see navigation.spec.ts).
    // The copy handler is a delegated document listener, so a synthetic click
    // exercises the exact same code path.
    await copyButton.evaluate((btn) => btn.click());
    await expect(status).toHaveText('Copiado al portapapeles');
    await expect(copyButton).toHaveAttribute('aria-pressed', 'true');

    // 4. Clipboard equals the block's pre textContent
    const clip = await page.evaluate(() => navigator.clipboard.readText());
    const code = await block.locator('pre').textContent();
    expect(clip).toBe(code);
    expect(clip.startsWith('# 1. Instala OpenCode')).toBe(true);

    // 5. After ~2.5 s the status clears (generous poll window)
    await expect.poll(() => status.textContent(), { timeout: 4000 }).toBe('');
  });

  test('TC-4.2 Copy works for every block (7/7)', async ({ page }) => {
    // Each block: click copy → success status + clipboard equals that block's code
    for (let i = 0; i < 7; i++) {
      const block = page.locator('[data-code-block]').nth(i);
      await block.locator('[data-copy-button]').evaluate((btn) => btn.click());
      await expect(block.locator('.code-status')).toHaveText('Copiado al portapapeles');
      const clip = await page.evaluate(() => navigator.clipboard.readText());
      const code = await block.locator('pre').textContent();
      expect(clip, `block ${i + 1} code copied verbatim`).toBe(code);
    }

    // Spot-checks: block 3 ($schema) and block 5 (# Agent Context)
    await expect(page.locator('[data-code-block]').nth(2).locator('pre')).toContainText('"$schema": "https://opencode.ai/config.json"');
    await expect(page.locator('[data-code-block]').nth(4).locator('pre')).toContainText('# Agent Context');
  });

  test('TC-4.3 Clipboard failure path (mock)', async ({ page }) => {
    // Mock clipboard.writeText to reject; also break the execCommand fallback
    await page.addInitScript(() => {
      try {
        Object.defineProperty(navigator, 'clipboard', {
          configurable: true,
          value: { writeText: () => Promise.reject(new Error('mock: clipboard denied')) },
        });
      } catch {
        // Non-configurable (older engines): fallback below still forces failure
      }
      document.execCommand = () => false;
    });
    await page.goto(APP_PATH);
    await expect(page.locator('main h3')).toHaveCount(27);

    // Click copy → failure status, no aria-pressed
    const block = page.locator('[data-code-block]').first();
    await block.locator('[data-copy-button]').evaluate((btn) => btn.click());
    await expect(block.locator('.code-status')).toHaveText('No se pudo copiar');
    expect(await block.locator('[data-copy-button]').getAttribute('aria-pressed')).toBeNull();
  });
});