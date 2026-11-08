// Code blocks: template-rendered from data (label + code text), one delegated
// copy handler for all blocks, clipboard with fallback, aria-live status.

const CODE_BLOCKS = [
  {
    label: "terminal",
    code: `# 1. Ejecuta OpenCode en tu proyecto
$ opencode

# 2. Dentro de la interfaz, escribe:
/connect

# 3. Elige "OpenCode" (pay-as-you-go) y pega tu API key de Console
# 4. Selecciona un modelo:
/models`,
  },
  {
    label: "estructura (este repo)",
    code: `.opencode/
├── agents/     # definiciones de agentes personalizados (orchestrator, frontend-dev, …)
├── commands/   # comandos personalizados de la interfaz
├── docs/       # documentación interna vinculante (trinity, perf, sync)
├── plugins/    # plugins JS: hooks y lógica de arranque (bootstrap, env-protection, …)
├── prompts/    # prompts globales y por agente (playwright-test-*, …)
├── secrets/    # claves locales (ignoradas por git)
└── skills/     # habilidades reutilizables (accessibility-wcag, seo, playwright, …)`,
  },
  {
    label: "opencode.json (extracto)",
    code: `{
  "$schema": "https://opencode.ai/config.json",
  "instructions": [
    ".opencode/docs/skills-settings-rules.md",
    ".opencode/prompts/agent-knowledge-awareness.md"
  ],
  "permissions": [
    { "action": "shell", "resource": "*", "effect": "ask" },
    { "action": "shell", "resource": "ls *", "effect": "allow" },
    { "action": "shell", "resource": "cat *", "effect": "allow" },
    { "action": "shell", "resource": "git status *", "effect": "allow" },
    { "action": "shell", "resource": "gh pr list *", "effect": "allow" },
    { "action": "shell", "resource": "npm run build *", "effect": "allow" },
    { "action": "shell", "resource": "npx playwright test *", "effect": "allow" },
    { "action": "shell", "resource": "rm *", "effect": "deny" }
  ],
  "plugins": ["@dietrichgebert/ponytail"],
  "mcp": {
    "servers": {
      "context7": {
        "type": "remote",
        "url": "https://mcp.context7.com/mcp",
        "headers": { "CONTEXT7_API_KEY": "{file:.opencode/secrets/context7-api-key}" },
        "disabled": false
      }
    }
  },
  "default_agent": "orchestrator"
}`,
  },
  {
    label: "opencode.json → permissions (extracto)",
    code: `"permissions": [
  { "action": "shell", "resource": "*", "effect": "ask" },
  { "action": "shell", "resource": "ls *", "effect": "allow" },
  { "action": "shell", "resource": "cat *", "effect": "allow" },
  { "action": "shell", "resource": "git status *", "effect": "allow" },
  { "action": "shell", "resource": "gh pr list *", "effect": "allow" },
  { "action": "shell", "resource": "npm run build *", "effect": "allow" },
  { "action": "shell", "resource": "npx playwright test *", "effect": "allow" },
  { "action": "shell", "resource": "rm *", "effect": "deny" }
]`,
  },
  {
    label: "AGENTS.md (este repo)",
    code: `# Agent Context
Goal: **Educational docs site** — what OpenCode is, how to work with it.

## Tech Stack
Bund: Vite | Struct: HTML5 | Style: Native CSS (lightningcss) |
Logic: JS (ES6+)  PM: **pnpm only**

## Dev Rules by Owner
| Area      | Owner           | File                               |
| --------- | --------------- | ---------------------------------- |
| HTML+CSS+JS | @frontend-dev | .opencode/agents/frontend-dev.md |
| Audit     | @code-review    | .opencode/agents/code-review.md    |

## Git Flow
**main**=prod. Merge from \`release/*\`/\`hotfix/*\` only.
**develop**=daily integ. All merges via PR.`,
  },
  {
    label: "opencode.json → agents (este repo)",
    code: `{
  "agents": {
    "orchestrator": {
      "description": "Main orchestrator. Brainstorms, maps architectural blueprints, and executes the sequential development pipeline.",
      "mode": "primary",
      "permissions": [
        { "action": "read", "resource": "*", "effect": "allow" },
        { "action": "subagent", "resource": "*", "effect": "allow" }
      ]
    },
    "frontend-dev": {
      "description": "Consolidated developer sub-agent. Builds cohesive features writing HTML structures, modular styles, and JS interaction in tandem.",
      "mode": "subagent",
      "permissions": [
        { "action": "edit", "resource": "*", "effect": "allow" },
        { "action": "read", "resource": "*", "effect": "allow" },
        { "action": "subagent", "resource": "*", "effect": "allow" }
      ]
    }
  }
}`,
  },
  {
    label: "plugin V2 (extracto)",
    code: `import { Plugin } from "@opencode/plugin"

export default Plugin.define({
  id: "load-rules",
  async setup(ctx) {
    await ctx.session.hook("context", (event) => {
      event.system.push({ type: "text", text: "Reglas del proyecto" })
    })
  },
})`,
  },
  {
    label: "terminal",
    code: `# Instalar dependencias
pnpm install

# Desarrollo local con recarga en caliente
pnpm run dev

# Build de producción (Vite → dist/, con base /opencode-tutorial/)
pnpm run build

# Desplegar: build + publicar la carpeta dist/ en la rama gh-pages
pnpm deploy`,
  },
];

function copyTextToClipboard(text) {
  if (navigator.clipboard?.writeText) {
    return navigator.clipboard.writeText(text);
  }
  // Fallback for non-secure contexts / older browsers.
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.setAttribute("readonly", "");
  textArea.style.position = "fixed";
  textArea.style.opacity = "0";
  document.body.appendChild(textArea);
  textArea.select();
  const copied = document.execCommand("copy");
  textArea.remove();
  return copied ? Promise.resolve() : Promise.reject(new Error("copy failed"));
}

function readBlockCode(block) {
  return block.querySelector("pre")?.textContent ?? "";
}

function createCodeBlock(template, blockData) {
  const block = template.content.firstElementChild.cloneNode(true);
  block.querySelector("[data-code-block-label]").textContent = blockData.label;
  block.querySelector("[data-code-block-content]").textContent = blockData.code;
  return block;
}

function renderCodeBlocks() {
  const template = document.getElementById("code-block-template");
  if (!template) return;
  const containers = document.querySelectorAll("[data-code-block-container]");
  if (containers.length === 0) return;
  containers.forEach((container, index) => {
    const blockData = CODE_BLOCKS[index];
    if (!blockData) return;
    container.appendChild(createCodeBlock(template, blockData));
  });
}

function showStatus(status, message) {
  status.textContent = message;
  globalThis.setTimeout(() => {
    status.textContent = "";
  }, 2000);
}

function handleCopyClick(event) {
  const button = event.target.closest("[data-copy-button]");
  if (!button) return;
  const block = button.closest("[data-code-block]");
  const status = block.querySelector(".code-status");
  copyTextToClipboard(readBlockCode(block))
    .then(() => {
      button.setAttribute("aria-pressed", "true");
      showStatus(status, "Copiado al portapapeles");
    })
    .catch(() => {
      showStatus(status, "No se pudo copiar");
    });
}

export function init() {
  const containers = document.querySelectorAll("[data-code-block-container]");
  if (containers.length === 0) return;
  renderCodeBlocks();
  document.addEventListener("click", handleCopyClick);

  return () => document.removeEventListener("click", handleCopyClick);
}
