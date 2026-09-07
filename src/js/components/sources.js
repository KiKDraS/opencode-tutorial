// Sources blocks: per-section traceability lists (SPEC.md §2), rendered from
// data into each section's <ul data-sources-list>.

const SOURCES_BY_SECTION = {
  fundamentos: [
    { url: "https://aws.amazon.com/es/what-is/large-language-model/", title: "AWS — ¿Qué es un modelo de lenguaje grande (LLM)?" },
    { url: "https://huggingface.co/learn/agents-course/es/unit1/what-are-llms", title: "Hugging Face Agents Course — ¿Qué son los LLMs?" },
    { url: "https://huggingface.co/learn/agents-course/es/unit1/", title: "Hugging Face Agents Course — Unidad 1: agentes" },
    { url: "https://www.anthropic.com/research/building-effective-agents", title: "Anthropic — Building Effective Agents" },
    { url: "https://opencode.ai/docs/agents/", title: "OpenCode Docs — Agents" },
    { url: "https://lmarena.ai/", title: "LMArena — arena de modelos" },
    { url: "https://artificialanalysis.ai/", title: "Artificial Analysis — comparativas de modelos" },
    { url: "https://www.swebench.com/", title: "SWE-bench — benchmark de ingeniería de software" },
    { url: "https://huggingface.co/spaces/open-llm-leaderboard/open_llm_leaderboard", title: "Open LLM Leaderboard — Hugging Face" },
    { url: "https://platform.openai.com/tokenizer", title: "OpenAI Tokenizer (demo interactiva)" },
    { url: "https://midu.dev/curso/intro-ia-para-devs/", title: "midudev — Curso: Introducción a la IA para Developers (lessons: LLM, tokens, agents, Claude Code, MCP, skills)" },
  ],
  opencode: [
    { url: "https://opencode.ai/docs/", title: "OpenCode Docs — documentación oficial" },
    { url: "https://docs.claude.com/en/docs/claude-code/overview", title: "Claude Code Docs — overview" },
    { url: "https://www.cursor.com/docs", title: "Cursor Docs" },
    { url: "https://openai.com/codex/", title: "OpenAI Codex" },
    { url: "https://opencode.ai/zen", title: "OpenCode Zen — sitio" },
    { url: "https://opencode.ai/docs/zen", title: "OpenCode Docs — Zen" },
    { url: "https://opencode.ai/docs/providers/", title: "OpenCode Docs — Providers" },
    { url: "https://opencode.ai/docs/models/", title: "OpenCode Docs — Models" },
  ],
  estructura: [
    { url: "https://opencode.ai/docs/", title: "OpenCode Docs — navegación completa" },
    { url: "https://docs.claude.com/en/docs/claude-code/memory", title: "Claude Code Docs — memory (CLAUDE.md)" },
    { url: "https://opencode.ai/docs/rules/", title: "OpenCode Docs — Rules" },
    { url: "https://opencode.ai/docs/config/", title: "OpenCode Docs — Config" },
    { url: "https://github.com/KiKDraS/opencode-tutorial/tree/develop/.opencode", title: "Este repositorio — carpeta .opencode/" },
    { url: "https://github.com/KiKDraS/opencode-tutorial/blob/develop/opencode.json", title: "Este repositorio — opencode.json" },
  ],
  agentes: [
    { url: "https://opencode.ai/docs/", title: "OpenCode Docs — plan/iterate/build/undo" },
    { url: "https://opencode.ai/docs/agents/", title: "OpenCode Docs — Agents" },
    { url: "https://opencode.ai/docs/permissions/", title: "OpenCode Docs — Permissions" },
    { url: "https://opencode.ai/docs/rules/", title: "OpenCode Docs — Rules" },
    { url: "https://opencode.ai/docs/skills/", title: "OpenCode Docs — Skills" },
    { url: "https://skills.sh/", title: "skills.sh — registro de skills" },
    { url: "https://docs.claude.com/en/docs/agents-and-tools/agent-skills/overview", title: "Claude Code Docs — Agent Skills" },
    { url: "https://opencode.ai/docs/config/", title: "OpenCode Docs — Config (instrucciones/prompts)" },
    { url: "https://docs.claude.com/en/docs/claude-code/slash-commands", title: "Claude Code Docs — Slash commands" },
    { url: "https://opencode.ai/docs/plugins/", title: "OpenCode Docs — Plugins" },
    { url: "https://docs.claude.com/en/docs/claude-code/hooks", title: "Claude Code Docs — Hooks" },
    { url: "https://modelcontextprotocol.io/", title: "Model Context Protocol — sitio oficial" },
    { url: "https://opencode.ai/docs/mcp-servers/", title: "OpenCode Docs — MCP servers" },
    { url: "https://docs.claude.com/en/docs/claude-code/mcp", title: "Claude Code Docs — MCP" },
    { url: "https://github.com/mouredev/hello-sdd", title: "MoureDev — hello-sdd (software definido por especificaciones)" },
    { url: "https://github.com/KiKDraS/opencode-tutorial/blob/develop/AGENTS.md", title: "Este repositorio — AGENTS.md" },
    { url: "https://github.com/KiKDraS/opencode-tutorial/blob/develop/SPEC.md", title: "Este repositorio — SPEC.md" },
    { url: "https://github.com/KiKDraS/opencode-tutorial/blob/develop/DESIGN.md", title: "Este repositorio — DESIGN.md" },
    { url: "https://github.com/KiKDraS/opencode-tutorial/blob/develop/opencode.json", title: "Este repositorio — opencode.json" },
  ],
  ejemplo: [
    { url: "https://github.com/KiKDraS/opencode-tutorial/blob/develop/AGENTS.md", title: "Este repositorio — AGENTS.md (flujo git, roles, permisos)" },
    { url: "https://github.com/KiKDraS/opencode-tutorial/blob/develop/SPEC.md", title: "Este repositorio — SPEC.md (contenido y fuentes)" },
    { url: "https://github.com/KiKDraS/opencode-tutorial/blob/develop/DESIGN.md", title: "Este repositorio — DESIGN.md (tokens y componentes)" },
    { url: "https://github.com/KiKDraS/opencode-tutorial/blob/develop/opencode.json", title: "Este repositorio — opencode.json (permisos, agentes, MCP)" },
    { url: "https://github.com/KiKDraS/opencode-tutorial/tree/develop/.opencode", title: "Este repositorio — .opencode/ (agentes, skills, plugins, prompts)" },
    { url: "https://opencode.ai/docs/", title: "OpenCode Docs — documentación oficial" },
  ],
};

function renderSourcesList(template, sectionKey) {
  const list = document.querySelector(`[data-sources="${sectionKey}"]`);
  const sources = SOURCES_BY_SECTION[sectionKey];
  if (!list || !sources) return;
  const fragment = document.createDocumentFragment();
  sources.forEach((source) => {
    const item = template.content.firstElementChild.cloneNode(true);
    const link = item.querySelector("[data-sources-url]");
    link.href = source.url;
    link.textContent = source.title;
    fragment.appendChild(item);
  });
  list.appendChild(fragment);
}

function renderSources() {
  const template = document.getElementById("sources-item-template");
  if (!template) return;
  Object.keys(SOURCES_BY_SECTION).forEach((sectionKey) => {
    renderSourcesList(template, sectionKey);
  });
}

export function init() {
  const sourcesLists = document.querySelector("[data-sources-list]");
  if (!sourcesLists) return;
  renderSources();
}