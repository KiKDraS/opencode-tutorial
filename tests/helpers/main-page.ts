// Shared page object + ground-truth data for the OpenCode Tutorial SPA
// (spec: specs/test-plan-page.md). All strings mirror src/js/layout/toc.js and
// src/js/components/*.js verbatim (verified against the live build 2026-09-06).

import { expect, type Page } from '@playwright/test';

export const APP_PATH = '/opencode-tutorial/';
export const STATEMENT_PATH = '/opencode-tutorial/accessibility-statement.html';

export const NAV_LINKS = [
  { label: 'Fundamentos', href: '#fundamentos' },
  { label: 'OpenCode', href: '#opencode' },
  { label: 'Estructura', href: '#estructura-opencode' },
  { label: 'Agentes', href: '#agentes' },
  { label: 'Ejemplo real', href: '#ejemplo-real' },
];

export const TOC_SECTIONS = [
  {
    href: '#fundamentos',
    label: '1. Fundamentos de LLMs',
    items: [
      { href: '#que-es-un-llm', label: '1.1 ¿Qué es un LLM?' },
      { href: '#agente-vs-llm', label: '1.2 ¿Qué es un agente?' },
      { href: '#medir-inteligencia', label: '1.3 Medir la inteligencia de un LLM' },
      { href: '#conteo-tokens', label: '1.4 Conteo de tokens' },
    ],
  },
  {
    href: '#opencode',
    label: '2. OpenCode',
    items: [
      { href: '#que-es-opencode', label: '2.1 ¿Qué es?' },
      { href: '#opencode-zen', label: '2.2 OpenCode Zen' },
      { href: '#conectar-zen', label: '2.3 Conectar modelos Zen' },
      { href: '#multi-proveedor', label: '2.4 Multi-proveedor' },
    ],
  },
  {
    href: '#estructura-opencode',
    label: '3. Estructura .opencode/',
    items: [
      { href: '#carpetas-uso', label: '3.1 Carpetas y uso' },
      { href: '#vs-claude-code', label: '3.2 vs Claude Code' },
      { href: '#opencode-json', label: '3.3 opencode.json' },
    ],
  },
  {
    href: '#agentes',
    label: '4. Trabajar con agentes',
    items: [
      { href: '#plan-vs-build', label: '4.1 Plan vs Build' },
      { href: '#loop-prompt', label: '4.2 Loop prompt → crear → iterar' },
      { href: '#permisos', label: '4.3 Permisos' },
      { href: '#spec-agents-design', label: '4.4 SPEC / AGENTS / DESIGN' },
      { href: '#agentes-personalizados', label: '4.5 Agentes personalizados: primary vs sub-agent' },
      { href: '#skills', label: '4.6 Skills' },
      { href: '#prompts', label: '4.7 Prompts' },
      { href: '#plugins', label: '4.8 Plugins' },
      { href: '#mcp', label: '4.9 MCP' },
    ],
  },
  {
    href: '#ejemplo-real',
    label: '5. Ejemplo real',
    items: [
      { href: '#proyecto-real', label: '5.1 El proyecto' },
      { href: '#flujo-real', label: '5.2 Flujo de trabajo' },
    ],
  },
];

export const H3_BY_SECTION: Record<string, string[]> = {
  fundamentos: [
    '1.1 ¿Qué es un LLM? ¿Cómo funciona?',
    '1.2 ¿Qué es un agente? Agente vs LLM',
    '1.3 ¿Cómo se mide la inteligencia de un LLM? Qué mirar para elegir modelo',
    '1.4 ¿Cómo funciona el conteo de tokens?',
    'Fuentes',
  ],
  opencode: [
    '2.1 ¿Qué es? vs ClaudeCode | Cursor | Codex',
    '2.2 OpenCode Zen: cuenta y modelos gratuitos',
    '2.3 Conectar modelos Zen a OpenCode',
    '2.4 Multi-proveedor',
    'Fuentes',
  ],
  'estructura-opencode': [
    '3.1 Carpetas y uso',
    '3.2 vs ClaudeCode (estructura/config)',
    '3.3 opencode.json: qué es y por qué importa',
    'Fuentes',
  ],
  agentes: [
    '4.1 Agente. Plan vs Build',
    '4.2 Loop prompt → crear → iterar (y por qué importa)',
    '4.3 Permisos (y por qué importan)',
    '4.4 SPEC.md / AGENTS.md / DESIGN.md (y por qué importan)',
    '4.5 Agentes personalizados: primary vs sub-agent',
    '4.6 Skills (vs Claude Code)',
    '4.7 Prompts (vs Claude Code)',
    '4.8 Plugins (vs Claude Code)',
    '4.9 MCP (vs Claude Code)',
    'Fuentes',
  ],
  'ejemplo-real': ['5.1 El proyecto', '5.2 Flujo de trabajo', 'Fuentes'],
};

export const VIDEO_CARDS: Array<{ title: string; channel: string; kind: 'thumb' | 'placeholder' }> = [
  { title: 'Aprende a Programar con Agentes de IA desde CERO (Curso Completo Gratis)', channel: 'MoureDev by Brais Moure', kind: 'thumb' },
  { title: 'Curso: Introducción a la IA para Developers (lessons: LLM, tokens, agents, Claude Code, MCP, skills)', channel: 'midudev', kind: 'placeholder' },
  { title: 'Curso completo de OpenCode desde cero: Modelos gratis, Comandos, Agentes y mucho más', channel: 'MoureDev by Brais Moure', kind: 'thumb' },
  { title: 'Curso: Cursor desde cero', channel: 'MoureDev by Brais Moure', kind: 'thumb' },
  { title: 'Curso Práctico de GPT Codex (setup, modes, skills, MCP)', channel: 'Fazt', kind: 'placeholder' },
  { title: 'Aprende a Programar con Agentes de IA desde CERO (Curso Completo Gratis)', channel: 'MoureDev by Brais Moure', kind: 'thumb' },
  { title: 'Curso completo de OpenCode desde cero: Modelos gratis, Comandos, Agentes y mucho más', channel: 'MoureDev by Brais Moure', kind: 'thumb' },
  { title: 'Curso: Introducción a la IA para Developers (lessons: LLM, tokens, agents, Claude Code, MCP, skills)', channel: 'midudev', kind: 'placeholder' },
  { title: 'El fin del Vibe Coding: Crea software robusto con este método', channel: 'MoureDev by Brais Moure', kind: 'thumb' },
  { title: 'El fin del VIBE CODING: la realidad de la IA en 2026', channel: 'MoureDev by Brais Moure', kind: 'thumb' },
  { title: 'Curso: Introducción a la IA para Developers (lessons: LLM, tokens, agents, Claude Code, MCP, skills)', channel: 'midudev', kind: 'placeholder' },
  { title: '¡Aprende MCP! Para principiantes + primer MCP DESDE CERO', channel: 'midudev', kind: 'thumb' },
  { title: 'Curso: Introducción a la IA para Developers (lessons: LLM, tokens, agents, Claude Code, MCP, skills)', channel: 'midudev', kind: 'placeholder' },
  { title: 'Aprende a Programar con Agentes de IA desde CERO (Curso Completo Gratis)', channel: 'MoureDev by Brais Moure', kind: 'thumb' },
  { title: 'Curso completo de OpenCode desde cero: Modelos gratis, Comandos, Agentes y mucho más', channel: 'MoureDev by Brais Moure', kind: 'thumb' },
];

export const CODE_BLOCK_LABELS = [
  'terminal',
  'estructura (este repo)',
  'opencode.json (este repo)',
  'opencode.json → permission (este repo)',
  'AGENTS.md (este repo)',
  'opencode.json → agent (este repo)',
  'terminal',
];

export const FOOTER_LINKS = [
  'MoureDev — Curso de agentes de IA',
  'MoureDev — Curso de OpenCode',
  'midudev — Curso: Introducción a la IA para Developers (lessons: LLM, tokens, agents, Claude Code, MCP, skills)',
  'Fazt — Curso práctico de GPT Codex',
  'Documentación de OpenCode',
  'Este repositorio',
  'Declaración de accesibilidad',
];

export const SOURCE_COUNTS: Record<string, number> = {
  fundamentos: 11,
  opencode: 8,
  estructura: 6,
  agentes: 19,
  ejemplo: 6,
};

export const SOURCE_FIRST_ITEMS: Record<string, string> = {
  fundamentos: 'AWS — ¿Qué es un modelo de lenguaje grande (LLM)?',
  opencode: 'OpenCode Docs — documentación oficial',
  estructura: 'OpenCode Docs — navegación completa',
  agentes: 'OpenCode Docs — plan/iterate/build/undo',
  ejemplo: 'Este repositorio — AGENTS.md (flujo git, roles, permisos)',
};

export class MainPage {
  constructor(readonly page: Page) {}

  // Loads the app and waits for the client-side render (subsections, sources,
  // videos, code blocks are rendered by JS at init): 22 content h3s + 5 × Fuentes.
  async goto(): Promise<void> {
    await this.page.goto(APP_PATH);
    await expect(this.page.locator('h1')).toBeVisible();
    await expect(this.page.locator('main h3')).toHaveCount(27);
  }

  get themeToggle() {
    return this.page.locator('[data-theme-toggle]');
  }
  get tocToggle() {
    return this.page.locator('[data-toc-toggle]');
  }
  get toc() {
    return this.page.locator('[data-toc]');
  }
  get tocBackdrop() {
    return this.page.locator('[data-toc-backdrop]');
  }
  get tocLinks() {
    return this.page.locator('[data-toc-list] a');
  }
  get activeTocLink() {
    return this.page.locator('[data-toc-list] a[aria-current="true"]');
  }
  get headerNav() {
    return this.page.locator('nav[aria-label="Navegación principal"]');
  }
  copyButton(blockIndex: number) {
    return this.page.locator('[data-code-block]').nth(blockIndex).locator('[data-copy-button]');
  }
  codeStatus(blockIndex: number) {
    return this.page.locator('[data-code-block]').nth(blockIndex).locator('.code-status');
  }
}

export async function expectThemeState(page: Page, theme: 'auto' | 'light' | 'dark'): Promise<void> {
  await expect(page.locator('[data-theme-toggle]')).toHaveAttribute('aria-label', `Tema: ${theme}`);
  if (theme === 'auto') {
    expect(await page.locator('html').getAttribute('data-theme')).toBeNull();
    expect(await page.evaluate(() => localStorage.getItem('theme'))).toBeNull();
  } else {
    await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
    await expect.poll(() => page.evaluate(() => localStorage.getItem('theme'))).toBe(theme);
  }
}

export async function expectDrawer(page: Page, open: boolean): Promise<void> {
  if (open) {
    await expect(page.locator('[data-toc]')).toHaveClass(/is-open/);
    await expect(page.locator('[data-toc-toggle]')).toHaveAttribute('aria-expanded', 'true');
    await expect(page.locator('[data-toc-backdrop]')).not.toHaveAttribute('hidden', '');
  } else {
    await expect(page.locator('[data-toc]')).not.toHaveClass(/is-open/);
    await expect(page.locator('[data-toc-toggle]')).toHaveAttribute('aria-expanded', 'false');
    await expect(page.locator('[data-toc-backdrop]')).toHaveAttribute('hidden', '');
  }
}

// Scrolls so the heading's top sits at probeRatio × viewport height. The
// scroll-spy probe line is 20 % of the viewport, so 0.15 crosses it reliably.
export async function scrollHeadingToProbe(page: Page, headingId: string, probeRatio = 0.15): Promise<void> {
  await page.evaluate(
    ({ id, ratio }) => {
      const el = document.getElementById(id);
      if (!el) return;
      window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - window.innerHeight * ratio);
    },
    { id: headingId, ratio: probeRatio },
  );
}

export async function headingInView(page: Page, headingId: string, maxRatio = 0.4): Promise<boolean> {
  return page
    .locator(`#${headingId}`)
    .evaluate((el) => {
      const top = el.getBoundingClientRect().top;
      return top >= 0 && top <= window.innerHeight * maxRatio;
    });
}

export interface ConsoleSink {
  errors: string[];
  warnings: string[];
  pageErrors: string[];
  failedRequests: string[];
}

export function collectConsole(page: Page): ConsoleSink {
  const sink: ConsoleSink = { errors: [], warnings: [], pageErrors: [], failedRequests: [] };
  page.on('console', (m) => {
    if (m.type() === 'error') sink.errors.push(m.text());
    if (m.type() === 'warning') sink.warnings.push(m.text());
  });
  page.on('pageerror', (e) => sink.pageErrors.push(e.message));
  page.on('requestfailed', (r) => sink.failedRequests.push(r.url()));
  page.on('response', (r) => {
    if (r.status() >= 400) sink.failedRequests.push(r.url());
  });
  return sink;
}

// allowFavicon: the standalone accessibility-statement.html has no favicon
// links; browsers auto-request /favicon.ico → known 404 (plan finding P2).
export function assertCleanConsole(
  sink: ConsoleSink,
  { allowFavicon = false }: { allowFavicon?: boolean } = {},
): void {
  const filtered = (items: string[]) => items.filter((s) => !(allowFavicon && s.includes('favicon')));
  expect(filtered(sink.errors)).toEqual([]);
  expect(filtered(sink.warnings)).toEqual([]);
  expect(filtered(sink.pageErrors)).toEqual([]);
  expect(filtered(sink.failedRequests)).toEqual([]);
}