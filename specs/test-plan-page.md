# Test Plan — OpenCode Tutorial Single Page (feature/page-build)

- **App under test:** Educational docs site (Spanish), Vite dev build.
- **Base URL:** `http://localhost:5173/opencode-tutorial/`
- **Build contract:** `SPEC.md` + `DESIGN.md` (WCAG 2.1 AA, documentation aesthetic).
- **Scope:** Header nav, sidebar TOC (JS-rendered, scroll-spy, mobile drawer), 5 main
  sections, compare tables, video cards, code blocks, callouts, sources, theme toggle,
  copy buttons, accessibility statement page, console cleanliness.
- **Language of plan:** English. **Test data:** exact Spanish strings (verbatim from the
  running build — verified against the live DOM on 2026-09-06).
- **Out of scope:** visual regression screenshots, Lighthouse budgets, cross-browser
  matrix (Chromium is the reference; Firefox/WebKit smoke = optional).
- **Assumption for every scenario:** blank state — fresh browser context, cleared
  `localStorage`, no stored theme, viewport reset to desktop unless stated.

## Verified ground truth (harvested from the live build)

Use these exact strings in assertions; they are stable because content is
data-driven from `src/js/components/*.js` (TOC/sources/subsections/videos/code/callouts)
and static markup in `index.html`.

| Fact | Value |
| --- | --- |
| `<html lang>` | `es` |
| Page title | `OpenCode Tutorial — Agentes de IA para desarrolladores` |
| h1 (hero) | `OpenCode: aprende a trabajar con agentes de IA` + eyebrow `Guía educativa · Español` |
| h2 count / ids | 5 — `fundamentos-titulo`, `opencode-titulo`, `estructura-titulo`, `agentes-titulo`, `ejemplo-titulo` |
| h3 count | 27 (22 content + 5 × `Fuentes`) — no h4+; hierarchy h1→h2→h3, no skips |
| Section ids | `#fundamentos`, `#opencode`, `#estructura-opencode`, `#agentes`, `#ejemplo-real` |
| Header nav links | `Fundamentos`→`#fundamentos`, `OpenCode`→`#opencode`, `Estructura`→`#estructura-opencode`, `Agentes`→`#agentes`, `Ejemplo real`→`#ejemplo-real` (all `data-spy-link`) |
| TOC | 5 groups + 22 items = 27 links; title `Contenido`; group 3 label contains inline `<code>.opencode/</code>` |
| TOC href→target | group hrefs = section ids above; item hrefs = h3 ids (see content map below) |
| Video cards | **15** across 7 grids (`[data-video-grid]`); thumbs `loading="lazy"`; 3 placeholder cards (`aria-label` = title) |
| Sources per section | fundamentos **11**, opencode **8**, estructura **6**, agentes **19**, ejemplo-real **6** (total **50**) |
| Compare tables | 2, both `.compare-table` (self `overflow-x: auto`, `min-width: 640px`); captions below |
| Code blocks | **7**, labels: `terminal`, `estructura (este repo)`, `opencode.json (este repo)`, `opencode.json → permission (este repo)`, `AGENTS.md (este repo)`, `opencode.json → agent (este repo)`, `terminal` |
| Copy buttons | label `Copiar`; success status `Copiado al portapapeles` (transient ~2 s); failure `No se pudo copiar`; `aria-pressed` set true on success |
| Callouts | 3: `Zen gratis = sin tarjeta.`, `No se edita sin aprobación.`, `Por qué importan:` |
| Theme toggle | initial aria-label `Tema: auto`; cycle auto→light→dark; `localStorage` key `theme` (removed on auto); `data-theme` on `<html>` |
| Skip link | `Saltar al contenido principal` → `#main-content`; visible + focus ring (`2px solid rgb(79,70,229)`) on focus |
| Footer | 3 link groups (Videos 4 links / Fuentes 3 links incl. `Declaración de accesibilidad` → `accessibility-statement.html`) |
| A11y statement | title `Declaración de accesibilidad — OpenCode Tutorial`, h1 `Declaración de accesibilidad`, mentions `WCAG` + conformance `AA`, back link `← Volver al inicio` |
| Console | 0 errors / 0 warnings on load and after theme+copy interactions (main page) |

### Heading id ↔ TOC href map (content h3s)

| Section | TOC item label (TOC) | h3 id | h3 title (article, verbatim) |
| --- | --- | --- | --- |
| 1. Fundamentos de LLMs | 1.1 ¿Qué es un LLM? | `que-es-un-llm` | `1.1 ¿Qué es un LLM? ¿Cómo funciona?` |
| | 1.2 ¿Qué es un agente? | `agente-vs-llm` | `1.2 ¿Qué es un agente? Agente vs LLM` |
| | 1.3 Medir la inteligencia de un LLM | `medir-inteligencia` | `1.3 ¿Cómo se mide la inteligencia de un LLM? Qué mirar para elegir modelo` |
| | 1.4 Conteo de tokens | `conteo-tokens` | `1.4 ¿Cómo funciona el conteo de tokens?` |
| 2. OpenCode | 2.1 ¿Qué es? | `que-es-opencode` | `2.1 ¿Qué es? vs ClaudeCode \| Cursor \| Codex` (static) |
| | 2.2 OpenCode Zen | `opencode-zen` | `2.2 OpenCode Zen: cuenta y modelos gratuitos` |
| | 2.3 Conectar modelos Zen | `conectar-zen` | `2.3 Conectar modelos Zen a OpenCode` |
| | 2.4 Multi-proveedor | `multi-proveedor` | `2.4 Multi-proveedor` |
| 3. Estructura `.opencode/` | 3.1 Carpetas y uso | `carpetas-uso` | `3.1 Carpetas y uso` |
| | 3.2 vs Claude Code | `vs-claude-code` | `3.2 vs ClaudeCode (estructura/config)` (static) |
| | 3.3 opencode.json | `opencode-json` | `3.3 opencode.json: qué es y por qué importa` |
| 4. Trabajar con agentes | 4.1 Plan vs Build | `plan-vs-build` | `4.1 Agente. Plan vs Build` |
| | 4.2 Loop prompt → crear → iterar | `loop-prompt` | `4.2 Loop prompt → crear → iterar (y por qué importa)` |
| | 4.3 Permisos | `permisos` | `4.3 Permisos (y por qué importan)` |
| | 4.4 SPEC / AGENTS / DESIGN | `spec-agents-design` | `4.4 SPEC.md / AGENTS.md / DESIGN.md (y por qué importan)` |
| | 4.5 Agentes personalizados: primary vs sub-agent | `agentes-personalizados` | `4.5 Agentes personalizados: primary vs sub-agent` |
| | 4.6 Skills | `skills` | `4.6 Skills (vs Claude Code)` |
| | 4.7 Prompts | `prompts` | `4.7 Prompts (vs Claude Code)` |
| | 4.8 Plugins | `plugins` | `4.8 Plugins (vs Claude Code)` |
| | 4.9 MCP | `mcp` | `4.9 MCP (vs Claude Code)` |
| 5. Ejemplo real | 5.1 El proyecto | `proyecto-real` | `5.1 El proyecto` |
| | 5.2 Flujo de trabajo | `flujo-real` | `5.2 Flujo de trabajo` |

### Video cards — verbatim titles & channels (15, document order)

| # | Title | Channel | Type |
| --- | --- | --- | --- |
| 1 | `Aprende a Programar con Agentes de IA desde CERO (Curso Completo Gratis)` | `MoureDev by Brais Moure` | thumb |
| 2 | `Curso: Introducción a la IA para Developers (lessons: LLM, tokens, agents, Claude Code, MCP, skills)` | `midudev` | placeholder `M` |
| 3 | `Curso completo de OpenCode desde cero: Modelos gratis, Comandos, Agentes y mucho más` | `MoureDev by Brais Moure` | thumb |
| 4 | `Curso: Cursor desde cero` | `MoureDev by Brais Moure` | thumb |
| 5 | `Curso Práctico de GPT Codex (setup, modes, skills, MCP)` | `Fazt` | placeholder `F` |
| 6 | `Aprende a Programar con Agentes de IA desde CERO (Curso Completo Gratis)` | `MoureDev by Brais Moure` | thumb |
| 7 | `Curso completo de OpenCode desde cero: Modelos gratis, Comandos, Agentes y mucho más` | `MoureDev by Brais Moure` | thumb |
| 8 | `Curso: Introducción a la IA para Developers (lessons: LLM, tokens, agents, Claude Code, MCP, skills)` | `midudev` | placeholder `M` |
| 9 | `El fin del Vibe Coding: Crea software robusto con este método` | `MoureDev by Brais Moure` | thumb |
| 10 | `El fin del VIBE CODING: la realidad de la IA en 2026` | `MoureDev by Brais Moure` | thumb |
| 11 | `Curso: Introducción a la IA para Developers (lessons: LLM, tokens, agents, Claude Code, MCP, skills)` | `midudev` | placeholder `M` |
| 12 | `¡Aprende MCP! Para principiantes + primer MCP DESDE CERO` | `midudev` | thumb |
| 13 | `Curso: Introducción a la IA para Developers (lessons: LLM, tokens, agents, Claude Code, MCP, skills)` | `midudev` | placeholder `M` |
| 14 | `Aprende a Programar con Agentes de IA desde CERO (Curso Completo Gratis)` | `MoureDev by Brais Moure` | thumb |
| 15 | `Curso completo de OpenCode desde cero: Modelos gratis, Comandos, Agentes y mucho más` | `MoureDev by Brais Moure` | thumb |

Card link text: `Ver en YouTube` (thumbnails) / `Abrir curso` (placeholders).

### Compare tables (verbatim key cells)

**Table 1** — caption `Comparativa: OpenCode vs Claude Code vs Cursor vs Codex`;
columns `Criterio | OpenCode | Claude Code | Cursor | Codex`. Rows:
`Tipo` (…TUI… / …terminal, propietario / Editor/IDE con IA integrada / Agente de terminal + integración en GitHub),
`Código abierto` (Sí / No / No / No),
`Proveedores de modelo` (Multi: Anthropic, OpenAI, Google, Zen, locales / Anthropic (Claude) / Multi (…) / OpenAI),
`Configuración` (opencode.json + AGENTS.md / settings.json + CLAUDE.md / … / Config por CLI + reglas),
`Modelos gratuitos` (Sí, vía OpenCode Zen / No (suscripción o API) / Prueba limitada / Cuota en planes).

**Table 2** — caption `Traducción de estructura: OpenCode vs Claude Code`;
columns `Función | OpenCode | Claude Code`. Rows:
`Reglas del proyecto` (AGENTS.md (y .opencode/docs/) / CLAUDE.md (memoria del proyecto)),
`Carpeta de configuración` (.opencode/ / .claude/),
`Configuración principal` (opencode.json (permisos, agentes, MCP, plugins) / settings.json (permisos, hooks, MCP)),
`Skills / habilidades` (.opencode/skills/ / .claude/skills/ (agent skills)),
`Comandos personalizados` (.opencode/commands/ / Slash commands).

---

## Suite 1 — Navigation (header nav + TOC anchors)

**TC-1.1 Header nav renders 5 links, all targets exist**
1. Load the page.
2. Locate `nav[aria-label="Navegación principal"]`.
3. Assert link texts `Fundamentos`, `OpenCode`, `Estructura`, `Agentes`, `Ejemplo real`.
4. For each link, assert `href` (`#fundamentos`, `#opencode`, `#estructura-opencode`, `#agentes`, `#ejemplo-real`) resolves to an element in the DOM (sections).

**TC-1.2 TOC renders 5 groups + 22 items with valid hrefs**
1. Load the page.
2. In `aside[data-toc]`, assert group links = `1. Fundamentos de LLMs`, `2. OpenCode`, `3. Estructura .opencode/` (inline `<code>`), `4. Trabajar con agentes`, `5. Ejemplo real`.
3. Assert 22 item links; every TOC link `href` (groups + items) points to an existing element id (see map in ground truth). Use `expect(locator).toHaveAttribute('href')` + `document.querySelector(href)` non-null loop.
4. Assert item texts match the TOC labels column of the map (e.g. `1.4 Conteo de tokens`, `4.9 MCP`).

**TC-1.3 TOC item click scrolls to heading (smooth) and closes drawer**
1. Desktop viewport. Click TOC item `2.2 OpenCode Zen`.
2. Expect: page scrolls so `#opencode-zen` heading top is in view (allow smooth-scroll settle; poll `scrollY`/bounding rect with timeout ≥1 s); URL hash unchanged (smooth-scroll implementation does not set hash — verify current behavior).
3. On mobile viewport (repeat with drawer open): click item → drawer closes (`.is-open` removed, `aria-expanded=false`).
4. Repeat for a deep item `4.9 MCP` and `5.2 Flujo de trabajo`.

**TC-1.4 Header nav link click scrolls to section**
1. Desktop. Click header link `Agentes`.
2. Expect `#agentes` section heading `4. Trabajar con agentes` scrolls into view.
3. Repeat for `Fundamentos` (top).

**TC-1.5 All 22 TOC anchors land on the correct heading (id match sweep)**
1. Load page. For every TOC item href `#x`, resolve `document.getElementById('x')`.
2. Assert the resolved element is an `h3` whose text starts with the TOC label's numbering (e.g. href `#conteo-tokens` → h3 `1.4 ¿Cómo funciona el conteo de tokens?`).

---

## Suite 2 — Content presence (sections, subtopics, videos, tables, sources)

**TC-2.1 All 5 sections render with exact h2s**
1. Assert `main` contains exactly 5 `.article__section` with ids
   `fundamentos, opencode, estructura-opencode, agentes, ejemplo-real`.
2. Assert h2 texts verbatim:
   `1. Fundamentos de LLMs`, `2. OpenCode`, `3. Estructura .opencode/`,
   `4. Trabajar con agentes`, `5. Ejemplo real: este proyecto`.
3. Assert hero h1 text verbatim.

**TC-2.2 All subtopics render (22 h3s) — per-section sweep**
1. Assert the h3 titles of each section equal the verbatim lists in the ground-truth map
   (e.g. section `agentes` contains all 9: `4.1 Agente. Plan vs Build` … `4.9 MCP (vs Claude Code)`).
2. Assert each section ends with an h3 `Fuentes`.

**TC-2.3 Spanish content check**
1. Assert `document.documentElement.lang === "es"` and `<title>` verbatim.
2. Spot-assert Spanish phrases: hero paragraph contains `agente de código abierto que corre en tu terminal`; subsection 1.1 contains `transformador` and `atención`; section 4.3 contains `allow`, `ask`, `deny`.

**TC-2.4 Sources lists — counts and link integrity (50 total)**
1. Assert per-section `ul[data-sources-list] li` counts: 11 / 8 / 6 / 19 / 6.
2. Assert first item of each list (verbatim):
   - fundamentos: `AWS — ¿Qué es un modelo de lenguaje grande (LLM)?`
   - opencode: `OpenCode Docs — documentación oficial`
   - estructura: `OpenCode Docs — navegación completa`
   - agentes: `OpenCode Docs — plan/iterate/build/undo`
   - ejemplo-real: `Este repositorio — AGENTS.md (flujo git, roles, permisos)`
3. Assert every source `<a>` has `target="_blank"` + `rel="noopener noreferrer"` and an `https://` href.

**TC-2.5 Video cards — 15 cards, verbatim titles/channels, links**
1. Assert `.video-card` count = 15 and `[data-video-grid]` count = 7.
2. Assert the 15 titles/channels exactly as the ground-truth table (document order).
3. Assert each card has `data-video-link` text `Ver en YouTube` or `Abrir curso`, href non-empty, `target="_blank"`, `rel` includes `noopener`.
4. Assert placeholder cards (2,5,8,11,13) have no `<img>` and their thumb link `aria-label` equals the card title; thumbnail cards have `<img loading="lazy">` with non-empty `alt` starting `Miniatura:`.

**TC-2.6 Compare tables content**
1. Assert exactly 2 `table.compare-table` with captions verbatim (ground truth).
2. Table 1: assert header cells `Criterio|OpenCode|Claude Code|Cursor|Codex`; assert row `Código abierto` values `Sí|No|No|No`.
3. Table 2: assert header `Función|OpenCode|Claude Code`; assert row `Reglas del proyecto` contains `AGENTS.md` and `CLAUDE.md`.

**TC-2.7 Code blocks + callouts**
1. Assert 7 `[data-code-block]` with labels verbatim (ground truth); each contains `pre > code` non-empty and a `button[data-copy-button]` `Copiar`.
2. Assert code block 3 (`opencode.json (este repo)`) contains `"default_agent": "orchestrator"` and `"rm *": "deny"`.
3. Assert 3 callouts with strong texts verbatim (ground truth); callout 2 (`warning`) icon is `!` and contains `opencode.json` inline code.

**TC-2.8 Footer**
1. Assert footer contains links: `MoureDev — Curso de agentes de IA`, `MoureDev — Curso de OpenCode`, `midudev — Curso: Introducción a la IA para Developers (…)`, `Fazt — Curso práctico de GPT Codex`, `Documentación de OpenCode`, `Este repositorio`, `Declaración de accesibilidad` (href `accessibility-statement.html`).
2. Assert footer note contains `MoureDev by Brais Moure`.

---

## Suite 3 — Theme toggle (auto → light → dark + persistence)

**TC-3.1 Cycle auto → light → dark → auto**
1. Blank state. Assert button aria-label `Tema: auto` and `html` has no `data-theme`.
2. Click once → aria-label `Tema: light`, `html[data-theme="light"]`, `localStorage.theme === "light"`.
3. Click again → `Tema: dark`, `data-theme="dark"`, storage `dark`.
4. Click again → `Tema: auto`, `data-theme` removed, `localStorage` key `theme` removed.

**TC-3.2 Persistence across reload**
1. Click to `dark`. Reload. Assert aria-label `Tema: dark`, `data-theme="dark"`.
2. Click to `auto`, reload, assert back to `Tema: auto` (clean-up verified).

**TC-3.3 No-JS/storage-failure resilience (optional)**
1. In a context with `localStorage` throws (private mode) — theme still applies in-session. Skip if not reproducible in the test env; otherwise assert click still updates `data-theme` with no console error.

---

## Suite 4 — Copy buttons (clipboard + status)

**TC-4.1 Copy success on first code block**
1. Blank state. Assert button label `Copiar`, no `aria-pressed`, `.code-status` empty.
2. Click the copy button of block 1 (`terminal`, the `/connect` instructions).
3. Expect `.code-status` shows `Copiado al portapapeles` (transient ≈2 s — assert immediately after click with default auto-wait; do not poll longer than ~1.5 s) and button `aria-pressed="true"`.
4. Assert `navigator.clipboard.readText()` equals the block's `pre` textContent (startswith `# 1. Instala OpenCode`).
5. After ~2.5 s, assert status text cleared (optional — timing-sensitive).

**TC-4.2 Copy works for every block (7/7)**
1. For each of the 7 blocks: click copy; expect `Copiado al portapapeles`; expect clipboard equals that block's code (spot-check blocks 3 and 5 verbatim: block 3 contains `"$schema": "https://opencode.ai/config.json"`; block 5 contains `# Agent Context`).

**TC-4.3 Clipboard failure path (mock)**
1. Route/override `navigator.clipboard.writeText` to reject (or run non-secure context where fallback `execCommand` fails — mock the rejection).
2. Click copy → status `No se pudo copiar`, no `aria-pressed`.

---

## Suite 5 — TOC scroll-spy (aria-current follows scroll)

> Note: in the interactive planner harness the viewport scroll is pinned by the harness;
> these specs run against a plain Playwright page and must scroll with real input
> (`mouse.wheel` or `locator.scrollIntoViewIfNeeded`), then poll.

**TC-5.1 Active link updates while scrolling**
1. Blank state at top: TOC group `1. Fundamentos de LLMs` has `aria-current="true"`; exactly one `[data-toc-list] a[aria-current="true"]`.
2. Scroll down (wheel) until `2. OpenCode` section h2 crosses the 20 %-viewport probe line (i.e. heading top ≤ `0.2 × innerHeight`). Poll (`expect.poll`, timeout 5 s) until `2. OpenCode` group link carries `aria-current`.
3. Continue to section 5; expect `5. Ejemplo real` active. Note: `Fuentes` h3s are excluded from the spy (no TOC item for them).

**TC-5.2 Item-level activation for deep headings**
1. Scroll so `4.9 MCP` heading top ≤ 20 % viewport → item `4.9 MCP` gets `aria-current="true"` and group `4. Trabajar con agentes` does not.
2. Assert only one link is active at a time.

**TC-5.3 Clicking an active TOC link still scrolls correctly**
1. Click TOC item `3.3 opencode.json` → heading scrolls into view; `aria-current` moves to `3.3 opencode.json` after settle (poll).

---

## Suite 6 — Mobile viewport (390 × 844)

**TC-6.1 TOC hidden by default; toggle opens drawer**
1. Resize to 390×844. Assert `[data-toc]` lacks `.is-open`, `visibility: hidden`, off-canvas (rect left ≥ viewport width); toggle `aria-expanded="false"`; backdrop `[hidden]`.
2. Click `[data-toc-toggle]` → drawer slides in (wait transition ≈600 ms): `.is-open`, `aria-expanded="true"`, rect fully inside viewport (`left ≥ 0`, `right ≤ 390`), backdrop visible (not hidden), TOC links clickable (assert first/last item bounding boxes inside viewport).

**TC-6.2 Escape closes drawer**
1. Open drawer; press `Escape` → `.is-open` removed, `aria-expanded="false"`, backdrop hidden again.

**TC-6.3 Backdrop click closes drawer**
1. Open drawer; click `[data-toc-backdrop]` → drawer closes (same assertions).

**TC-6.4 Content readable; tables self-scroll; **no page-level horizontal overflow (KNOWN DEFECT)****
1. At 390×844, closed drawer: assert main content width ≤ viewport; assert `document.documentElement.scrollWidth` **==** `clientWidth` (**currently FAILS: scrollWidth = 656 vs 390 — the closed off-canvas drawer (`.toc`, `position: fixed; transform: translateX(100%)`) extends the document's scrollable overflow by ~266 px**). Report as defect; success criterion = no horizontal page scroll.
2. Assert `.compare-table` scrolls internally: `table.scrollWidth > table.clientWidth` and `getComputedStyle(table).overflowX === 'auto'`; swipe/scroll table 1 to reveal `Codex` column content (`Cuota en planes`).
3. Assert code blocks scroll horizontally within their own container (`pre` overflow-x auto) and no element except the drawer exceeds viewport width when drawer is closed.

**TC-6.5 Header remains usable at 390 px**
1. Assert logo link + 2 icon buttons visible; header nav links hidden (or collapsed per DESIGN.md) — assert no horizontal overflow contribution from header.

---

## Suite 7 — Accessibility basics (WCAG 2.1 AA)

**TC-7.1 Skip link**
1. Blank state. Press `Tab` → skip link `Saltar al contenido principal` visible (transform translateY(0)) with focus ring `2px solid` (rgb(79,70,229)).
2. Press `Enter` → focus lands on `#main-content` (main element); assert `document.activeElement === main` (or main contains focus), URL hash `#main-content`.

**TC-7.2 Heading hierarchy**
1. Assert exactly 1 `h1`, 5 `h2`, 27 `h3`, zero `h4`+; each `h3` is inside its section `h2` (no level skips).

**TC-7.3 Keyboard navigation & focus visibility**
1. Tab through header: logo → nav links → TOC toggle → theme toggle; assert every interactive element shows a visible focus outline (`:focus-visible` → `outline: 2px solid`), none trapped.
2. Tab into TOC (mobile drawer open): links reachable; Escape closes; focus not trapped.

**TC-7.4 ARIA wiring**
1. Theme button `aria-label` matches current theme (`Tema: auto|light|dark`).
2. TOC toggle `aria-expanded` reflects drawer state; `aria-controls="toc"`.
3. Exactly one TOC link has `aria-current="true"` at any scroll position; attribute value `"true"`.
4. Video placeholder thumb links expose `aria-label` = title; decorative SVGs `aria-hidden="true"`; copy status uses `role="status"`.

**TC-7.5 Reduced motion**
1. Set `page.emulateMedia({ reducedMotion: 'reduce' })` before load.
2. Assert all `.reveal` sections get `.is-visible` immediately on load (no scroll needed), `html` computed `scroll-behavior: auto`, and transitions effectively disabled (`transition-duration ≈ 0.01ms` or no animation).
3. Click TOC item → scroll behavior `auto` (no smooth animation; assert `scrollBehavior` computed style or that scroll settles without animation frames).

**TC-7.6 No-JS fallback (optional)**
1. Load with JS disabled (`javaScriptEnabled: false`): assert all 5 sections + h3s + tables + sources visible (content static in DOM), `.reveal` not hidden (gated on `html.js`).

---

## Suite 8 — Accessibility statement page

**TC-8.1 Page loads with WCAG commitment**
1. Navigate to `/opencode-tutorial/accessibility-statement.html`. Assert title `Declaración de accesibilidad — OpenCode Tutorial`, `lang="es"`, h1 `Declaración de accesibilidad`.
2. Assert body contains `WCAG 2.1 AA` (or `WCAG` + `AA`) and the commitment sentence `OpenCode Tutorial se compromete a hacer su contenido accesible para todas las personas`.
3. Assert back link `← Volver al inicio` returns to the main page (`/opencode-tutorial/`).
4. Known minor: browser auto-request for `/favicon.ico` 404s on the dev server (page has no favicon link) — one console error on THIS page is acceptable/known; do not fail the suite on it (main page must stay clean).

**TC-8.2 Footer link reachability**
1. From the main page footer, click `Declaración de accesibilidad` → lands on the statement page (same URL as TC-8.1).

---

## Suite 9 — Console cleanliness

**TC-9.1 Zero errors/warnings on load (main page)**
1. Fresh context; collect console errors + pageerrors + failed requests (exclude intentional `favicon.ico` on statement page).
2. Load main page → assert 0 errors, 0 warnings, 0 uncaught exceptions, 0 failed resources.

**TC-9.2 Zero errors after full interaction set**
1. Execute: theme cycle ×3, copy button (success), TOC open/close (mobile), Escape, backdrop click, scroll through all 5 sections, footer statement link round-trip.
2. Assert still 0 console errors / warnings / pageerrors.

---

## Known defects / findings (as of 2026-09-06, feature/page-build)

1. **P1 — Horizontal page overflow at mobile widths (closed drawer).** At 390 px with the
   TOC closed, `document.documentElement.scrollWidth` = 656 vs `clientWidth` 390 (+266 px).
   Cause: `.toc` is `position: fixed` translated 100 % off-canvas but still contributes to
   the document's scrollable overflow. Fix candidate: `overflow-x: clip` on `body`/`.page-shell`
   or `visibility` + `translateX(-100%)` with `left: 0`; verify with TC-6.4.
2. **P2 — `/favicon.ico` 404 on the accessibility statement page** (dev + gh-pages root).
   Statement page is standalone static HTML without favicon links; browsers auto-request
   `/favicon.ico` at server root. Fix candidate: add `<link rel="icon" href="/opencode-tutorial/favicon/favicon.ico">` (base-aware). Main page is unaffected (has full favicon set).
3. **P3 — Copy success status is transient (~2 s) and `aria-pressed` never resets.**
   Tests must assert status immediately; consider resetting `aria-pressed` after the timeout if a persistent state is desired (product decision, not a defect).

## Environment notes for testers

- Dev server: `http://localhost:5173/opencode-tutorial/` (Vite, base `/opencode-tutorial/`).
  Run specs against this URL; production runs against `https://KiKDraS.github.io/opencode-tutorial/`.
- Storage isolation: always `context.clearCookies()` + `page.evaluate(() => localStorage.clear())`
  (or fresh context per test) so TC-3.x starts from `auto`.
- Clipboard: grant `clipboard-read`/`clipboard-write` permissions in the test context
  (`context.grantPermissions(['clipboard-read', 'clipboard-write'])`).
- Reduced motion: `page.emulateMedia({ reducedMotion: 'reduce' })` must be set BEFORE
  navigation (reveal.js reads the preference at init).
- Smooth scroll: `html { scroll-behavior: smooth }` (auto under reduced motion); anchor
  assertions need polling with timeouts, not instant reads.
- Harness caveat: in the interactive Playwright-MCP planner session, document scrolling is
  pinned by the harness (programmatic scrolls revert); this does not affect spec execution.