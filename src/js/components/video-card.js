// Video cards: fade thumbnail in when loaded (blur-up over the placeholder
// background). Lazy loading is declarative via loading="lazy" in the markup.

function isImageLoaded(image) {
  return image.complete && image.naturalWidth > 0;
}

function markLoaded(image) {
  image.classList.add("is-loaded");
}

export function init() {
  const thumbnails = document.querySelectorAll("[data-video-thumb]");
  if (thumbnails.length === 0) return;

  thumbnails.forEach((image) => {
    if (isImageLoaded(image)) {
      markLoaded(image);
      return;
    }
    image.addEventListener("load", () => markLoaded(image), { once: true });
  });
}