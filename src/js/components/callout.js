// Callouts: nota/aviso notices, template-rendered from structured data.
// Body segments carry inline code as { code } entries; text via text nodes.

const CALLOUTS = [
  {
    kind: "note",
    strong: "Zen gratis = sin tarjeta.",
    body: [{ text: "La cuenta gratuita no requiere método de pago." }],
  },
  {
    kind: "warning",
    strong: "No se edita sin aprobación.",
    body: [
      { text: "En este proyecto, " },
      { code: "opencode.json" },
      { text: " es un contrato (SPEC.md §4): los cambios los decide el orquestador con aprobación del usuario, porque de ahí salen permisos y agentes." },
    ],
  },
  {
    kind: "note",
    strong: "Por qué importan:",
    body: [
      { code: '"*": "ask"' },
      { text: " significa que cualquier comando fuera de la lista blanca requiere tu aprobación. Es el límite de daño: un error del agente no puede borrar archivos (" },
      { code: "rm" },
      { text: " denegado) ni ejecutar nada raro sin que tú lo veas." },
    ],
  },
];

function fillCalloutBody(bodyContainer, segments) {
  segments.forEach((segment) => {
    if (segment.code) {
      const codeElement = document.createElement("code");
      codeElement.textContent = segment.code;
      bodyContainer.appendChild(codeElement);
    } else {
      bodyContainer.appendChild(document.createTextNode(segment.text));
    }
  });
}

function createCallout(template, calloutData) {
  const callout = template.content.firstElementChild.cloneNode(true);
  callout.dataset.kind = calloutData.kind;
  callout.querySelector("[data-callout-icon]").textContent =
    calloutData.kind === "warning" ? "!" : "i";
  callout.querySelector("[data-callout-strong]").textContent = calloutData.strong;
  fillCalloutBody(callout.querySelector("[data-callout-body]"), calloutData.body);
  return callout;
}

function renderCallouts() {
  const template = document.getElementById("callout-template");
  if (!template) return;
  const containers = document.querySelectorAll("[data-callout-container]");
  if (containers.length === 0) return;
  containers.forEach((container, index) => {
    const calloutData = CALLOUTS[index];
    if (!calloutData) return;
    container.appendChild(createCallout(template, calloutData));
  });
}

export function init() {
  const containers = document.querySelectorAll("[data-callout-container]");
  if (containers.length === 0) return;
  renderCallouts();
}