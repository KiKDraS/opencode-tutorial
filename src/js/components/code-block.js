// Code blocks: one delegated copy handler for all blocks, clipboard with
// fallback, aria-live status feedback.

function copyTextToClipboard(text) {
  if (navigator.clipboard?.writeText) {
    return navigator.clipboard.writeText(text);
  }
  // Fallback for non-secure contexts / older browsers.
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.setAttribute("readonly", "");
  textArea.style.position = "fixed";
  textArea.style.opacity = "0";
  document.body.appendChild(textArea);
  textArea.select();
  const copied = document.execCommand("copy");
  textArea.remove();
  return copied ? Promise.resolve() : Promise.reject(new Error("copy failed"));
}

function readBlockCode(block) {
  return block.querySelector("pre")?.textContent ?? "";
}

function createStatus(block) {
  const status = document.createElement("span");
  status.className = "code-status";
  status.setAttribute("role", "status");
  block.appendChild(status);
  return status;
}

function createCopyButton() {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "copy-button";
  button.setAttribute("data-copy-button", "");
  button.textContent = "Copiar";
  return button;
}

function showStatus(status, message) {
  status.textContent = message;
  globalThis.setTimeout(() => {
    status.textContent = "";
  }, 2000);
}

function handleCopyClick(event) {
  const button = event.target.closest("[data-copy-button]");
  if (!button) return;
  const block = button.closest("[data-code-block]");
  const status = block.querySelector(".code-status");
  copyTextToClipboard(readBlockCode(block))
    .then(() => {
      button.setAttribute("aria-pressed", "true");
      showStatus(status, "Copiado al portapapeles");
    })
    .catch(() => {
      showStatus(status, "No se pudo copiar");
    });
}

function wireCopyButton(block) {
  const header = block.querySelector(".code-block__header");
  header?.appendChild(createCopyButton());
  createStatus(block);
}

export function init() {
  const blocks = document.querySelectorAll("[data-code-block]");
  if (blocks.length === 0) return;
  blocks.forEach(wireCopyButton);
  document.addEventListener("click", handleCopyClick);
}