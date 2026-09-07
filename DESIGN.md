# DESIGN.md — Design Contract

**Status:** Active — all agents MUST comply. Changes: `@orchestrator` → user approval → edit here.

---

## 1. PROJECT IDENTITY & DESIGN PHILOSOPHY

### 1.1 Project Purpose
Educational documentation: what OpenCode is and how to work with it. Problem solved: Spanish-speaking dev who doesn't know what a coding agent is or where to start.

### 1.2 Primary Audience
Spanish-speaking devs, AI beginners. Long-form reading → legibility and navigation first.

### 1.3 Primary Conversion Goal
Reader finishes a section understanding the concept and knowing where to continue (source + video).

### 1.4 Design Philosophy (mandated by `frontend-design`)

| Principle | Project Decision |
|---|---|
| **Aesthetic Direction** | Clean technical documentation (reference: opencode.ai/docs, docs.claude.com). Clarity > spectacle |
| **Typography** | Space Grotesk (display) + Inter (body) + JetBrains Mono (code) |
| **Color Strategy** | Cool neutrals (slate) + indigo accent. High text/background contrast. Light default + auto dark |
| **Layout Approach** | Sticky sidebar TOC (left) + article column (~72ch) + top nav. Mobile: collapsible TOC |
| **Background Treatment** | Flat, subtle section separation (borders, not heavy shadows) |
| **Motion Choreography** | None — no scroll-driven animation. Hover/focus transitions only (short, token-based) |
| **Differentiator** | Traceability: every section ends with `Sources` block (URLs) + video card with authorship |

### 1.5 Brand Assets

| Asset | File | Usage |
|---|---|---|
| Logo (horizontal, RGBA, 783×337) | `src/assets/logo.png` | Header (sticky, left) + footer. Max height 32px header / 24px footer |
| Favicon set | `public/favicon/` (svg, ico, 96×96, apple-touch-icon, webmanifest) | `<head>` icon links. Vite `base: "/opencode-tutorial/"` (GitHub Pages) → served under `/opencode-tutorial/favicon/` |

---

## 2. DESIGN TOKENS

Fill into `src/styles/boilerplate/variables.css`.

### 2.1 Color Palette

| Token | Light Value | Dark Value | Usage |
|-------|-------------|------------|-------|
| `--color-bg` | `#ffffff` | `#0b1220` | Page background |
| `--color-bg-alt` | `#f6f8fa` | `#0f172a` | Alternate sections |
| `--color-bg-elevated` | `#ffffff` | `#111c33` | Cards, code blocks |
| `--color-text` | `#1a202c` | `#e2e8f0` | Primary text |
| `--color-text-muted` | `#64748b` | `#94a3b8` | Secondary text |
| `--color-text-inverse` | `#ffffff` | `#0b1220` | Text on dark backgrounds |
| `--color-primary` | `#4f46e5` | `#818cf8` | Brand dominant |
| `--color-primary-hover` | `#4338ca` | `#a5b4fc` | Brand hover state |
| `--color-primary-active` | `#3730a3` | `#c7d2fe` | Brand active state |
| `--color-accent` | `#0284c7` | `#38bdf8` | Links, CTAs |
| `--color-accent-hover` | `#0369a1` | `#7dd3fc` | Accent hover |
| `--color-border` | `#e2e8f0` | `#1e293b` | Subtle borders |
| `--color-border-strong` | `#cbd5e1` | `#334155` | Emphasized borders |
| `--color-focus` | `#4f46e5` | `#818cf8` | Focus rings |
| `--color-error` | `#dc2626` | — | Error states |
| `--color-success` | `#16a34a` | — | Success states |
| `--color-warning` | `#d97706` | — | Warning states |

**Dark mode:** `@media (prefers-color-scheme: dark) { :root { ... } }`. Override only color tokens.

### 2.2 Typography Scale (use `clamp()` for fluid sizing)

| Token | Value | Font Family |
|-------|-------|-------------|
| `--font-display` | — | Space Grotesk |
| `--font-body` | — | Inter |
| `--font-mono` | — | JetBrains Mono |
| `--font-size-fluid-base` | `clamp(1rem, 0.95rem + 0.25vw, 1.0625rem)` | Base for body |
| `--font-size-display-1` | `clamp(2.25rem, 1.8rem + 2.2vw, 3.5rem)` | H1 |
| `--font-size-display-2` | `clamp(1.75rem, 1.5rem + 1.2vw, 2.25rem)` | H2 |
| `--font-size-display-3` | `clamp(1.375rem, 1.25rem + 0.6vw, 1.625rem)` | H3 |
| `--font-size-heading-1` | `var(--font-size-display-2)` | |
| `--font-size-heading-2` | `var(--font-size-display-3)` | |
| `--font-size-heading-3` | `clamp(1.125rem, 1.05rem + 0.4vw, 1.25rem)` | |
| `--font-size-body` | `var(--font-size-fluid-base)` | |
| `--font-size-body-sm` | `clamp(0.875rem, 0.85rem + 0.15vw, 0.9375rem)` | |
| `--font-size-caption` | `clamp(0.75rem, 0.74rem + 0.1vw, 0.8125rem)` | |
| `--line-height-tight` | `1.2` | Headings |
| `--line-height-base` | `1.6` | Body |
| `--line-height-relaxed` | `1.75` | Long-form |
| `--letter-spacing-tight` | `-0.01em` | |
| `--letter-spacing-normal` | `0` | |
| `--letter-spacing-wide` | `0.08em` | Eyebrows, captions |

**Font files:** TTF/WOFF2 in `src/assets/fonts/`. `@font-face` in `boilerplate/fonts.css`, relative CSS paths. No CDN. OFL license: Space Grotesk, Inter, JetBrains Mono.

### 2.3 Spacing (8px base scale)

| Token | Default |
|-------|---------|
| `--space-1` | `0.25rem` |
| `--space-2` | `0.5rem` |
| `--space-3` | `0.75rem` |
| `--space-4` | `1rem` |
| `--space-5` | `1.5rem` |
| `--space-6` | `2rem` |
| `--space-7` | `3rem` |
| `--space-8` | `4rem` |
| `--space-9` | `6rem` |
| `--space-10` | `8rem` |

### 2.4 Section Dimensions

| Token | Value |
|-------|-------|
| `--container-max` | `1280px` (nav + content) |
| `--container-padding` | `clamp(1rem, 2vw, 2rem)` |
| `--sidebar-width` | `260px` (desktop, sticky) |
| `--reading-max` | `72ch` (article column) |
| `--header-height` | `60px` |
| `--footer-height` | `auto` |

### 2.5 Motion

| Token | Default | Use |
|-------|---------|-----|
| `--duration-fast` | `150ms` | Hover, focus |
| `--duration-base` | `250ms` | Transitions |
| `--ease-standard` | `cubic-bezier(0.4, 0, 0.2, 1)` | UI |
| `--ease-expressive` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Entrances |

Dropped `--duration-slower` + `--ease-spring` + `--duration-slow`: motion policy = minimal, no scroll-driven animation. Reduced motion: `@media (prefers-reduced-motion: reduce)` strips animations/transitions.

- No scroll-driven behavior: no reveal-on-scroll animations, no smooth-scroll hijack. Anchor clicks = native instant jump. JS scrollIntoView/IntersectionObserver banned for page scrolling and entrance effects (scroll-spy may use IO).

### 2.6 Z-Index Scale

| Token | Default | Usage |
|-------|---------|-------|
| `--z-base` | `1` | Base layer |
| `--z-dropdown` | `100` | Dropdown menus |
| `--z-sticky` | `200` | Header, sidebar |
| `--z-modal-backdrop` | `300` | Unused (reserved) |
| `--z-modal` | `400` | Unused (reserved) |
| `--z-toast` | `500` | Unused (reserved) |
| `--z-tooltip` | `600` | Unused (reserved) |

---

## 3. COMPONENT INVENTORY

| Component | Status | CSS File | JS Module |
|-----------|--------|----------|-----------|
| Sticky header (logo.png + section nav + theme toggle) | ☐ Planned | `components/header.css` | `components/header.js` |
| Sidebar TOC (scroll-active, mobile collapsible) | ☐ Planned | `components/toc.css` | `components/toc.js` |
| Article section (heading + content + Sources block) | ☐ Planned | `components/section.css` | — |
| Video card (thumb/embed, title, channel, duration, link) | ☐ Planned | `components/video-card.css` | `components/video-card.js` |
| Sources block (clickable URL list) | ☐ Planned | `components/sources.css` | — |
| Comparison table (vs ClaudeCode/Cursor/Codex) | ☐ Planned | `components/compare-table.css` | — |
| Code block (highlight, copy button) | ☐ Planned | `components/code-block.css` | `components/code-block.js` |
| Callout (note/warning) | ☐ Planned | `components/callout.css` | — |
| Footer (video credits, sources note) | ☐ Planned | `components/footer.css` | — |

Layout: `layout/*.css` (shell grid sidebar+article, breakpoints 1024/768).

## 4. ENFORCEMENT

Binding contract. `@code-review` rejects violations. ACCESSIBILITY: WCAG 2.1 AA mandatory (skill accessibility-wcag). SEO: meta + sitemap + structured data (skill seo).

---

*End of DESIGN.md.*
