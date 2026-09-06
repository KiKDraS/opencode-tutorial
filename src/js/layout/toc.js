// TOC: mobile open/close, scroll-spy with aria-current, smooth anchor scroll.

import { prefersReducedMotion } from "../utils/prefers-reduced-motion.js";

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

function activeProbeY() {
  return globalThis.innerHeight * SPY_PROBE_RATIO;
}

function markActiveHeading() {
  const headings = [...document.querySelectorAll("main h2[id], main h3[id]")];
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

  document.addEventListener("click", handleToggleClick);
  document.addEventListener("click", handleBackdropClick);
  document.addEventListener("keydown", handleKeydown);
  document.addEventListener("click", scrollToHeading);

  const observer = new IntersectionObserver(markActiveHeading, {
    rootMargin: `-${SPY_BAND_TOP}px 0px -80% 0px`,
    threshold: 0,
  });
  document.querySelectorAll("main h2[id], main h3[id]").forEach((heading) => {
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