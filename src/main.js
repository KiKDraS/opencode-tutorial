// Entry point: init only. Guards each module (skip if its DOM is missing),
// isolates failures so one broken module never blocks the rest.

import { init as initHeader } from "./js/layout/header.js";
import { init as initToc } from "./js/layout/toc.js";
import { init as initVideoCard } from "./js/components/video-card.js";
import { init as initCodeBlock } from "./js/components/code-block.js";
import { init as initReveal } from "./js/components/reveal.js";

const MODULES = [
  ["header", initHeader, "[data-theme-toggle]"],
  ["toc", initToc, "[data-scrollspy]"],
  ["video-card", initVideoCard, "[data-video-thumb]"],
  ["code-block", initCodeBlock, "[data-code-block]"],
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