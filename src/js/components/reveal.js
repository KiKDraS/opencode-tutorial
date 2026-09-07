// Scroll reveal: soft fade-in on sections via IntersectionObserver.
// Skipped under prefers-reduced-motion (content shown immediately).

import { prefersReducedMotion } from "../utils/prefers-reduced-motion.js";

function revealAll(elements) {
  elements.forEach((element) => element.classList.add("is-visible"));
}

export function init() {
  const revealElements = document.querySelectorAll(".reveal");
  if (revealElements.length === 0) return;

  if (prefersReducedMotion()) {
    revealAll(revealElements);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
  );

  revealElements.forEach((element) => observer.observe(element));

  return () => observer.disconnect();
}