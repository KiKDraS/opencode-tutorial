// Code blocks: template-rendered from data (label + code text), one delegated
// copy handler for all blocks, clipboard with fallback, aria-live status.

const CODE_BLOCKS = [
  {
    label: "terminal",
    code: `# 1. Instala OpenCode y ejecútalo en tu proyecto
$ opencode

# 2. Dentro de la interfaz, escribe:
/connect

# 3. Elige "OpenCode Zen" → se abre el navegador para iniciar sesión
# 4. Vuelve a la terminal y selecciona un modelo de la lista
# Listo: el modelo Zen queda conectado sin claves de API manuales`,
  },
  {
    label: "estructura (este repo)",
    code: `.opencode/
├── agents/     # definiciones de agentes personalizados (orchestrator, frontend-dev, …)
├── commands/   # comandos personalizados de la interfaz
├── docs/       # documentación interna vinculante (trinity, perf, sync)
├── plugins/    # plugins JS: hooks y lógica de arranque (bootstrap, env-protection, …)
├── prompts/    # plantillas de prompt por agente (agent-knowledge-awareness.md, …)
├── secrets/    # claves locales (ignoradas por git)
└── skills/     # habilidades reutilizables (accessibility-wcag, seo, playwright, …)`,
  },
  {
    label: "opencode.json (este repo)",
    code: `{
  "$schema": "https://opencode.ai/config.json",
  "instructions": [".opencode/docs/skills-settings-rules.md"],
  "permission": {
    "bash": {
      "*": "ask",
      "git *": "allow",
      "pnpm *": "allow",
      "rm *": "deny",
      "grep *": "allow"
    }
  },
  "default_agent": "orchestrator",
  "tools": { "playwright*": false }
}`,
  },
  {
    label: "opencode.json → permission (este repo)",
    code: `"permission": {
  "bash": {
    "*": "ask",        // todo comando desconocido pregunta antes
    "git *": "allow",  // git no pregunta
    "pnpm *": "allow", // pnpm no pregunta
    "rm *": "deny",    // rm está prohibido
    "grep *": "allow"  // búsquedas sin pregunta
  }
}`,
  },
  {
    label: "AGENTS.md (este repo)",
    code: `# Agent Context
Goal: **Educational docs site** — what OpenCode is, how to work with it.
Web content 100% Spanish. Project files 100% English.
Deploy: **GitHub Pages** (\`gh-pages\`).

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
    label: "opencode.json → agent (este repo)",
    code: `"agent": {
  "orchestrator": {
    "description": "Main orchestrator. Brainstorms, maps architectural
      blueprints, and executes the sequential development pipeline.",
    "mode": "primary",
    "tools": { "task": true, "read": true },
    "prompt": "{file:.opencode/prompts/agent-knowledge-awareness.md}"
  },
  "frontend-dev": {
    "description": "Consolidated developer sub-agent. Builds cohesive
      features writing HTML structures, modular styles, and JS
      interaction in tandem.",
    "mode": "subagent",
    "tools": { "write": true, "edit": true, "read": true, "task": true },
    "prompt": "{file:.opencode/prompts/agent-knowledge-awareness.md}"
  }
}`,
  },
  {
    label: "terminal",
    code: `# Instalar dependencias (pnpm, no npm)
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