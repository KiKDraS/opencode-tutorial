// Header: theme toggle (light ↔ dark, system default) + sticky shadow on scroll.

const THEME_STORAGE_KEY = "theme";
const SCROLL_SHADOW_THRESHOLD = 8;

function isKnownTheme(value) {
  return value === "light" || value === "dark";
}

function systemTheme() {
  const query = globalThis.matchMedia?.("(prefers-color-scheme: dark)");
  return query?.matches ? "dark" : "light";
}

function readStoredTheme() {
  try {
    const value = globalThis.localStorage?.getItem(THEME_STORAGE_KEY);
    return isKnownTheme(value) ? value : null;
  } catch {
    return null;
  }
}

function storeTheme(theme) {
  try {
    globalThis.localStorage?.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Storage unavailable: theme applies for this session.
  }
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  document.querySelector("[data-theme-toggle]")?.setAttribute(
    "aria-label",
    theme === "dark" ? "Tema: oscuro" : "Tema: claro",
  );
}

function toggleTheme() {
  const current = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
  const next = current === "dark" ? "light" : "dark";
  applyTheme(next);
  storeTheme(next);
}

function updateHeaderShadow() {
  const header = document.querySelector(".site-header");
  const isScrolled = globalThis.scrollY > SCROLL_SHADOW_THRESHOLD;
  header?.classList.toggle("is-scrolled", isScrolled);
}

export function init() {
  const themeButton = document.querySelector("[data-theme-toggle]");
  if (!themeButton) return;

  applyTheme(readStoredTheme() ?? systemTheme());

  themeButton.addEventListener("click", toggleTheme);

  updateHeaderShadow();
  globalThis.addEventListener("scroll", updateHeaderShadow, { passive: true });

  return () => {
    themeButton.removeEventListener("click", toggleTheme);
    globalThis.removeEventListener("scroll", updateHeaderShadow);
  };
}
