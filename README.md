```
   ___   ____   _____  _   _    ___     ___   ____   _____
  / _ \  |  _ \  | ____| | \ | |  / _ \  / _ \  |  _ \  | ____|
 | | | | | |_) | |  _|   |  \| | | | | || | | | | | | | |  _|
 | |_| | |  __/  | |___  | |\  | | |_| || |_| | | |_| | | |___
  \___/  |_|     |_____| |_| \_|  \___/  \___/  |____/  |_____|

 _____  _   _   _____   ___    ____    ___     _    _
|_   _| | | | | |_   _|  / _ \  |  _ \  |_ _|   / \   | |
  | |   | | | |   | |   | | | | | |_) |  | |   / _ \  | |
  | |   | |_| |   | |   | |_| | |  _ <   | |  / ___ \ | |___
  |_|    \___/    |_|    \___/  |_| \_\  |___| /_/ \_\ |_____|
```

**Educational documentation site: what OpenCode is and how to work with it.**

Web content 100% Spanish. Project files 100% English. Deployed to GitHub Pages.

![Version](https://img.shields.io/badge/version-0.1.0-blue?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=flat-square&logo=playwright&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-F69220?style=flat-square&logo=pnpm&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-222222?style=flat-square&logo=githubpages&logoColor=white)

---

## What is this?

A documentation site that explains, for Spanish-speaking developers:

- **LLM fundamentals** — what an LLM is, agents vs LLMs, how model intelligence
  is measured, how tokens work.
- **OpenCode** — what it is, how it compares to Claude Code / Cursor / Codex,
  OpenCode Zen, multi-provider setup.
- **The `.opencode/` folder** — structure, `opencode.json`, comparison with
  Claude Code.
- **Working with agents** — plan vs build, the prompt/create/iterate loop,
  permissions, SPEC/AGENTS/DESIGN files, custom agents, skills, prompts,
  plugins, MCP.
- **A live example** — this repository's own `.opencode/` and `opencode.json`.

Every section carries its sources and video references (Spanish-speaking
creators, MoureDev first). Content contract: `SPEC.md`. Design contract:
`DESIGN.md`.

## Live site

`pnpm deploy` builds the site and pushes it to the `gh-pages` branch:

https://KiKDraS.github.io/opencode-tutorial/

## Tech Stack

| Concern         | Choice                                                |
| --------------- | ----------------------------------------------------- |
| Bundler         | Vite (`base: "/opencode-tutorial/"` for GitHub Pages) |
| Markup          | Semantic HTML5                                        |
| Styles          | Native CSS via lightningcss, custom properties        |
| Logic           | Vanilla JS (ES6+)                                     |
| Package manager | **pnpm only** (`install` / `run` / `exec` / `dlx`)    |
| E2E             | Playwright                                            |
| Deploy          | `gh-pages` package → `gh-pages` branch                |

No frameworks, no UI libraries.

## Setup

```bash
npm install        # installs deps (postinstall runs scripts/init.mjs)
npm run setup      # codegraph index + Playwright browsers (auto on first load)
npm run dev        # dev server → http://localhost:5173
npm run build      # production build to dist/
```

## Content rules (binding, see SPEC.md)

- Web content: **100% Spanish**. Project files: 100% English.
- Every claim links to a visible source URL (`Sources` block per section).
- Videos: Spanish-speaking youtubers only — priority MoureDev > midudev —
  authorship marked (channel + title + link).
- Design per `DESIGN.md` (documentation aesthetic, WCAG 2.1 AA).

## AI Agent Pipeline

| Agent                       | Role                                                       | Branch Scope                              |
| --------------------------- | ---------------------------------------------------------- | ----------------------------------------- |
| `orchestrator`              | Architecture planning, task delegation, release management | Global decisions (requires user approval) |
| `frontend-dev`              | Builds features across HTML, CSS, and JS layers            | `feature/*`, `hotfix/*`                   |
| `code-review`               | Audits code quality against checklist criteria             | Reviewer authority                        |
| `release-manager`           | PRs, merges, tags, GitHub Pages deploys                    | Remote Git execution                      |
| `playwright-test-planner`   | Explores UI and generates test plans in `specs/`           | Testing phase                             |
| `playwright-test-generator` | Converts test plans to executable `.spec.ts` files         | Testing phase                             |
| `playwright-test-healer`    | Executes tests, debugs, and auto-fixes failures            | Testing phase                             |

Pipeline: plan → build (`@frontend-dev`) → audit (`@code-review`) → QA
(Playwright) → release (`@release-manager`). Merge guard: `@code-review`
`STATUS: APPROVED` + QA pass required before merging to `develop`.

## Git Flow & Release

**main** = production. Merges only from `release/*` / `hotfix/*`. **develop** =
daily integration. All merges via PR. See `AGENTS.md` §Git Flow.

| Type        | From→To       | Naming           |
| ----------- | ------------- | ---------------- |
| `feat/*`    | dev→dev       | `feature/name`   |
| `release/*` | dev→main+dev  | `release/vX.X.X` |
| `hotfix/*`  | main→main+dev | `hotfix/fix`     |

Deploy (GitHub Pages): after release/hotfix merges to `main`, run `pnpm deploy`
— builds and pushes `dist/` to the `gh-pages` branch, site goes live. Pages
source: `gh-pages` branch (enable once in repo settings / via release-manager
API step).

## Integrations & Tooling

| Tool                                                   | Purpose                                       | Configuration                         |
| ------------------------------------------------------ | --------------------------------------------- | ------------------------------------- |
| [Ponytail](https://github.com/DietrichGebert/ponytail) | Minimal diffs, YAGNI, stdlib-first            | Pre-configured (`/ponytail`)          |
| [Codegraph](https://github.com/colbymchenry/codegraph) | SQLite codebase indexing for AI context       | Indexed via `pnpm run setup`          |
| [Playwright](https://playwright.dev)                   | Browser automation and self-healing E2E tests | `playwright.config.ts`                |
| [Context7](https://context7.com)                       | Live documentation for libraries              | Optional; key in `.opencode/secrets/` |
| [gh-pages](https://github.com/tschaub/gh-pages)        | Publish `dist/` to the `gh-pages` branch      | `pnpm deploy`                         |

Secrets: `.opencode/secrets/` (gitignored, loaded via `{file:...}`). See the
README section below for tokens.

## Secrets & Authentication

Configure local secrets in `.opencode/secrets/` (gitignored, loaded at runtime
via `{file:path}`).

| Secret               | Setup Command                                       | Purpose                                                                                            |
| -------------------- | --------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| **Context7 API Key** | `echo "<key>" > .opencode/secrets/context7-api-key` | Optional. Local docs fetching. `"enabled": true` under `"context7"` in `opencode.json`.            |
| **GitHub Token**     | `echo "<token>" > .opencode/secrets/github-token`   | Required by `@release-manager` (PRs, merges, deploys). Fallback: git credentials → `GITHUB_TOKEN`. |

## Troubleshooting

| Issue                                          | Solution                                                                     |
| ---------------------------------------------- | ---------------------------------------------------------------------------- |
| `bad file reference: "{file:...}"`             | Missing file referenced in `opencode.json`; shipped placeholder is committed |
| `opencode.json is not valid JSON`              | Validate: `pnpm dlx jsonlint opencode.json`                                  |
| `browserType.launch: Executable doesn't exist` | Install browsers: `pnpm run setup`                                           |
| MCP server tool unavailable                    | Check `"enabled": true` in `opencode.json` and restart session               |

## License

MIT — see [LICENSE](LICENSE).
