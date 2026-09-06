// Motion preference helper (WCAG 2.3.3 / reduced motion).

export function prefersReducedMotion() {
  return globalThis.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
}