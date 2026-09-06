// Header: theme toggle (auto → light → dark) + sticky shadow on scroll.

const THEME_STORAGE_KEY = "theme";
const THEME_ORDER = ["auto", "light", "dark"];
const SCROLL_SHADOW_THRESHOLD = 8;

function isKnownTheme(value) {
  return THEME_ORDER.includes(value);
}

function readStoredTheme() {
  try {
    return globalThis.localStorage?.getItem(THEME_STORAGE_KEY) ?? "auto";
  } catch {
    return "auto";
  }
}

function storeTheme(theme) {
  try {
    if (theme === "auto") {
      globalThis.localStorage?.removeItem(THEME_STORAGE_KEY);
    } else {
      globalThis.localStorage?.setItem(THEME_STORAGE_KEY, theme);
    }
  } catch {
    // Storage unavailable (private mode): theme still applies for this session.
  }
}

function applyTheme(theme) {
  const root = document.documentElement;
  if (theme === "auto") {
    delete root.dataset.theme;
  } else {
    root.dataset.theme = theme;
  }
  const button = document.querySelector("[data-theme-toggle]");
  button?.setAttribute("aria-label", `Tema: ${theme}`);
}

function nextTheme(currentTheme) {
  const currentIndex = THEME_ORDER.indexOf(currentTheme);
  return THEME_ORDER[(currentIndex + 1) % THEME_ORDER.length];
}

function cycleTheme() {
  const currentTheme = document.documentElement.dataset.theme ?? "auto";
  const theme = nextTheme(currentTheme);
  applyTheme(theme);
  storeTheme(theme);
}

function updateHeaderShadow() {
  const header = document.querySelector(".site-header");
  const isScrolled = globalThis.scrollY > SCROLL_SHADOW_THRESHOLD;
  header?.classList.toggle("is-scrolled", isScrolled);
}

export function init() {
  const themeButton = document.querySelector("[data-theme-toggle]");
  if (!themeButton) return;

  const storedTheme = readStoredTheme();
  const theme = isKnownTheme(storedTheme) ? storedTheme : "auto";
  applyTheme(theme);

  themeButton.addEventListener("click", cycleTheme);

  updateHeaderShadow();
  globalThis.addEventListener("scroll", updateHeaderShadow, { passive: true });

  return () => {
    themeButton.removeEventListener("click", cycleTheme);
    globalThis.removeEventListener("scroll", updateHeaderShadow);
  };
}