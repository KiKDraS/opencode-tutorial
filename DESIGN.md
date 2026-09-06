# DESIGN.md — Contrato de diseño

**Estado:** Activo — todos los agentes DEBEN cumplirlo. Cambios: `@orchestrator` → aprobación usuario → editar aquí.

---

## 1. IDENTIDAD Y FILOSOFÍA DE DISEÑO

### 1.1 Propósito
Documentación educativa: qué es OpenCode y cómo trabajar con él. Resuelve: dev hispanohablante que no sabe qué es un agente de código ni cómo empezar.

### 1.2 Audiencia
Devs hispanohablantes, nivel inicial en IA. Lectura larga → priman legibilidad y navegación.

### 1.3 Objetivo principal
Que el lector termine una sección entendiendo el concepto y sabiendo dónde seguir (fuente + vídeo).

### 1.4 Filosofía (mandato `frontend-design`)

| Principio | Decisión |
|---|---|
| **Dirección estética** | Documentación técnica limpia (referencia: opencode.ai/docs, docs.claude.com). Claridad > espectáculo |
| **Tipografía** | Space Grotesk (display) + Inter (body) + JetBrains Mono (código) |
| **Estrategia de color** | Neutros fríos (slate) + acento índigo. Alto contraste texto/fondo. Modo claro por defecto + oscuro automático |
| **Enfoque de layout** | Sticky sidebar TOC (izq) + columna artículo (~72ch) + nav superior. Móvil: TOC colapsable |
| **Tratamiento de fondo** | Plano, sutil división por secciones (bordes, no sombras pesadas) |
| **Coreografía de movimiento** | Mínima: fade-in suave al hacer scroll (IntersectionObserver). Sin rebotes ni parallax |
| **Diferenciador** | Trazabilidad: cada sección cierra con bloque `Fuentes` (URL) + tarjeta de vídeo con autoría |

---

## 2. DESIGN TOKENS

### 2.1 Paleta

| Token | Light | Dark | Uso |
|---|---|---|---|
| `--color-bg` | `#ffffff` | `#0b1220` | Fondo página |
| `--color-bg-alt` | `#f6f8fa` | `#0f172a` | Secciones alternas |
| `--color-bg-elevated` | `#ffffff` | `#111c33` | Tarjetas, bloques código |
| `--color-text` | `#1a202c` | `#e2e8f0` | Texto principal |
| `--color-text-muted` | `#64748b` | `#94a3b8` | Texto secundario |
| `--color-text-inverse` | `#ffffff` | `#0b1220` | Texto sobre oscuro |
| `--color-primary` | `#4f46e5` | `#818cf8` | Marca dominante |
| `--color-primary-hover` | `#4338ca` | `#a5b4fc` | Hover marca |
| `--color-primary-active` | `#3730a3` | `#c7d2fe` | Active marca |
| `--color-accent` | `#0284c7` | `#38bdf8` | Links, CTA |
| `--color-accent-hover` | `#0369a1` | `#7dd3fc` | Hover accent |
| `--color-border` | `#e2e8f0` | `#1e293b` | Bordes sutiles |
| `--color-border-strong` | `#cbd5e1` | `#334155` | Bordes destacados |
| `--color-focus` | `#4f46e5` | `#818cf8` | Anillos de foco |
| `--color-error` | `#dc2626` | — | Errores |
| `--color-success` | `#16a34a` | — | Éxitos |
| `--color-warning` | `#d97706` | — | Avisos |

Modo oscuro: `@media (prefers-color-scheme: dark) { :root { ... } }`. Solo tokens de color.

### 2.2 Tipografía (fluid con `clamp()`)

| Token | Valor | Fuente |
|---|---|---|
| `--font-display` | Space Grotesk | `src/assets/fonts/` |
| `--font-body` | Inter | `src/assets/fonts/` |
| `--font-mono` | JetBrains Mono | `src/assets/fonts/` |
| `--font-size-fluid-base` | `clamp(1rem, 0.95rem + 0.25vw, 1.0625rem)` | Body |
| `--font-size-display-1` | `clamp(2.25rem, 1.8rem + 2.2vw, 3.5rem)` | H1 |
| `--font-size-display-2` | `clamp(1.75rem, 1.5rem + 1.2vw, 2.25rem)` | H2 |
| `--font-size-display-3` | `clamp(1.375rem, 1.25rem + 0.6vw, 1.625rem)` | H3 |
| `--font-size-heading-1` | `var(--font-size-display-2)` | |
| `--font-size-heading-2` | `var(--font-size-display-3)` | |
| `--font-size-heading-3` | `clamp(1.125rem, 1.05rem + 0.4vw, 1.25rem)` | |
| `--font-size-body` | `var(--font-size-fluid-base)` | |
| `--font-size-body-sm` | `clamp(0.875rem, 0.85rem + 0.15vw, 0.9375rem)` | |
| `--font-size-caption` | `clamp(0.75rem, 0.74rem + 0.1vw, 0.8125rem)` | |
| `--line-height-tight` | `1.2` | Títulos |
| `--line-height-base` | `1.6` | Body |
| `--line-height-relaxed` | `1.75` | Texto largo |
| `--letter-spacing-tight` | `-0.01em` | |
| `--letter-spacing-normal` | `0` | |
| `--letter-spacing-wide` | `0.08em` | Eyebrows, captions |

`@font-face` en `boilerplate/fonts.css`, rutas relativas. Sin CDN. Formatos: woff2 (+ ttf fallback). Licencia OFL: Space Grotesk, Inter, JetBrains Mono.

### 2.3 Espaciado (base 8px)

| Token | Default |
|---|---|
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

### 2.4 Dimensiones de sección

| Token | Valor |
|---|---|
| `--container-max` | `1280px` (nav+contenido) |
| `--container-padding` | `clamp(1rem, 2vw, 2rem)` |
| `--sidebar-width` | `260px` (desktop, sticky) |
| `--reading-max` | `72ch` (columna artículo) |
| `--header-height` | `60px` |
| `--footer-height` | `auto` |

### 2.5 Movimiento

| Token | Default | Uso |
|---|---|---|
| `--duration-fast` | `150ms` | Hover, foco |
| `--duration-base` | `250ms` | Transiciones |
| `--duration-slow` | `400ms` | Reveal scroll |
| `--ease-standard` | `cubic-bezier(0.4, 0, 0.2, 1)` | UI |
| `--ease-expressive` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Entradas |

Reducir: `@media (prefers-reduced-motion: reduce)` → revela sin animación.

### 2.6 Z-Index (defaults)

| Token | Default | Uso |
|---|---|---|
| `--z-base` | `1` | Base |
| `--z-dropdown` | `100` | Menús |
| `--z-sticky` | `200` | Header, sidebar |
| `--z-modal-backdrop` | `300` | — |
| `--z-modal` | `400` | — |
| `--z-toast` | `500` | — |
| `--z-tooltip` | `600` | — |

---

## 3. INVENTARIO DE COMPONENTES

| Componente | Estado | CSS | JS |
|---|---|---|---|
| Header sticky (logo + nav secciones + toggle tema) | ☐ Planned | `components/header.css` | `components/header.js` |
| Sidebar TOC (activo por scroll, colapsable móvil) | ☐ Planned | `components/toc.css` | `components/toc.js` |
| Sección artículo (encabezado + contenido + bloque Fuentes) | ☐ Planned | `components/section.css` | — |
| Tarjeta vídeo (thumb/embed, título, canal, duración, enlace) | ☐ Planned | `components/video-card.css` | `components/video-card.js` |
| Bloque fuentes (lista URLs clicables) | ☐ Planned | `components/sources.css` | — |
| Tabla comparativa (vs ClaudeCode/Cursor/Codex) | ☐ Planned | `components/compare-table.css` | — |
| Bloque código (highlight, botón copiar) | ☐ Planned | `components/code-block.css` | `components/code-block.js` |
| Callout (nota/aviso) | ☐ Planned | `components/callout.css` | — |
| Footer (autores fuentes, créditos vídeo) | ☐ Planned | `components/footer.css` | — |

Layout: `layout/*.css` (grid shell sidebar+article, breakpoints 1024/768).

## 4. CUMPLIMIENTO

Contrato vinculante. `@code-review` rechaza violaciones. ACCESIBILIDAD: WCAG 2.1 AA obligatorio (skill accessibility-wcag). SEO: meta + sitemap + datos estructurados (skill seo).

---

*Fin de DESIGN.md.*
