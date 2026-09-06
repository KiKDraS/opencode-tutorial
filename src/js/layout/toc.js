// TOC: mobile open/close, scroll-spy with aria-current, smooth anchor scroll.

import { prefersReducedMotion } from "../utils/prefers-reduced-motion.js";

const TOC_SECTIONS = [
  {
    href: "#fundamentos",
    label: "1. Fundamentos de LLMs",
    items: [
      { href: "#que-es-un-llm", label: "1.1 ¿Qué es un LLM?" },
      { href: "#agente-vs-llm", label: "1.2 ¿Qué es un agente?" },
      { href: "#medir-inteligencia", label: "1.3 Medir la inteligencia de un LLM" },
      { href: "#conteo-tokens", label: "1.4 Conteo de tokens" },
    ],
  },
  {
    href: "#opencode",
    label: "2. OpenCode",
    items: [
      { href: "#que-es-opencode", label: "2.1 ¿Qué es?" },
      { href: "#opencode-zen", label: "2.2 OpenCode Zen" },
      { href: "#conectar-zen", label: "2.3 Conectar modelos Zen" },
      { href: "#multi-proveedor", label: "2.4 Multi-proveedor" },
    ],
  },
  {
    href: "#estructura-opencode",
    labelParts: [{ text: "3. Estructura " }, { code: ".opencode/" }],
    items: [
      { href: "#carpetas-uso", label: "3.1 Carpetas y uso" },
      { href: "#vs-claude-code", label: "3.2 vs Claude Code" },
      { href: "#opencode-json", label: "3.3 opencode.json" },
    ],
  },
  {
    href: "#agentes",
    label: "4. Trabajar con agentes",
    items: [
      { href: "#plan-vs-build", label: "4.1 Plan vs Build" },
      { href: "#loop-prompt", label: "4.2 Loop prompt → crear → iterar" },
      { href: "#permisos", label: "4.3 Permisos" },
      { href: "#spec-agents-design", label: "4.4 SPEC / AGENTS / DESIGN" },
      { href: "#agentes-personalizados", label: "4.5 Agentes personalizados: primary vs sub-agent" },
      { href: "#skills", label: "4.6 Skills" },
      { href: "#prompts", label: "4.7 Prompts" },
      { href: "#plugins", label: "4.8 Plugins" },
      { href: "#mcp", label: "4.9 MCP" },
    ],
  },
  {
    href: "#ejemplo-real",
    label: "5. Ejemplo real",
    items: [
      { href: "#proyecto-real", label: "5.1 El proyecto" },
      { href: "#flujo-real", label: "5.2 Flujo de trabajo" },
    ],
  },
];

// Group link for section 3 renders an inline <code> (matches the original
// markup); labelParts carries text/code segments, plain labels are strings.
function fillTocLabel(link, label) {
  if (typeof label === "string") {
    link.textContent = label;
    return;
  }
  label.forEach((part) => {
    if (part.code) {
      const codeElement = document.createElement("code");
      codeElement.textContent = part.code;
      link.appendChild(codeElement);
    } else {
      link.appendChild(document.createTextNode(part.text));
    }
  });
}

function renderToc() {
  const groupTemplate = document.getElementById("toc-group-template");
  const itemTemplate = document.getElementById("toc-item-template");
  const tocList = document.querySelector("[data-toc-list]");
  if (!groupTemplate || !itemTemplate || !tocList) return;
  const fragment = document.createDocumentFragment();
  TOC_SECTIONS.forEach((section) => {
    const group = groupTemplate.content.firstElementChild.cloneNode(true);
    const groupLink = group.querySelector("[data-toc-group-link]");
    groupLink.href = section.href;
    fillTocLabel(groupLink, section.label ?? section.labelParts);
    const sublist = group.querySelector("[data-toc-sublist]");
    section.items.forEach((item) => {
      const itemNode = itemTemplate.content.firstElementChild.cloneNode(true);
      const itemLink = itemNode.querySelector("a");
      itemLink.href = item.href;
      itemLink.textContent = item.label;
      sublist.appendChild(itemNode);
    });
    fragment.appendChild(group);
  });
  tocList.appendChild(fragment);
}

function setTocOpen(isOpen) {
  const toc = document.querySelector("[data-toc]");
  const toggleButton = document.querySelector("[data-toc-toggle]");
  const backdrop = document.querySelector("[data-toc-backdrop]");
  toc?.classList.toggle("is-open", isOpen);
  toggleButton?.setAttribute("aria-expanded", String(isOpen));
  backdrop?.classList.toggle("is-visible", isOpen);
  backdrop?.toggleAttribute("hidden", !isOpen);
}

function isTocOpen() {
  return document.querySelector("[data-toc]")?.classList.contains("is-open") ?? false;
}

function handleToggleClick(event) {
  const toggleButton = event.target.closest("[data-toc-toggle]");
  if (!toggleButton) return;
  setTocOpen(!isTocOpen());
}

function handleBackdropClick(event) {
  if (!event.target.closest("[data-toc-backdrop]")) return;
  setTocOpen(false);
}

function handleKeydown(event) {
  if (event.key !== "Escape") return;
  setTocOpen(false);
}

function scrollToHeading(event) {
  const link = event.target.closest("[data-spy-link]");
  if (!link) return;
  const heading = document.querySelector(link.getAttribute("href"));
  if (!heading) return;
  event.preventDefault();
  heading.scrollIntoView({
    behavior: prefersReducedMotion() ? "auto" : "smooth",
    block: "start",
  });
  setTocOpen(false);
}

// h2s carry aria-labelledby ids ("fundamentos-titulo"); links target the
// containing section id ("#fundamentos"). Resolve the link target per heading.
function resolveLinkTargetId(heading) {
  if (heading.tagName === "H2") {
    return heading.parentElement?.id ?? heading.id;
  }
  return heading.id;
}

function revealActiveLink(heading) {
  const targetHref = `#${resolveLinkTargetId(heading)}`;
  document.querySelectorAll("[data-spy-link]").forEach((link) => {
    const isActive = link.getAttribute("href") === targetHref;
    if (isActive) {
      link.setAttribute("aria-current", "true");
      link.scrollIntoView({ block: "nearest" });
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

// Scan-based active detection: the last heading whose top is above the probe
// line wins. O(n) single pass with early break, n = observed headings (≤ ~30).
// IO callbacks (band crossings) trigger the scan; the probe line equals the
// band bottom edge (20% of viewport), so the resting heading's band-entry
// event always counts it — no stale state after a settle.
const SPY_BAND_TOP = 50;
const SPY_PROBE_RATIO = 0.2;
// Spy only headings that are TOC targets. Fuentes h3s (and any other h3
// outside the TOC) would clear aria-current when they cross the probe.
const SPY_HEADINGS_SELECTOR = "main h2[id], main h3[id]:not(.sources h3)";

function activeProbeY() {
  return globalThis.innerHeight * SPY_PROBE_RATIO;
}

function markActiveHeading() {
  const headings = [...document.querySelectorAll(SPY_HEADINGS_SELECTOR)];
  if (headings.length === 0) return;
  const probeY = activeProbeY();
  let activeHeading = headings[0];
  for (const heading of headings) {
    if (heading.getBoundingClientRect().top <= probeY) {
      activeHeading = heading;
    } else {
      break;
    }
  }
  revealActiveLink(activeHeading);
}

export function init() {
  const scrollSpyList = document.querySelector("[data-scrollspy]");
  if (!scrollSpyList) return;

  renderToc();
  document.addEventListener("click", handleToggleClick);
  document.addEventListener("click", handleBackdropClick);
  document.addEventListener("keydown", handleKeydown);
  document.addEventListener("click", scrollToHeading);

  const observer = new IntersectionObserver(markActiveHeading, {
    rootMargin: `-${SPY_BAND_TOP}px 0px -80% 0px`,
    threshold: 0,
  });
  document.querySelectorAll(SPY_HEADINGS_SELECTOR).forEach((heading) => {
    observer.observe(heading);
  });
  markActiveHeading();

  return () => {
    document.removeEventListener("click", handleToggleClick);
    document.removeEventListener("click", handleBackdropClick);
    document.removeEventListener("keydown", handleKeydown);
    document.removeEventListener("click", scrollToHeading);
    observer.disconnect();
  };
}