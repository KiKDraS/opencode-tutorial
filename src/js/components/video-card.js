// Video cards: template-rendered from data (one clone per card), plus a lazy
// thumbnail enhancer (blur-up over the placeholder background).

// One entry per video, per occurrence (document order across grids).
const V1_BASE = {
  thumbSrc: "https://i.ytimg.com/vi/H3gH_Fe6xvs/hqdefault.jpg",
  thumbAlt: "Miniatura: Aprende a Programar con Agentes de IA desde CERO (Curso Completo Gratis)",
  title: "Aprende a Programar con Agentes de IA desde CERO (Curso Completo Gratis)",
  channel: "MoureDev by Brais Moure",
  url: "https://youtu.be/H3gH_Fe6xvs",
  linkText: "Ver en YouTube",
};
const V1_SHORT_ALT = {
  ...V1_BASE,
  thumbAlt: "Miniatura: Aprende a Programar con Agentes de IA desde CERO",
};
const V2_BASE = {
  thumbSrc: "https://i.ytimg.com/vi/aDJNG_f2C3E/hqdefault.jpg",
  thumbAlt: "Miniatura: Curso completo de OpenCode desde cero",
  title: "Curso completo de OpenCode desde cero: Modelos gratis, Comandos, Agentes y mucho más",
  channel: "MoureDev by Brais Moure",
  url: "https://youtube.com/live/aDJNG_f2C3E",
  linkText: "Ver en YouTube",
};
const V3_BASE = {
  thumbSrc: "https://i.ytimg.com/vi/-YAO3iFbuy0/hqdefault.jpg",
  thumbAlt: "Miniatura: Curso Cursor desde cero",
  title: "Curso: Cursor desde cero",
  channel: "MoureDev by Brais Moure",
  url: "https://youtu.be/-YAO3iFbuy0",
  linkText: "Ver en YouTube",
};
const V4_BASE = {
  placeholder: true,
  placeholderLetter: "F",
  title: "Curso Práctico de GPT Codex (setup, modes, skills, MCP)",
  channel: "Fazt",
  url: "https://fazt.dev/contenido/curso-practico-gpt-codex-agente-ia",
  linkText: "Abrir curso",
};
const V5_BASE = {
  thumbSrc: "https://i.ytimg.com/vi/5HaOxAAA5qI/hqdefault.jpg",
  thumbAlt: "Miniatura: El fin del Vibe Coding: crea software robusto con este método",
  title: "El fin del Vibe Coding: Crea software robusto con este método",
  channel: "MoureDev by Brais Moure",
  url: "https://youtube.com/live/5HaOxAAA5qI",
  linkText: "Ver en YouTube",
};
const V6_BASE = {
  placeholder: true,
  placeholderLetter: "M",
  title: "Curso: Introducción a la IA para Developers (lessons: LLM, tokens, agents, Claude Code, MCP, skills)",
  channel: "midudev",
  url: "https://midu.dev/curso/intro-ia-para-devs/",
  linkText: "Abrir curso",
};
const V7_BASE = {
  thumbSrc: "https://i.ytimg.com/vi/jresR0hZ_Hs/hqdefault.jpg",
  thumbAlt: "Miniatura: El fin del VIBE CODING: la realidad de la IA en 2026",
  title: "El fin del VIBE CODING: la realidad de la IA en 2026",
  channel: "MoureDev by Brais Moure",
  url: "https://www.youtube.com/watch?v=jresR0hZ_Hs",
  linkText: "Ver en YouTube",
};
const V8_BASE = {
  thumbSrc: "https://i.ytimg.com/vi/wnHczxwukYY/hqdefault.jpg",
  thumbAlt: "Miniatura: ¡Aprende MCP! Para principiantes + primer MCP DESDE CERO",
  title: "¡Aprende MCP! Para principiantes + primer MCP DESDE CERO",
  channel: "midudev",
  url: "https://www.youtube.com/watch?v=wnHczxwukYY",
  linkText: "Ver en YouTube",
};

// Grids in document order; each grid maps to one [data-video-grid] container.
const VIDEO_GRIDS = [
  [V1_BASE, V6_BASE],
  [V2_BASE, V3_BASE, V4_BASE],
  [V1_SHORT_ALT, V2_BASE, V6_BASE],
  [V5_BASE, V7_BASE],
  [V6_BASE],
  [V8_BASE, V6_BASE],
  [V1_SHORT_ALT, V2_BASE],
];

function createVideoCard(template, card) {
  const cardNode = template.content.firstElementChild.cloneNode(true);
  const thumbLink = cardNode.querySelector("[data-video-thumb-link]");
  const image = cardNode.querySelector("[data-video-thumb]");
  const placeholder = cardNode.querySelector("[data-video-placeholder]");
  if (card.placeholder) {
    image.remove();
    thumbLink.setAttribute("aria-label", card.title);
    placeholder.textContent = card.placeholderLetter;
    placeholder.hidden = false;
  } else {
    placeholder.remove();
    image.src = card.thumbSrc;
    image.alt = card.thumbAlt;
    image.hidden = false;
  }
  thumbLink.href = card.url;
  const titleLink = cardNode.querySelector("[data-video-title]");
  titleLink.href = card.url;
  titleLink.textContent = card.title;
  cardNode.querySelector("[data-video-channel]").textContent = card.channel;
  const videoLink = cardNode.querySelector("[data-video-link]");
  videoLink.href = card.url;
  videoLink.textContent = card.linkText;
  return cardNode;
}

function renderVideoCards() {
  const template = document.getElementById("video-card-template");
  if (!template) return;
  const grids = document.querySelectorAll("[data-video-grid]");
  if (grids.length === 0) return;
  grids.forEach((grid, gridIndex) => {
    const gridCards = VIDEO_GRIDS[gridIndex];
    if (!gridCards) return;
    const fragment = document.createDocumentFragment();
    gridCards.forEach((card) => fragment.appendChild(createVideoCard(template, card)));
    grid.appendChild(fragment);
  });
}

function isImageLoaded(image) {
  return image.complete && image.naturalWidth > 0;
}

function markLoaded(image) {
  image.classList.add("is-loaded");
}

function wireLazyThumbs() {
  document.querySelectorAll("[data-video-thumb]").forEach((image) => {
    if (isImageLoaded(image)) {
      markLoaded(image);
      return;
    }
    image.addEventListener("load", () => markLoaded(image), { once: true });
  });
}

export function init() {
  const grids = document.querySelectorAll("[data-video-grid]");
  if (grids.length === 0) return;
  renderVideoCards();
  wireLazyThumbs();
}