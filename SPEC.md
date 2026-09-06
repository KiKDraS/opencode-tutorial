# SPEC.md — Especificación de contenido

**Estado:** Activo. Cambios: `@orchestrator` → aprobación usuario.

## 1. Identidad

| Campo | Valor |
|---|---|
| Sitio | Documentación educativa: qué es OpenCode y cómo trabajar con él |
| Idioma | 100% español |
| Despliegue | GitHub Pages → `https://KiKDraS.github.io/opencode-tutorial/` (rama `gh-pages`) |
| Audiencia | Devs hispanohablantes, nivel inicial en IA |
| Stack | HTML5 + CSS (lightningcss) + JS ES6 + Vite. Sin frameworks |

## 2. Reglas de contenido (obligatorias)

- Cada dato/afirmación → fuente URL visible (bloque `Fuentes` por sección).
- Vídeos: solo youtubers hispanohablantes. Prioridad: MoureDev > midudev. Otro canal solo si no hay vídeo de ambos. Autoría marcada: canal + título + enlace.
- Sin afiliación/autopromoción. Contenido didáctico neutral.
- Código de ejemplo: real, verificable (bash/JSON/Markdown).
- Este repo (`.opencode/`, `opencode.json`, `AGENTS.md`) = ejemplo vivo en sección 5.

## 3. Estructura del sitio

| # | Sección | Subtemas |
|---|---|---|
| 1 | Fundamentos de LLMs | 1.1 ¿Qué es un LLM? ¿Cómo funciona? · 1.2 ¿Qué es un agente? Agente vs LLM · 1.3 ¿Cómo se mide la inteligencia de un LLM? Qué mirar para elegir modelo · 1.4 ¿Cómo funciona el conteo de tokens? |
| 2 | OpenCode | 2.1 ¿Qué es? vs ClaudeCode \| Cursor \| Codex · 2.2 OpenCode Zen: cuenta + modelos gratuitos · 2.3 Conectar modelos Zen a OpenCode · 2.4 Multi-proveedor |
| 3 | Estructura `.opencode/` | 3.1 Carpetas y uso (intro) · 3.2 vs ClaudeCode (estructura/config) · 3.3 `opencode.json`: qué es, por qué importa |
| 4 | Trabajar con agentes | 4.1 Agente. Plan vs Build · 4.2 Loop prompt → crear → iterar · 4.3 Permisos · 4.4 SPEC.md / AGENTS.md / DESIGN.md · 4.5 Agentes personalizados: primary vs sub-agent · 4.6 Skills · 4.7 Prompts · 4.8 Plugins · 4.9 MCP (4.6–4.9: subtema propio + vs ClaudeCode) |
| 5 | Ejemplo real | Este proyecto: `.opencode/`, `opencode.json`, agentes, flujo |

## 4. Fuentes y vídeos por tema

**Vídeos base (reutilizados en varios temas):**

| ID | Vídeo | Canal | URL | Temas |
|---|---|---|---|---|
| V1 | Curso: Desarrollo con IA — Programa con agentes (3h, 20 lecciones) | MoureDev by Brais Moure | https://youtu.be/H3gH_Fe6xvs | 1.1–1.4, 2.1, 3.1, 3.3, 4.1–4.7, 4.9 |
| V2 | Curso: OpenCode desde cero (2,5h, 20 lecciones) | MoureDev by Brais Moure | https://youtube.com/live/aDJNG_f2C3E | 2.1–2.4, 3.1, 3.3, 4.5, 4.8 |
| V3 | Curso: Cursor desde cero | MoureDev by Brais Moure | https://youtu.be/-YAO3iFbuy0 | 2.1 |
| V4 | Curso: SDD (Spec-Driven Development) + repo hello-sdd | MoureDev by Brais Moure | https://youtube.com/live/5HaOxAAA5qI · https://github.com/mouredev/hello-sdd | 4.2, 4.4 |
| V5 | El fin del VIBE CODING: la realidad de la IA en 2026 | MoureDev by Brais Moure | https://www.youtube.com/watch?v=jresR0hZ_Hs | 4.2 |
| V6 | Curso: Introducción a la IA para Developers (lecciones: LLM, tokens, agentes, Claude Code, MCP, skills) | midudev | https://midu.dev/curso/intro-ia-para-devs/ | 1.1–1.4, 2.1, 3.2, 4.6, 4.9 |
| V7 | ¡Aprende MCP! Para principiantes + primer MCP DESDE CERO | midudev | https://www.youtube.com/watch?v=wnHczxwukYY | 4.9 |
| V8 | Curso Práctico de GPT Codex (instalación, modos, skills, MCP) | Fazt | https://fazt.dev/contenido/curso-practico-gpt-codex-agente-ia | 2.1 (fallback Codex) |

**Fuentes escritas por tema:**

| Tema | Fuentes |
|---|---|
| 1.1 LLM | https://aws.amazon.com/es/what-is/large-language-model/ · https://huggingface.co/learn/agents-course/es/unit1/what-are-llms |
| 1.2 Agente vs LLM | https://huggingface.co/learn/agents-course/es/unit1/ · https://www.anthropic.com/research/building-effective-agents · https://opencode.ai/docs/agents/ |
| 1.3 Medición | https://lmarena.ai/ · https://artificialanalysis.ai/ · https://www.swebench.com/ · https://huggingface.co/spaces/open-llm-leaderboard/open_llm_leaderboard |
| 1.4 Tokens | https://platform.openai.com/tokenizer (navegador) · https://huggingface.co/learn/agents-course/es/unit1/what-are-llms · https://midu.dev/curso/intro-ia-para-devs/ |
| 2.1 OpenCode vs | https://opencode.ai/docs/ · https://docs.claude.com/en/docs/claude-code/overview · https://www.cursor.com/docs · https://openai.com/codex/ (navegador) |
| 2.2 Zen | https://opencode.ai/zen · https://opencode.ai/docs/zen · https://opencode.ai/docs/providers/ |
| 2.3 Conectar Zen | https://opencode.ai/docs/ (sección Configure) · https://opencode.ai/docs/zen/ |
| 2.4 Multi-proveedor | https://opencode.ai/docs/providers/ · https://opencode.ai/docs/models/ |
| 3.1 Estructura | https://opencode.ai/docs/ (nav completa) · este repo `.opencode/` |
| 3.2 vs ClaudeCode | https://docs.claude.com/en/docs/claude-code/memory · https://opencode.ai/docs/rules/ |
| 3.3 opencode.json | https://opencode.ai/docs/config/ · este repo `opencode.json` |
| 4.1 Plan vs Build | https://opencode.ai/docs/ (Plan mode / Tab) · https://opencode.ai/docs/agents/ |
| 4.2 Loop | https://opencode.ai/docs/ (plan → iterar → build → undo) |
| 4.3 Permisos | https://opencode.ai/docs/permissions/ · este repo `opencode.json` bloque `permission` |
| 4.4 SPEC/AGENTS/DESIGN | https://opencode.ai/docs/rules/ · https://github.com/mouredev/hello-sdd · este repo `AGENTS.md` `SPEC.md` `DESIGN.md` |
| 4.5 Agentes | https://opencode.ai/docs/agents/ · este repo `opencode.json` bloque `agent` + `.opencode/agents/*.md` |
| 4.6 Skills | https://opencode.ai/docs/skills/ · https://skills.sh · vs: https://docs.claude.com/en/docs/agents-and-tools/agent-skills/overview |
| 4.7 Prompts | https://opencode.ai/docs/config/ (instrucciones/prompts) · este repo `.opencode/prompts/*.md` · vs: https://docs.claude.com/en/docs/claude-code/slash-commands |
| 4.8 Plugins | https://opencode.ai/docs/plugins/ · este repo `.opencode/plugins/*.js` · vs: https://docs.claude.com/en/docs/claude-code/hooks |
| 4.9 MCP | https://modelcontextprotocol.io/ · https://opencode.ai/docs/mcp-servers/ · vs: https://docs.claude.com/en/docs/claude-code/mcp |
| 5 Ejemplo | Este repo: `AGENTS.md`, `SPEC.md`, `DESIGN.md`, `opencode.json`, `.opencode/` |

## 5. Criterios de aceptación

- Todas las secciones 1–5 presentes, en español.
- Cada sección: bloque `Fuentes` con ≥1 URL + vídeo con autoría (si existe en reglas).
- Comparativas vs ClaudeCode/Cursor/Codex: tabla objetiva (no fanboy).
- WAI: cada sección navegable desde TOC/sidebar.

## 6. Fuera de alcance

- Tutoriales paso a paso de instalación completa (solo intro/conceptos).
- Contenido en inglés. Promoción de servicios de pago (Zen gratis = solo cómo funciona).
