// Entry point: init only. Guards each module (skip if its DOM is missing),
// isolates failures so one broken module never blocks the rest.

// Marks JS as active before any module init: reveal styles only apply with JS,
// so no-JS visitors see the content unhidden.
document.documentElement.classList.add("js");

import { init as initHeader } from "./js/layout/header.js";
import { init as initToc } from "./js/layout/toc.js";
import { init as initVideoCard } from "./js/components/video-card.js";
import { init as initCodeBlock } from "./js/components/code-block.js";
import { init as initSources } from "./js/components/sources.js";
import { init as initCallout } from "./js/components/callout.js";
import { init as initReveal } from "./js/components/reveal.js";

const MODULES = [
  ["header", initHeader, "[data-theme-toggle]"],
  ["toc", initToc, "[data-toc-list]"],
  ["video-card", initVideoCard, "[data-video-grid]"],
  ["code-block", initCodeBlock, "[data-code-block-container]"],
  ["sources", initSources, "[data-sources-list]"],
  ["callout", initCallout, "[data-callout-container]"],
  ["reveal", initReveal, ".reveal"],
];

for (const [moduleName, initModule, guardSelector] of MODULES) {
  try {
    if (document.querySelector(guardSelector)) {
      initModule();
    }
  } catch (error) {
    console.error(`[${moduleName}] init failed:`, error);
  }
}