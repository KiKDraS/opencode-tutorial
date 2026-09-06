# SPEC.md — Content Specification

**Status:** Active. Changes: `@orchestrator` → user approval.

## 1. Identity

| Field | Value |
|---|---|
| Site | Educational documentation: what OpenCode is and how to work with it |
| Site language | 100% Spanish (web content only) |
| Project language | English (this file, DESIGN.md, code, commits) |
| Deploy | GitHub Pages → `https://KiKDraS.github.io/opencode-tutorial/` (`gh-pages` branch) |
| Audience | Spanish-speaking devs, AI beginners |
| Stack | HTML5 + CSS (lightningcss) + JS ES6 + Vite. No frameworks |

## 2. Content Rules (binding)

- Every claim → visible source URL (`Sources` block per section).
- Videos: Spanish-speaking youtubers only. Priority: MoureDev > midudev. Other channel only when neither has one. Authorship marked: channel + title + link.
- No affiliation/self-promotion. Neutral educational content.
- Code samples: real, verifiable (bash/JSON/Markdown).
- Video titles in this spec are real YouTube titles — embed verbatim on site (channel + title + link).
- This repo (`.opencode/`, `opencode.json`, `AGENTS.md`) = live example (section 5).
- Web content: 100% Spanish. Project files: 100% English.

## 3. Site Structure (Spanish names = final site content)

| # | Section (ES, as shown on site) | Subtopics (ES, as shown on site) |
|---|---|---|
| 1 | Fundamentos de LLMs | 1.1 ¿Qué es un LLM? ¿Cómo funciona? · 1.2 ¿Qué es un agente? Agente vs LLM · 1.3 ¿Cómo se mide la inteligencia de un LLM? Qué mirar para elegir modelo · 1.4 ¿Cómo funciona el conteo de tokens? |
| 2 | OpenCode | 2.1 ¿Qué es? vs ClaudeCode \| Cursor \| Codex · 2.2 OpenCode Zen: cuenta + modelos gratuitos · 2.3 Conectar modelos Zen a OpenCode · 2.4 Multi-proveedor |
| 3 | Estructura `.opencode/` | 3.1 Carpetas y uso (intro) · 3.2 vs ClaudeCode (estructura/config) · 3.3 `opencode.json`: qué es, por qué importa |
| 4 | Trabajar con agentes | 4.1 Agente. Plan vs Build · 4.2 Loop prompt → crear → iterar (y por qué importa) · 4.3 Permisos (y por qué importan) · 4.4 SPEC.md / AGENTS.md / DESIGN.md (y por qué importan) · 4.5 Agentes personalizados: primary vs sub-agent · 4.6 Skills · 4.7 Prompts · 4.8 Plugins · 4.9 MCP (4.6–4.9: own subtopic + vs ClaudeCode) |
| 5 | Ejemplo real | This project: `.opencode/`, `opencode.json`, agents, workflow |

## 4. Sources and Videos per Topic

**Base videos (reused across topics):**

| ID | Video | Channel | URL | Topics |
|---|---|---|---|---|
| V1 | Aprende a Programar con Agentes de IA desde CERO (Curso Completo Gratis) — 3h, 20 lessons | MoureDev by Brais Moure | https://youtu.be/H3gH_Fe6xvs | 1.1–1.4, 2.1, 3.1, 3.3, 4.1–4.7, 4.9 |
| V2 | Curso completo de OpenCode desde cero: Modelos gratis, Comandos, Agentes y mucho más — 2.5h, 20 lessons | MoureDev by Brais Moure | https://youtube.com/live/aDJNG_f2C3E | 2.1–2.4, 3.1, 3.3, 4.5, 4.8 |
| V3 | Curso: Cursor desde cero | MoureDev by Brais Moure | https://youtu.be/-YAO3iFbuy0 | 2.1 |
| V4 | El fin del Vibe Coding: Crea software robusto con este método + repo hello-sdd | MoureDev by Brais Moure | https://youtube.com/live/5HaOxAAA5qI · https://github.com/mouredev/hello-sdd | 4.2, 4.4 |
| V5 | El fin del VIBE CODING: la realidad de la IA en 2026 | MoureDev by Brais Moure | https://www.youtube.com/watch?v=jresR0hZ_Hs | 4.2 |
| V6 | Curso: Introducción a la IA para Developers (lessons: LLM, tokens, agents, Claude Code, MCP, skills) | midudev | https://midu.dev/curso/intro-ia-para-devs/ | 1.1–1.4, 2.1, 3.2, 4.6, 4.9 |
| V7 | ¡Aprende MCP! Para principiantes + primer MCP DESDE CERO | midudev | https://www.youtube.com/watch?v=wnHczxwukYY | 4.9 |
| V8 | Curso Práctico de GPT Codex (setup, modes, skills, MCP) | Fazt | https://fazt.dev/contenido/curso-practico-gpt-codex-agente-ia | 2.1 (Codex fallback) |

**Written sources per topic:**

| Topic | Sources |
|---|---|
| 1.1 LLM | https://aws.amazon.com/es/what-is/large-language-model/ · https://huggingface.co/learn/agents-course/es/unit1/what-are-llms |
| 1.2 Agent vs LLM | https://huggingface.co/learn/agents-course/es/unit1/ · https://www.anthropic.com/research/building-effective-agents · https://opencode.ai/docs/agents/ |
| 1.3 Measurement | https://lmarena.ai/ · https://artificialanalysis.ai/ · https://www.swebench.com/ · https://huggingface.co/spaces/open-llm-leaderboard/open_llm_leaderboard |
| 1.4 Tokens | https://platform.openai.com/tokenizer (browser) · https://huggingface.co/learn/agents-course/es/unit1/what-are-llms · https://midu.dev/curso/intro-ia-para-devs/ |
| 2.1 OpenCode vs | https://opencode.ai/docs/ · https://docs.claude.com/en/docs/claude-code/overview · https://www.cursor.com/docs · https://openai.com/codex/ (browser) |
| 2.2 Zen | https://opencode.ai/zen · https://opencode.ai/docs/zen · https://opencode.ai/docs/providers/ |
| 2.3 Connect Zen | https://opencode.ai/docs/ (Configure section) · https://opencode.ai/docs/zen/ |
| 2.4 Multi-provider | https://opencode.ai/docs/providers/ · https://opencode.ai/docs/models/ |
| 3.1 Structure | https://opencode.ai/docs/ (full nav) · this repo `.opencode/` |
| 3.2 vs ClaudeCode | https://docs.claude.com/en/docs/claude-code/memory · https://opencode.ai/docs/rules/ |
| 3.3 opencode.json | https://opencode.ai/docs/config/ · this repo `opencode.json` |
| 4.1 Plan vs Build | https://opencode.ai/docs/ (Plan mode / Tab) · https://opencode.ai/docs/agents/ |
| 4.2 Loop | https://opencode.ai/docs/ (plan → iterate → build → undo) |
| 4.3 Permissions | https://opencode.ai/docs/permissions/ · this repo `opencode.json` `permission` block |
| 4.4 SPEC/AGENTS/DESIGN | https://opencode.ai/docs/rules/ · https://github.com/mouredev/hello-sdd · this repo `AGENTS.md` `SPEC.md` `DESIGN.md` |
| 4.5 Agents | https://opencode.ai/docs/agents/ · this repo `opencode.json` `agent` block + `.opencode/agents/*.md` |
| 4.6 Skills | https://opencode.ai/docs/skills/ · https://skills.sh · vs: https://docs.claude.com/en/docs/agents-and-tools/agent-skills/overview |
| 4.7 Prompts | https://opencode.ai/docs/config/ (instructions/prompts) · this repo `.opencode/prompts/*.md` · vs: https://docs.claude.com/en/docs/claude-code/slash-commands |
| 4.8 Plugins | https://opencode.ai/docs/plugins/ · this repo `.opencode/plugins/*.js` · vs: https://docs.claude.com/en/docs/claude-code/hooks |
| 4.9 MCP | https://modelcontextprotocol.io/ · https://opencode.ai/docs/mcp-servers/ · vs: https://docs.claude.com/en/docs/claude-code/mcp |
| 5 Example | This repo: `AGENTS.md`, `SPEC.md`, `DESIGN.md`, `opencode.json`, `.opencode/` |

## 5. Acceptance Criteria

- All sections 1–5 present, in Spanish on the site.
- Every section: `Sources` block with ≥1 URL + video with authorship (if exists per rules).
- vs ClaudeCode/Cursor/Codex comparisons: objective table (no fanboy).
- Every section reachable from TOC/sidebar.

## 6. Out of Scope

- Full step-by-step install tutorials (intro/concepts only).
- English web content. Paid-service promotion (Zen free = explain how it works only).
