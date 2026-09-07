// spec: specs/test-plan-page.md — Suite 2 Content presence (sections, subtopics, videos, tables, sources)

import { test, expect } from '@playwright/test';
import {
  MainPage,
  CODE_BLOCK_LABELS,
  FOOTER_LINKS,
  H3_BY_SECTION,
  SOURCE_COUNTS,
  SOURCE_FIRST_ITEMS,
  VIDEO_CARDS,
} from './helpers/main-page';

test.describe('Content presence', () => {
  test('TC-2.1 All 5 sections render with exact h2s', async ({ page }) => {
    const main = new MainPage(page);
    await main.goto();

    // 1. Exactly 5 .article__section with the expected ids, in order
    const sections = page.locator('main .article__section');
    await expect(sections).toHaveCount(5);
    const sectionIds = ['fundamentos', 'opencode', 'estructura-opencode', 'agentes', 'ejemplo-real'];
    for (let i = 0; i < sectionIds.length; i++) {
      await expect(sections.nth(i)).toHaveAttribute('id', sectionIds[i]);
    }

    // 2. h2 texts verbatim (h2 #3 carries inline <code>.opencode/</code>)
    const h2s = page.locator('main .article__section > h2');
    await expect(h2s).toHaveText([
      '1. Fundamentos de LLMs',
      '2. OpenCode',
      '3. Estructura .opencode/',
      '4. Trabajar con agentes',
      '5. Ejemplo real: este proyecto',
    ]);

    // 3. Hero h1 verbatim
    await expect(page.locator('h1')).toHaveText('OpenCode: aprende a trabajar con agentes de IA');
  });

  test('TC-2.2 All subtopics render (22 h3s) — per-section sweep', async ({ page }) => {
    const main = new MainPage(page);
    await main.goto();

    // 1. Each section's h3 titles equal the verbatim ground-truth list (content + Fuentes)
    for (const [sectionId, titles] of Object.entries(H3_BY_SECTION)) {
      await expect(page.locator(`#${sectionId} h3`)).toHaveText(titles);
    }

    // 2. Each section ends with an h3 "Fuentes"
    for (const sectionId of Object.keys(H3_BY_SECTION)) {
      await expect(page.locator(`#${sectionId} h3`).last()).toHaveText('Fuentes');
    }
  });

  test('TC-2.3 Spanish content check', async ({ page }) => {
    const main = new MainPage(page);
    await main.goto();

    // 1. <html lang="es"> and <title> verbatim
    await expect(page.locator('html')).toHaveAttribute('lang', 'es');
    await expect(page).toHaveTitle('OpenCode Tutorial — Agentes de IA para desarrolladores');

    // 2. Spot-check Spanish phrases. The subsection ids live on the h3; the
    //    body text is in the sibling .article__body of the same subsection.
    await expect(page.locator('.article__hero p')).toContainText('agente de código abierto que corre en tu terminal');
    const subsection1 = page.locator('.article__subsection', { has: page.locator('#que-es-un-llm') });
    await expect(subsection1).toContainText('transformador');
    await expect(subsection1).toContainText('atención');
    const subsectionPermisos = page.locator('.article__subsection', { has: page.locator('#permisos') });
    await expect(subsectionPermisos).toContainText('allow');
    await expect(subsectionPermisos).toContainText('ask');
    await expect(subsectionPermisos).toContainText('deny');
  });

  test('TC-2.4 Sources lists — counts and link integrity (50 total)', async ({ page }) => {
    const main = new MainPage(page);
    await main.goto();

    // 1. Per-section counts: 11 / 8 / 6 / 19 / 6
    for (const [section, count] of Object.entries(SOURCE_COUNTS)) {
      await expect(page.locator(`ul[data-sources="${section}"] li`)).toHaveCount(count);
    }

    // 2. First item of each list, verbatim
    for (const [section, title] of Object.entries(SOURCE_FIRST_ITEMS)) {
      await expect(page.locator(`ul[data-sources="${section}"] li a`).first()).toHaveText(title);
    }

    // 3. Every source <a>: target=_blank, rel="noopener noreferrer", https:// href
    const links = page.locator('ul[data-sources-list] a');
    await expect(links).toHaveCount(50);
    for (let i = 0; i < 50; i++) {
      const link = links.nth(i);
      await expect(link).toHaveAttribute('target', '_blank');
      await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      await expect(link).toHaveAttribute('href', /^https:\/\//);
    }
  });

  test('TC-2.5 Video cards — 15 cards, verbatim titles/channels, links', async ({ page }) => {
    const main = new MainPage(page);
    await main.goto();

    // 1. 15 .video-card across 7 [data-video-grid] containers
    await expect(page.locator('.video-card')).toHaveCount(15);
    await expect(page.locator('[data-video-grid]')).toHaveCount(7);

    // 2-3. Titles/channels verbatim (document order); card link text/href/rel
    for (let i = 0; i < VIDEO_CARDS.length; i++) {
      const card = page.locator('.video-card').nth(i);
      const video = VIDEO_CARDS[i];
      await expect(card.locator('[data-video-title]')).toHaveText(video.title);
      await expect(card.locator('[data-video-channel]')).toHaveText(video.channel);
      await expect(card.locator('[data-video-link]')).toHaveText(video.kind === 'placeholder' ? 'Abrir curso' : 'Ver en YouTube');
      await expect(card.locator('[data-video-link]')).toHaveAttribute('href', /^https?:\/\//);
      await expect(card.locator('[data-video-link]')).toHaveAttribute('target', '_blank');
      await expect(card.locator('[data-video-link]')).toHaveAttribute('rel', /noopener/);

      // 4. Placeholders (2,5,8,11,13): no <img>, thumb aria-label = title
      if (video.kind === 'placeholder') {
        await expect(card.locator('img')).toHaveCount(0);
        await expect(card.locator('[data-video-thumb-link]')).toHaveAttribute('aria-label', video.title);
      } else {
        await expect(card.locator('img[data-video-thumb]')).toHaveAttribute('loading', 'lazy');
        await expect(card.locator('img[data-video-thumb]')).toHaveAttribute('alt', /^Miniatura:/);
      }
    }
  });

  test('TC-2.6 Compare tables content', async ({ page }) => {
    const main = new MainPage(page);
    await main.goto();

    // 1. Exactly 2 table.compare-table with verbatim captions
    const tables = page.locator('table.compare-table');
    await expect(tables).toHaveCount(2);
    await expect(tables.nth(0).locator('caption')).toHaveText('Comparativa: OpenCode vs Claude Code vs Cursor vs Codex');
    await expect(tables.nth(1).locator('caption')).toHaveText('Traducción de estructura: OpenCode vs Claude Code');

    // 2. Table 1: header cells + row "Código abierto" → Sí|No|No|No
    await expect(tables.nth(0).locator('thead th')).toHaveText(['Criterio', 'OpenCode', 'Claude Code', 'Cursor', 'Codex']);
    const row1 = tables.nth(0).locator('tbody tr', { hasText: 'Código abierto' });
    await expect(row1.locator('td')).toHaveText(['Sí', 'No', 'No', 'No']);

    // 3. Table 2: header + row "Reglas del proyecto" contains AGENTS.md / CLAUDE.md
    await expect(tables.nth(1).locator('thead th')).toHaveText(['Función', 'OpenCode', 'Claude Code']);
    const row2 = tables.nth(1).locator('tbody tr', { hasText: 'Reglas del proyecto' });
    await expect(row2.locator('td').nth(0)).toContainText('AGENTS.md');
    await expect(row2.locator('td').nth(1)).toContainText('CLAUDE.md');
  });

  test('TC-2.7 Code blocks + callouts', async ({ page }) => {
    const main = new MainPage(page);
    await main.goto();

    // 1. 7 [data-code-block] with verbatim labels; each has pre > code and a Copiar button
    await expect(page.locator('[data-code-block]')).toHaveCount(7);
    await expect(page.locator('[data-code-block-label]')).toHaveText(CODE_BLOCK_LABELS);
    for (let i = 0; i < 7; i++) {
      const block = page.locator('[data-code-block]').nth(i);
      await expect(block.locator('pre code')).not.toHaveText('');
      await expect(block.locator('[data-copy-button]')).toHaveText('Copiar');
    }

    // 2. Block 3 (opencode.json este repo) content spot-checks
    const block3 = page.locator('[data-code-block]').nth(2).locator('pre');
    await expect(block3).toContainText('"default_agent": "orchestrator"');
    await expect(block3).toContainText('"rm *": "deny"');

    // 3. 3 callouts with verbatim strong texts; callout 2 (warning) icon "!" + opencode.json code
    const callouts = page.locator('[data-callout]');
    await expect(callouts).toHaveCount(3);
    await expect(callouts.nth(0).locator('[data-callout-strong]')).toHaveText('Zen gratis = sin tarjeta.');
    await expect(callouts.nth(1).locator('[data-callout-strong]')).toHaveText('No se edita sin aprobación.');
    await expect(callouts.nth(2).locator('[data-callout-strong]')).toHaveText('Por qué importan:');
    await expect(callouts.nth(1)).toHaveAttribute('data-kind', 'warning');
    await expect(callouts.nth(1).locator('[data-callout-icon]')).toHaveText('!');
    await expect(callouts.nth(1).locator('code').first()).toHaveText('opencode.json');
  });

  test('TC-2.8 Footer', async ({ page }) => {
    const main = new MainPage(page);
    await main.goto();

    // 1. Footer link groups: Videos (4) + Fuentes (3 incl. Declaración de accesibilidad)
    const footerLinks = page.locator('.site-footer a');
    await expect(footerLinks).toHaveCount(7);
    await expect(footerLinks).toHaveText(FOOTER_LINKS);
    await expect(page.locator('.site-footer a[href="accessibility-statement.html"]')).toHaveText('Declaración de accesibilidad');

    // 2. Footer note mentions the authors
    await expect(page.locator('.site-footer__note')).toContainText('MoureDev by Brais Moure');
  });
});