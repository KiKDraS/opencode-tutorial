// Subsections: article__subsection blocks rendered from structured data (one
// clone per subtopic). Slot containers (video/code/callout) are appended after
// the body so their renderers find them at init (positional, document order).
//
// Inline parts: { t: "text"|"strong"|"em"|"code"|"link", v, href?, children? }.
// children carries nested inline parts (strong > code in list headings).

const SUBSECTIONS = {
  fundamentos: [
    {
      id: "que-es-un-llm",
      title: "1.1 ¿Qué es un LLM? ¿Cómo funciona?",
      blocks: [
        {
          type: "p",
          inline: [
            { t: "text", v: "Un " },
            { t: "strong", v: "LLM" },
            { t: "text", v: " (" },
            { t: "em", v: "large language model" },
            {
              t: "text",
              v: ", «modelo de lenguaje grande») es un programa de aprendizaje automático entrenado con enormes cantidades de texto. Su tarea básica es predecir la siguiente pieza de texto —un token— a partir de lo que ya vio; al repetir esa predicción una y otra vez, genera respuestas completas.",
            },
          ],
        },
        {
          type: "p",
          inline: [
            { t: "text", v: "El mecanismo central es el " },
            { t: "strong", v: "transformador" },
            { t: "text", v: ", un tipo de red neuronal diseñado para procesar texto. Su mecanismo de " },
            { t: "strong", v: "atención" },
            {
              t: "text",
              v: " pondera qué palabras del contexto son relevantes para predecir la siguiente. El modelo no «piensa» ni «entiende» como una persona: reconoce patrones estadísticos aprendidos durante el entrenamiento. Después del entrenamiento inicial, se ajusta con instrucciones y retroalimentación humana. Así aprende a seguir indicaciones de forma útil.",
            },
          ],
        },
        {
          type: "ul",
          items: [
            [{ t: "text", v: "Entrada y salida: texto (o tokens de texto)." }],
            [{ t: "text", v: "Base: red neuronal de tipo transformador." }],
            [
              {
                t: "text",
                v: "Ajuste: entrenamiento + alineación con instrucciones.",
              },
            ],
          ],
        },
      ],
    },
    {
      id: "agente-vs-llm",
      title: "1.2 ¿Qué es un agente? Agente vs LLM",
      blocks: [
        {
          type: "p",
          inline: [
            { t: "text", v: "El LLM es el " },
            { t: "strong", v: "motor de texto" },
            { t: "text", v: ": recibe un prompt (tu instrucción) y devuelve texto. Un " },
            { t: "strong", v: "agente" },
            { t: "text", v: " es ese LLM " },
            { t: "em", v: "más" },
            {
              t: "text",
              v: " herramientas y un bucle de trabajo. Puede leer y escribir archivos, ejecutar comandos, consultar la web y decidir qué hacer con el resultado.",
            },
          ],
        },
        {
          type: "p",
          inline: [
            { t: "text", v: "La diferencia práctica, en un ciclo simple:" },
          ],
        },
        {
          type: "ul",
          items: [
            [
              { t: "strong", v: "LLM solo:" },
              {
                t: "text",
                v: " contesta preguntas con su conocimiento estático.",
              },
            ],
            [
              { t: "strong", v: "Agente:" },
              {
                t: "text",
                v: " observa tu proyecto, ejecuta acciones (editar, probar, buscar) y ajusta su plan según lo que encuentra.",
              },
            ],
          ],
        },
        {
          type: "p",
          inline: [
            { t: "text", v: "OpenCode es un " },
            { t: "strong", v: "agente" },
            {
              t: "text",
              v: ": usa uno o varios LLMs como cerebro y les añade acceso al sistema de archivos, terminal, navegador y herramientas de desarrollo. Ese patrón —«LLM + herramientas + bucle»— está documentado en la guía de Anthropic sobre agentes efectivos y en el curso de agentes de Hugging Face.",
            },
          ],
        },
      ],
    },
    {
      id: "medir-inteligencia",
      title:
        "1.3 ¿Cómo se mide la inteligencia de un LLM? Qué mirar para elegir modelo",
      blocks: [
        {
          type: "p",
          inline: [
            { t: "text", v: "No existe una única medida. Se combinan " },
            { t: "strong", v: "benchmarks" },
            { t: "text", v: " (pruebas estandarizadas que comparan modelos) y criterios prácticos:" },
          ],
        },
        {
          type: "ul",
          items: [
            [
              { t: "strong", v: "LMArena:" },
              {
                t: "text",
                v: " votación humana comparando respuestas de dos modelos a ciegas. Mide preferencia percibida, no exactitud.",
              },
            ],
            [
              { t: "strong", v: "Artificial Analysis:" },
              {
                t: "text",
                v: " comparativas independientes de calidad, velocidad (tokens por segundo) y precio por millón de tokens.",
              },
            ],
            [
              { t: "strong", v: "SWE-bench:" },
              {
                t: "text",
                v: " resuelve incidencias reales de repositorios de software. Muy relevante si vas a usar el modelo para programar.",
              },
            ],
            [
              { t: "strong", v: "Open LLM Leaderboard (Hugging Face):" },
              {
                t: "text",
                v: " tablas de benchmarks abiertos para modelos, incluidos los de código abierto.",
              },
            ],
          ],
        },
        {
          type: "p",
          inline: [
            {
              t: "text",
              v: "Para elegir modelo en un agente como OpenCode, mira:",
            },
          ],
        },
        {
          type: "ul",
          items: [
            [
              { t: "strong", v: "Calidad" },
              {
                t: "text",
                v: " en tareas de código (SWE-bench) y conversación.",
              },
            ],
            [
              { t: "strong", v: "Velocidad" },
              {
                t: "text",
                v: ": tokens por segundo. Afecta el tiempo de cada iteración.",
              },
            ],
            [
              { t: "strong", v: "Ventana de contexto" },
              { t: "text", v: ": cuánto texto (código o prompt) cabe de una vez." },
            ],
            [
              { t: "strong", v: "Costo" },
              {
                t: "text",
                v: ": precio por millón de tokens de entrada y salida.",
              },
            ],
            [
              { t: "strong", v: "Disponibilidad" },
              { t: "text", v: " en tu proveedor (OpenCode permite varios)." },
            ],
          ],
        },
      ],
    },
    {
      id: "conteo-tokens",
      title: "1.4 ¿Cómo funciona el conteo de tokens?",
      blocks: [
        {
          type: "p",
          inline: [
            {
              t: "text",
              v: "Los modelos no leen caracteres: dividen el texto en ",
            },
            { t: "strong", v: "tokens" },
            {
              t: "text",
              v: ". Un token es una unidad que puede ser una palabra completa, un fragmento de palabra o un signo. Como regla general, un token equivale a unas ",
            },
            { t: "strong", v: "4 letras" },
            {
              t: "text",
              v: " en inglés (menos en español por su morfología) y a menos de una palabra promedio.",
            },
          ],
        },
        {
          type: "p",
          inline: [
            { t: "text", v: "El " },
            { t: "strong", v: "tokenizador" },
            {
              t: "text",
              v: " es la pieza que hace esa división. Es específico de cada modelo. El conteo importa por tres motivos:",
            },
          ],
        },
        {
          type: "ul",
          items: [
            [
              { t: "strong", v: "Contexto:" },
              {
                t: "text",
                v: " la ventana del modelo se mide en tokens (entrada + salida).",
              },
            ],
            [
              { t: "strong", v: "Costo:" },
              { t: "text", v: " los proveedores cobran por token procesado." },
            ],
            [
              { t: "strong", v: "Rendimiento:" },
              { t: "text", v: " a más tokens, más lenta y cara cada llamada." },
            ],
          ],
        },
        {
          type: "p",
          inline: [
            {
              t: "text",
              v: "Puedes probar la división en el tokenizador interactivo de OpenAI. El curso de midudev explica el concepto con ejemplos para desarrolladores.",
            },
          ],
        },
      ],
    },
  ],

  opencode: [
    {
      id: "opencode-zen",
      title: "2.2 OpenCode Console: cuenta y modelos gratuitos",
      blocks: [
        {
          type: "p",
          inline: [
            { t: "strong", v: "OpenCode Console" },
            {
              t: "text",
              v: " es el catálogo y gateway de modelos de OpenCode. Creas una cuenta y generas una API key; con ella usas modelos de varios proveedores desde un solo servicio. Parte del catálogo es gratuita por tiempo limitado y el resto se paga por uso.",
            },
          ],
        },
        {
          type: "p",
          inline: [
            {
              t: "text",
              v: "La documentación oficial lista los modelos y precios vigentes.",
            },
          ],
        },
      ],
      slots: [{ kind: "callout", calloutKey: "zen-gratis" }],
    },
    {
      id: "conectar-zen",
      title: "2.3 Conectar modelos de Console a OpenCode",
      blocks: [
        {
          type: "p",
          inline: [
            { t: "text", v: "Dentro de la interfaz de OpenCode, el comando " },
            { t: "code", v: "/connect" },
            {
              t: "text",
              v: " abre el asistente de conexión. Elige el proveedor OpenCode (pay-as-you-go), pega tu API key de Console y selecciona un modelo con ",
            },
            { t: "code", v: "/models" },
            { t: "text", v: ". El flujo completo:" },
          ],
        },
      ],
      slots: [{ kind: "code", codeKey: "conectar-zen" }],
    },
    {
      id: "multi-proveedor",
      title: "2.4 Multi-proveedor",
      blocks: [
        {
          type: "p",
          inline: [
            {
              t: "text",
              v: "OpenCode no está atado a un solo proveedor. Puedes usar ",
            },
            { t: "strong", v: "varios a la vez" },
            { t: "text", v: " y elegir cuál responde cada tarea:" },
          ],
        },
        {
          type: "ul",
          items: [
            [
              { t: "strong", v: "OpenCode Console:" },
              { t: "text", v: " modelos gratuitos por tiempo limitado y pago por uso." },
            ],
            [
              { t: "strong", v: "Anthropic / OpenAI / Google:" },
              { t: "text", v: " tus claves de API, con " },
              { t: "code", v: "opencode auth login" },
              { t: "text", v: " o " },
              { t: "code", v: "/connect" },
              { t: "text", v: "." },
            ],
            [
              { t: "strong", v: "Modelos locales:" },
              { t: "text", v: " Ollama, LM Studio o vLLM." },
            ],
            [
              { t: "strong", v: "Proveedores compatibles:" },
              {
                t: "text",
                v: " la lista completa está en la documentación de providers y models.",
              },
            ],
          ],
        },
        {
          type: "p",
          inline: [
            {
              t: "text",
              v: "La selección de modelo por defecto y por tarea se configura en ",
            },
            { t: "code", v: "opencode.json" },
            { t: "text", v: " (sección 3.3)." },
          ],
        },
      ],
    },
    {
      id: "cambios-v2",
      title: "2.5 Qué cambia en OpenCode V2",
      blocks: [
        {
          type: "p",
          inline: [
            {
              t: "text",
              v: "OpenCode V2 mantiene compatibilidad con la configuración de V1. Esta guía usa la forma nativa de V2; los campos de V1 aparecen solo cuando hace falta explicar la migración.",
            },
          ],
        },
        {
          type: "ul",
          items: [
            [
              { t: "strong", v: "Instalación:" },
              { t: "text", v: " el instalador de V2 reemplaza el binario de V1 (" },
              { t: "code", v: "curl -fsSL https://opencode.ai/v2/install | bash" },
              { t: "text", v: "). También hay paquetes para instalar V2." },
            ],
            [
              { t: "strong", v: "Superficies:" },
              { t: "text", v: " TUI, escritorio y web. La web se abre con " },
              { t: "code", v: "opencode pair" },
              { t: "text", v: "." },
            ],
            [
              { t: "strong", v: "Permisos:" },
              { t: "text", v: " " },
              { t: "code", v: "permissions" },
              { t: "text", v: " es una lista ordenada y la última regla que coincide gana. Los nombres cambian: " },
              { t: "code", v: "bash" },
              { t: "text", v: " → " },
              { t: "code", v: "shell" },
              { t: "text", v: ", " },
              { t: "code", v: "task" },
              { t: "text", v: " → " },
              { t: "code", v: "subagent" },
              { t: "text", v: ", " },
              { t: "code", v: "write" },
              { t: "text", v: " y " },
              { t: "code", v: "patch" },
              { t: "text", v: " → " },
              { t: "code", v: "edit" },
              { t: "text", v: "." },
            ],
            [
              { t: "strong", v: "Plugins:" },
              { t: "text", v: " API nueva con " },
              { t: "code", v: "Plugin.define" },
              { t: "text", v: " y " },
              { t: "code", v: "setup(ctx)" },
              { t: "text", v: ". Los plugins de V1 no se ejecutan en V2. La clave de configuración pasa de " },
              { t: "code", v: "plugin" },
              { t: "text", v: " a " },
              { t: "code", v: "plugins" },
              { t: "text", v: "." },
            ],
            [
              { t: "strong", v: "MCP:" },
              { t: "text", v: " los servidores viven en " },
              { t: "code", v: "mcp.servers" },
              { t: "text", v: " y " },
              { t: "code", v: "enabled" },
              { t: "text", v: " se sustituye por " },
              { t: "code", v: "disabled" },
              { t: "text", v: "." },
            ],
            [
              { t: "strong", v: "API y clientes:" },
              {
                t: "text",
                v: " cambio incompatible. Solo afecta a integraciones que llaman al servidor de OpenCode.",
              },
            ],
            [
              { t: "strong", v: "Nombres:" },
              { t: "text", v: " OpenCode Zen pasa a llamarse " },
              { t: "strong", v: "OpenCode Console" },
              { t: "text", v: "." },
            ],
          ],
        },
        {
          type: "p",
          inline: [
            {
              t: "text",
              v: "Los videos y tutoriales anteriores pueden mostrar V1. Si ves ",
            },
            { t: "code", v: "permission" },
            { t: "text", v: ", " },
            { t: "code", v: "agent" },
            { t: "text", v: ", " },
            { t: "code", v: "tools" },
            { t: "text", v: " o " },
            { t: "code", v: "enabled" },
            {
              t: "text",
              v: ", estás ante configuración V1. La guía de migración oficial está en Fuentes.",
            },
          ],
        },
      ],
    },
  ],

  estructura: [
    {
      id: "carpetas-uso",
      title: "3.1 Carpetas y uso",
      blocks: [
        {
          type: "p",
          inline: [
            { t: "text", v: "La carpeta " },
            { t: "code", v: ".opencode/" },
            {
              t: "text",
              v: " concentra la configuración del proyecto para OpenCode. ",
            },
            { t: "link", v: "Este mismo repositorio", href: "https://github.com/KiKDraS/opencode-tutorial" },
            { t: "text", v: " es el ejemplo vivo: su estructura es la siguiente." },
          ],
        },
        {
          type: "ul",
          items: [
            [
              { t: "strong", children: [{ t: "code", v: "agents/" }] },
              {
                t: "text",
                v: " — archivos Markdown (texto con formato simple) que definen el rol de cada agente: responsabilidades, reglas y límites. En ",
              },
              { t: "link", v: "este repositorio", href: "https://github.com/KiKDraS/opencode-tutorial" },
              { t: "text", v: " hay cuatro: " },
              { t: "code", v: "orchestrator" },
              { t: "text", v: ", " },
              { t: "code", v: "frontend-dev" },
              { t: "text", v: ", " },
              { t: "code", v: "code-review" },
              { t: "text", v: " y " },
              { t: "code", v: "release-manager" },
              { t: "text", v: "." },
            ],
            [
              { t: "strong", children: [{ t: "code", v: "skills/" }] },
              {
                t: "text",
                v: " — habilidades (instrucciones) que se cargan bajo demanda, por ejemplo ",
              },
              { t: "code", v: "accessibility-wcag" },
              { t: "text", v: ", " },
              { t: "code", v: "seo" },
              { t: "text", v: " o " },
              { t: "code", v: "playwright-best-practices" },
              { t: "text", v: "." },
            ],
            [
              { t: "strong", children: [{ t: "code", v: "commands/" }] },
              {
                t: "text",
                v: " — comandos personalizados disponibles dentro de la interfaz de OpenCode.",
              },
            ],
            [
              { t: "strong", children: [{ t: "code", v: "docs/" }] },
              {
                t: "text",
                v: " — documentación interna de referencia: aquí vive ",
              },
              { t: "code", v: "trinity-architecture.md" },
              { t: "text", v: ", " },
              { t: "code", v: "performance-reliability.md" },
              { t: "text", v: " y " },
              { t: "code", v: "directive-sync.md" },
              {
                t: "text",
                v: ", que regulan cómo se escribe código en el proyecto.",
              },
            ],
            [
              { t: "strong", children: [{ t: "code", v: "prompts/" }] },
              {
                t: "text",
                v: " — prompts que un agente referencia con ",
              },
              { t: "code", v: "system" },
              { t: "text", v: " y " },
              { t: "code", v: "{file:…}" },
              { t: "text", v: ", o que se cargan globalmente desde " },
              { t: "code", v: "instructions" },
              { t: "text", v: "." },
            ],
            [
              { t: "strong", children: [{ t: "code", v: "plugins/" }] },
              {
                t: "text",
                v: " — código JavaScript que se ejecuta como plugin (por ejemplo, proteger variables de entorno o cargar reglas).",
              },
            ],
            [
              { t: "strong", children: [{ t: "code", v: "secrets/" }] },
              { t: "text", v: " — claves y tokens locales (credenciales de acceso); está en " },
              { t: "code", v: ".gitignore" },
              { t: "text", v: " y nunca se sube al repositorio." },
            ],
          ],
        },
        {
          type: "p",
          inline: [
            { t: "text", v: "La configuración raíz se reparte entre " },
            { t: "code", v: "opencode.json" },
            { t: "text", v: " y " },
            { t: "code", v: "AGENTS.md" },
            { t: "text", v: ". La carpeta " },
            { t: "code", v: ".opencode/" },
            { t: "text", v: " guarda agentes, skills, plugins, prompts y secretos. V2 también acepta " },
            { t: "code", v: "opencode.jsonc" },
            { t: "text", v: " y " },
            { t: "code", v: ".opencode/opencode.json" },
            { t: "text", v: "." },
          ],
        },
      ],
      slots: [{ kind: "code", codeKey: "estructura" }],
    },
    {
      id: "opencode-json",
      title: "3.3 opencode.json: qué es y por qué importa",
      blocks: [
        {
          type: "p",
          inline: [
            { t: "code", v: "opencode.json" },
            { t: "text", v: " es el " },
            { t: "strong", v: "archivo de configuración central" },
            {
              t: "text",
              v: " de OpenCode en un proyecto. Define qué instrucciones leer, qué permisos tiene el agente y qué agentes existen. También define qué plugins y servidores MCP (conexión a herramientas externas) se cargan, y cuál es el agente por defecto. V2 lee ",
            },
            { t: "code", v: "opencode.json" },
            { t: "text", v: " o " },
            { t: "code", v: "opencode.jsonc" },
            { t: "text", v: ", y también " },
            { t: "code", v: ".opencode/opencode.json" },
            { t: "text", v: "." },
          ],
        },
        {
          type: "p",
          inline: [
            { t: "text", v: "Los campos de V1 (" },
            { t: "code", v: "permission" },
            { t: "text", v: ", " },
            { t: "code", v: "agent" },
            { t: "text", v: ", " },
            { t: "code", v: "plugin" },
            { t: "text", v: ", " },
            { t: "code", v: "enabled" },
            { t: "text", v: ") se siguen aceptando. Aquí se muestra la forma nativa de V2. Un extracto real de " },
            { t: "link", v: "este repositorio", href: "https://github.com/KiKDraS/opencode-tutorial" },
            { t: "text", v: ":" },
          ],
        },
        {
          type: "p",
          inline: [
            { t: "text", v: "Por qué importa: " },
            { t: "strong", v: "permisos" },
            { t: "text", v: " (qué puede ejecutar el agente), " },
            { t: "strong", v: "agentes" },
            { t: "text", v: " (quién hace cada tarea) y " },
            { t: "strong", v: "plugins y servidores MCP" },
            {
              t: "text",
              v: " (qué está activo) se deciden aquí, no en el prompt de cada conversación.",
            },
          ],
        },
      ],
      slots: [
        { kind: "code", codeKey: "opencode-json" },
        { kind: "callout", calloutKey: "no-editar" },
      ],
    },
  ],

  agentes: [
    {
      id: "plan-vs-build",
      title: "4.1 Agente. Plan vs Build",
      blocks: [
        {
          type: "p",
          inline: [
            {
              t: "text",
              v: "OpenCode trae dos agentes integrados principales, Build y Plan. ",
            },
            { t: "strong", v: "Build" },
            {
              t: "text",
              v: " ejecuta: edita archivos, corre comandos y prueba cambios. ",
            },
            { t: "strong", v: "Plan" },
            {
              t: "text",
              v: " explora y propone un plan sin editar los archivos normales; tú lees, corriges y apruebas.",
            },
          ],
        },
        {
          type: "p",
          inline: [
            { t: "text", v: "En la TUI de V2, " },
            { t: "code", v: "Shift+Tab" },
            { t: "text", v: " rota entre agentes y " },
            { t: "code", v: "/agents" },
            { t: "text", v: " abre el selector. " },
            { t: "code", v: "Tab" },
            { t: "text", v: " no es el atajo de V2." },
          ],
        },
        {
          type: "p",
          inline: [
            {
              t: "text",
              v: "Por qué importa: Plan convierte al agente en un ",
            },
            { t: "strong", v: "compañero de diseño" },
            {
              t: "text",
              v: " (revisa antes de actuar), y Build en un ",
            },
            { t: "strong", v: "ejecutor" },
            {
              t: "text",
              v: ". Alternar entre ambos evita que el agente haga cambios grandes sin que tú veas el rumbo.",
            },
          ],
        },
      ],
    },
    {
      id: "loop-prompt",
      title: "4.2 Loop prompt → crear → iterar (y por qué importa)",
      blocks: [
        {
          type: "p",
          inline: [
            { t: "text", v: "El flujo real de trabajo con un agente es un " },
            { t: "strong", v: "bucle" },
            { t: "text", v: ":" },
          ],
        },
        {
          type: "ol",
          items: [
            [
              { t: "strong", v: "Prompt:" },
              {
                t: "text",
                v: " describes la tarea con contexto (qué, para quién, restricciones).",
              },
            ],
            [
              { t: "strong", v: "Crear:" },
              { t: "text", v: " el agente propone o ejecuta cambios." },
            ],
            [
              { t: "strong", v: "Iterar:" },
              {
                t: "text",
                v: " revisas el resultado, corriges el rumbo y repites hasta que esté bien.",
              },
            ],
          ],
        },
        {
          type: "p",
          inline: [
            {
              t: "text",
              v: "Por qué importa: la calidad no sale del primer prompt, sale de ",
            },
            { t: "strong", v: "iterar con criterio" },
            {
              t: "text",
              v: ". El «vibe coding» (aceptar la primera respuesta sin revisar) produce software frágil. El método de especificar, revisar e iterar produce software robusto. La documentación de OpenCode describe el ciclo plan → iterate → build → undo como la forma prevista de trabajar.",
            },
          ],
        },
        {
          type: "p",
          inline: [
            { t: "text", v: "En la TUI de V2, " },
            { t: "code", v: "/undo" },
            {
              t: "text",
              v: " revierte el último mensaje y el trabajo que lo siguió; el prompt vuelve al editor. ",
            },
            { t: "code", v: "/redo" },
            { t: "text", v: " restaura lo revertido." },
          ],
        },
        {
          type: "p",
          inline: [{ t: "text", v: "Dos cursos de MoureDev sobre este tema:" }],
        },
      ],
      slots: [{ kind: "video", videos: ["v5", "v7"] }],
    },
    {
      id: "permisos",
      title: "4.3 Permisos (y por qué importan)",
      blocks: [
        {
          type: "p",
          inline: [
            { t: "text", v: "El agente ejecuta " },
            { t: "strong", v: "comandos reales" },
            {
              t: "text",
              v: " en tu máquina. Los permisos definen qué puede hacer sin preguntar (",
            },
            { t: "code", v: "allow" },
            { t: "text", v: "), qué debe consultar (" },
            { t: "code", v: "ask" },
            { t: "text", v: ") y qué tiene prohibido (" },
            { t: "code", v: "deny" },
            { t: "text", v: "). En V2, " },
            { t: "code", v: "permissions" },
            {
              t: "text",
              v: " es una lista ordenada: la última regla que coincide gana, así que las reglas generales van primero y las excepciones después. La lista de ",
            },
            { t: "link", v: "este repositorio", href: "https://github.com/KiKDraS/opencode-tutorial" },
            { t: "text", v: ":" },
          ],
        },
        {
          type: "p",
          inline: [
            { t: "text", v: "Las acciones integradas más comunes son " },
            { t: "code", v: "shell" },
            { t: "text", v: ", " },
            { t: "code", v: "edit" },
            { t: "text", v: ", " },
            { t: "code", v: "subagent" },
            { t: "text", v: ", " },
            { t: "code", v: "read" },
            { t: "text", v: ", " },
            { t: "code", v: "glob" },
            { t: "text", v: ", " },
            { t: "code", v: "grep" },
            { t: "text", v: ", " },
            { t: "code", v: "webfetch" },
            { t: "text", v: ", " },
            { t: "code", v: "websearch" },
            { t: "text", v: ", " },
            { t: "code", v: "skill" },
            { t: "text", v: " y " },
            { t: "code", v: "external_directory" },
            { t: "text", v: ". Los plugins y servidores MCP pueden añadir acciones propias. Si vienes de V1: " },
            { t: "code", v: "bash" },
            { t: "text", v: " ahora es " },
            { t: "code", v: "shell" },
            { t: "text", v: ", " },
            { t: "code", v: "task" },
            { t: "text", v: " es " },
            { t: "code", v: "subagent" },
            { t: "text", v: ", y " },
            { t: "code", v: "write" },
            { t: "text", v: " y " },
            { t: "code", v: "patch" },
            { t: "text", v: " son " },
            { t: "code", v: "edit" },
            { t: "text", v: "." },
          ],
        },
        {
          type: "p",
          inline: [
            {
              t: "text",
              v: "V2 permite rutas externas por defecto. Este repositorio añade ",
            },
            { t: "code", v: "external_directory: ask" },
            {
              t: "text",
              v: " para recuperar la confirmación. Las reglas de cada agente se añaden después de las globales.",
            },
          ],
        },
      ],
      slots: [
        { kind: "code", codeKey: "permisos" },
        { kind: "callout", calloutKey: "por-que-importan" },
      ],
    },
    {
      id: "spec-agents-design",
      title: "4.4 SPEC.md / AGENTS.md / DESIGN.md (y por qué importan)",
      blocks: [
        {
          type: "p",
          inline: [
            { t: "text", v: "Los agentes trabajan mejor cuando el proyecto " },
            { t: "strong", v: "les dice qué hacer" },
            {
              t: "text",
              v: ". Tres archivos de raíz cumplen ese rol en ",
            },
            { t: "link", v: "este repositorio", href: "https://github.com/KiKDraS/opencode-tutorial" },
            { t: "text", v: ":" },
          ],
        },
        {
          type: "p",
          inline: [
            {
              t: "text",
              v: "V2 descubre solo ",
            },
            { t: "code", v: "AGENTS.md" },
            { t: "text", v: "; no usa " },
            { t: "code", v: "CLAUDE.md" },
            { t: "text", v: " como respaldo. La lista " },
            { t: "code", v: "instructions" },
            { t: "text", v: " añade archivos, globs y URLs que se combinan con " },
            { t: "code", v: "AGENTS.md" },
            { t: "text", v: "." },
          ],
        },
        {
          type: "ul",
          items: [
            [
              { t: "strong", children: [{ t: "code", v: "SPEC.md" }] },
              { t: "text", v: " — " },
              { t: "em", v: "qué" },
              {
                t: "text",
                v: " construir: contenido, estructura, fuentes y criterios de aceptación.",
              },
            ],
            [
              { t: "strong", children: [{ t: "code", v: "DESIGN.md" }] },
              { t: "text", v: " — " },
              { t: "em", v: "cómo se ve" },
              {
                t: "text",
                v: ": paleta, tipografía, espaciado, motion y tokens de diseño vinculantes.",
              },
            ],
            [
              { t: "strong", children: [{ t: "code", v: "AGENTS.md" }] },
              { t: "text", v: " — " },
              { t: "em", v: "cómo se trabaja" },
              {
                t: "text",
                v: ": stack, estructura, reglas por rol, flujo git y permisos de cada agente.",
              },
            ],
          ],
        },
        {
          type: "p",
          inline: [
            { t: "text", v: "Un extracto real de " },
            { t: "code", v: "AGENTS.md" },
            { t: "text", v: ":" },
          ],
        },
        {
          type: "p",
          inline: [
            {
              t: "text",
              v: "Por qué importan: sin especificación, el agente ",
            },
            { t: "strong", v: "improvisa" },
            {
              t: "text",
              v: ". Con SPEC, DESIGN y AGENTS, cada agente sabe qué construir, con qué estética y bajo qué reglas. El revisor (",
            },
            { t: "code", v: "@code-review" },
            {
              t: "text",
              v: ") puede rechazar lo que no cumpla. El método de «software definido por especificaciones» lo popularizó MoureDev en su proyecto ",
            },
            { t: "em", v: "hello-sdd" },
            { t: "text", v: "." },
          ],
        },
      ],
      slots: [{ kind: "code", codeKey: "agents-md" }],
    },
    {
      id: "agentes-personalizados",
      title: "4.5 Agentes personalizados: primary vs sub-agent",
      blocks: [
        {
          type: "p",
          inline: [
            { t: "text", v: "OpenCode permite definir " },
            { t: "strong", v: "agentes propios" },
            { t: "text", v: " en " },
            { t: "code", v: "opencode.json" },
            { t: "text", v: ". El campo " },
            { t: "code", v: "mode" },
            { t: "text", v: " acepta " },
            { t: "code", v: "primary" },
            { t: "text", v: ", " },
            { t: "code", v: "subagent" },
            { t: "text", v: " o " },
            { t: "code", v: "all" },
            { t: "text", v: "." },
          ],
        },
        {
          type: "ul",
          items: [
            [
              { t: "strong", v: "Primary:" },
              {
                t: "text",
                v: " aparece en el selector de agentes de la interfaz. Coordina el trabajo, delega tareas y ve la conversación principal. En ",
              },
              { t: "link", v: "este repositorio", href: "https://github.com/KiKDraS/opencode-tutorial" },
              { t: "text", v: ", " },
              { t: "code", v: "orchestrator" },
              { t: "text", v: "." },
            ],
            [
              { t: "strong", v: "Sub-agente:" },
              {
                t: "text",
                v: " se ejecuta en una sesión hija, con contexto nuevo y permisos propios. Devuelve un resultado a la sesión que lo lanzó; el permiso ",
              },
              { t: "code", v: "subagent" },
              { t: "text", v: " del padre controla si puede lanzarlo. En " },
              { t: "link", v: "este repositorio", href: "https://github.com/KiKDraS/opencode-tutorial" },
              { t: "text", v: ", " },
              { t: "code", v: "frontend-dev" },
              { t: "text", v: ", " },
              { t: "code", v: "code-review" },
              { t: "text", v: " y " },
              { t: "code", v: "release-manager" },
              { t: "text", v: "." },
            ],
            [
              { t: "strong", v: "All:" },
              {
                t: "text",
                v: " disponible como primary y como sub-agente.",
              },
            ],
          ],
        },
        {
          type: "p",
          inline: [
            { t: "text", v: "Definiciones reales de " },
            { t: "link", v: "este repositorio", href: "https://github.com/KiKDraS/opencode-tutorial" },
            { t: "text", v: ":" },
          ],
        },
        {
          type: "p",
          inline: [
            { t: "text", v: "Cada agente tiene una " },
            { t: "strong", v: "descripción" },
            { t: "text", v: " (para que el modelo sepa cuándo usarlo), un " },
            { t: "strong", v: "modo" },
            { t: "text", v: ", un conjunto de " },
            { t: "strong", v: "permisos" },
            { t: "text", v: " y un " },
            { t: "strong", v: "prompt" },
            { t: "text", v: " opcional. En Markdown, el cuerpo del archivo es el " },
            { t: "code", v: "system" },
            { t: "text", v: "; en JSON se usa el campo " },
            { t: "code", v: "system" },
            { t: "text", v: ". Los prompts de este repositorio viven en " },
            { t: "code", v: ".opencode/prompts/" },
            { t: "text", v: " y el rol de cada agente en " },
            { t: "code", v: ".opencode/agents/*.md" },
            { t: "text", v: ". Los integrados: Build y Plan son " },
            { t: "code", v: "primary" },
            { t: "text", v: "; General y Explore son " },
            { t: "code", v: "subagent" },
            { t: "text", v: "." },
          ],
        },
      ],
      slots: [{ kind: "code", codeKey: "agente-json" }],
    },
    {
      id: "skills",
      title: "4.6 Skills (vs Claude Code)",
      blocks: [
        {
          type: "p",
          inline: [
            { t: "text", v: "Una " },
            { t: "strong", v: "skill" },
            {
              t: "text",
              v: " es un conjunto de instrucciones reutilizables en ",
            },
            { t: "code", v: ".opencode/skills/<id>/SKILL.md" },
            {
              t: "text",
              v: ". El agente la carga ",
            },
            { t: "em", v: "bajo demanda" },
            {
              t: "text",
              v: " cuando la tarea coincide con su descripción. Por ejemplo, ",
            },
            { t: "code", v: "accessibility-wcag" },
            { t: "text", v: ", " },
            { t: "code", v: "seo" },
            { t: "text", v: " o " },
            { t: "code", v: "frontend-design" },
            {
              t: "text",
              v: " en ",
            },
            { t: "link", v: "este repositorio", href: "https://github.com/KiKDraS/opencode-tutorial" },
            { t: "text", v: ". En lugar de repetir reglas en cada prompt, el agente «abre» la skill cuando la necesita." },
          ],
        },
        {
          type: "p",
          inline: [
            {
              t: "text",
              v: "V2 también lee ",
            },
            { t: "code", v: ".claude/skills/" },
            { t: "text", v: " y " },
            { t: "code", v: ".agents/skills/" },
            { t: "text", v: ". La lista " },
            { t: "code", v: "skills" },
            { t: "text", v: " añade directorios locales o catálogos HTTP, y el permiso " },
            { t: "code", v: "skill" },
            { t: "text", v: " controla qué skills puede cargar el agente." },
          ],
        },
        {
          type: "p",
          inline: [
            { t: "strong", v: "vs Claude Code:" },
            {
              t: "text",
              v: " ambos soportan skills de proyecto. Claude Code las llama ",
            },
            { t: "em", v: "agent skills" },
            { t: "text", v: " y las guarda en " },
            { t: "code", v: ".claude/skills/" },
            { t: "text", v: ". OpenCode mantiene un registro abierto en " },
            { t: "code", v: "skills.sh" },
            { t: "text", v: " con skills compartidas por la comunidad." },
          ],
        },
        {
          type: "p",
          inline: [
            {
              t: "text",
              v: "El curso de midudev introduce el concepto de skills con ejemplos prácticos.",
            },
          ],
        },
      ],
      slots: [{ kind: "video", videos: ["v6"] }],
    },
    {
      id: "prompts",
      title: "4.7 Prompts y comandos (vs Claude Code)",
      blocks: [
        {
          type: "p",
          inline: [
            { t: "text", v: "Los prompts en OpenCode tienen dos niveles. Las " },
            { t: "strong", v: "instrucciones globales" },
            { t: "text", v: " se declaran en " },
            { t: "code", v: "instructions" },
            { t: "text", v: "; el " },
            { t: "strong", v: "prompt de un agente" },
            { t: "text", v: " usa " },
            { t: "code", v: "system" },
            { t: "text", v: " en JSON o el cuerpo Markdown del agente. En " },
            { t: "link", v: "este repositorio", href: "https://github.com/KiKDraS/opencode-tutorial" },
            { t: "text", v: ", " },
            { t: "code", v: ".opencode/prompts/agent-knowledge-awareness.md" },
            { t: "text", v: " se carga globalmente desde " },
            { t: "code", v: "instructions" },
            {
              t: "text",
              v: ", y los prompts de los agentes de Playwright viven en ",
            },
            { t: "code", v: ".opencode/prompts/" },
            { t: "text", v: " y se referencian con " },
            { t: "code", v: "system" },
            { t: "text", v: "." },
          ],
        },
        {
          type: "p",
          inline: [
            {
              t: "text",
              v: "Los comandos son otra pieza. Viven en ",
            },
            { t: "code", v: ".opencode/commands/*.md" },
            { t: "text", v: ", se invocan como " },
            { t: "code", v: "/nombre" },
            { t: "text", v: " y el cuerpo del archivo es la plantilla. " },
            { t: "code", v: "$ARGUMENTS" },
            { t: "text", v: " recibe los argumentos; el frontmatter opcional acepta " },
            { t: "code", v: "agent" },
            { t: "text", v: ", " },
            { t: "code", v: "model" },
            { t: "text", v: " y " },
            { t: "code", v: "subagent" },
            { t: "text", v: "." },
          ],
        },
        {
          type: "p",
          inline: [
            { t: "strong", v: "vs Claude Code:" },
            { t: "text", v: " la función equivalente son los " },
            { t: "em", v: "slash commands" },
            {
              t: "text",
              v: ". Son comandos personalizados que se invocan con ",
            },
            { t: "code", v: "/" },
            {
              t: "text",
              v: " dentro de la interfaz. En OpenCode, los comandos personalizados viven en ",
            },
            { t: "code", v: ".opencode/commands/" },
            { t: "text", v: "." },
          ],
        },
      ],
    },
    {
      id: "plugins",
      title: "4.8 Plugins (vs Claude Code)",
      blocks: [
        {
          type: "p",
          inline: [
            { t: "text", v: "Los " },
            { t: "strong", v: "plugins" },
            {
              t: "text",
              v: " de OpenCode son código que extiende el agente. En V2 se definen con ",
            },
            { t: "code", v: "Plugin.define({ id, setup(ctx) })" },
            { t: "text", v: " y registran hooks por dominio: " },
            { t: "code", v: 'ctx.session.hook("context")' },
            { t: "text", v: ", " },
            { t: "code", v: 'ctx.tool.hook("execute.before")' },
            { t: "text", v: " o " },
            { t: "code", v: 'ctx.shell.hook("create.before")' },
            { t: "text", v: "." },
          ],
        },
        {
          type: "p",
          inline: [
            {
              t: "text",
              v: "Los plugins de V1 no se ejecutan en V2. Los archivos ",
            },
            { t: "code", v: ".js" },
            { t: "text", v: " o " },
            { t: "code", v: ".ts" },
            { t: "text", v: " en " },
            { t: "code", v: ".opencode/plugins/" },
            { t: "text", v: " se cargan solos; la lista " },
            { t: "code", v: "plugins" },
            { t: "text", v: " sirve para paquetes y directorios externos. Este repositorio declara " },
            { t: "code", v: '"plugins": ["@dietrichgebert/ponytail"]' },
            { t: "text", v: " y cuatro plugins locales: " },
            { t: "code", v: "bootstrap" },
            { t: "text", v: ", " },
            { t: "code", v: "env-protection" },
            { t: "text", v: ", " },
            { t: "code", v: "load-rules" },
            { t: "text", v: " y " },
            { t: "code", v: "ponytail-mode" },
            { t: "text", v: "." },
          ],
        },
        {
          type: "p",
          inline: [
            { t: "strong", v: "vs Claude Code:" },
            { t: "text", v: " la función equivalente son los " },
            { t: "em", v: "hooks" },
            { t: "text", v: " (preToolUse, PostToolUse, etc.) definidos en " },
            { t: "code", v: "settings.json" },
            {
              t: "text",
              v: ". Ambos permiten automatizar reglas y protecciones. La diferencia: plugins JS en OpenCode, hooks configurables en Claude Code.",
            },
          ],
        },
      ],
      slots: [{ kind: "code", codeKey: "plugin-v2" }],
    },
    {
      id: "mcp",
      title: "4.9 MCP (vs Claude Code)",
      blocks: [
        {
          type: "p",
          inline: [
            { t: "strong", v: "MCP" },
            { t: "text", v: " (" },
            { t: "em", v: "Model Context Protocol" },
            {
              t: "text",
              v: ") es un estándar abierto para conectar herramientas externas a agentes. Son servidores, locales o remotos, que exponen recursos y funciones. En V2 se configuran en ",
            },
            { t: "code", v: "mcp.servers" },
            { t: "text", v: ". En " },
            { t: "link", v: "este repositorio", href: "https://github.com/KiKDraS/opencode-tutorial" },
            { t: "text", v: " hay tres: " },
            { t: "code", v: "playwright-test" },
            { t: "text", v: " (probar la interfaz), " },
            { t: "code", v: "codegraph" },
            { t: "text", v: " (índice del código) y " },
            { t: "code", v: "context7" },
            { t: "text", v: " (documentación de librerías)." },
          ],
        },
        {
          type: "p",
          inline: [
            { t: "text", v: "Cada servidor declara " },
            { t: "code", v: "type" },
            { t: "text", v: " " },
            { t: "code", v: "local" },
            { t: "text", v: " o " },
            { t: "code", v: "remote" },
            { t: "text", v: ". " },
            { t: "code", v: "disabled: true" },
            { t: "text", v: " lo deja configurado sin conectar. Los servidores remotos usan OAuth: " },
            { t: "code", v: "/mcps" },
            { t: "text", v: " abre la autenticación. También puedes gestionarlos con " },
            { t: "code", v: "opencode mcp list" },
            { t: "text", v: " y " },
            { t: "code", v: "opencode mcp add" },
            { t: "text", v: "." },
          ],
        },
        {
          type: "p",
          inline: [
            { t: "strong", v: "vs Claude Code:" },
            {
              t: "text",
              v: " Claude Code también soporta MCP y usa el mismo protocolo. La diferencia está en la configuración: en ",
            },
            { t: "code", v: "opencode.json" },
            { t: "text", v: " vs " },
            { t: "code", v: "settings.json" },
            { t: "text", v: " / " },
            { t: "code", v: ".mcp.json" },
            {
              t: "text",
              v: ". El protocolo en sí es compartido: aprenderlo sirve para ambos.",
            },
          ],
        },
      ],
      slots: [{ kind: "video", videos: ["v8", "v6"] }],
    },
  ],

  ejemplo: [
    {
      id: "proyecto-real",
      title: "5.1 El proyecto",
      blocks: [
        {
          type: "p",
          inline: [
            { t: "text", v: "Esta página web es el " },
            { t: "strong", v: "ejemplo vivo" },
            {
              t: "text",
              v: " de todo lo explicado: está construida con Vite + HTML5 + CSS nativo + JS ES6, gestionada con pnpm y desplegada en ",
            },
            { t: "strong", v: "GitHub Pages" },
            { t: "text", v: ". El " },
            { t: "link", v: "repositorio que la genera", href: "https://github.com/KiKDraS/opencode-tutorial" },
            {
              t: "text",
              v: " implementa la configuración nativa de V2: ",
            },
            { t: "code", v: "opencode.json" },
            { t: "text", v: " y " },
            { t: "code", v: ".opencode/" },
            { t: "text", v: ", con los agentes descritos arriba." },
          ],
        },
        {
          type: "p",
          inline: [
            {
              t: "text",
              v: "El ciclo de desarrollo y despliegue, en comandos reales:",
            },
          ],
        },
        {
          type: "p",
          inline: [
            {
              t: "text",
              v: "El flujo completo del proyecto está documentado en ",
            },
            { t: "code", v: "AGENTS.md" },
            { t: "text", v: ". Rama " },
            { t: "code", v: "main" },
            { t: "text", v: " = producción, " },
            { t: "code", v: "develop" },
            { t: "text", v: " = integración diaria. Las ramas " },
            { t: "code", v: "feature/*" },
            { t: "text", v: " para trabajo nuevo, " },
            { t: "code", v: "release/*" },
            { t: "text", v: " para publicar y " },
            { t: "code", v: "hotfix/*" },
            { t: "text", v: " para correcciones urgentes." },
          ],
        },
      ],
      slots: [{ kind: "code", codeKey: "despliegue" }],
    },
    {
      id: "flujo-real",
      title: "5.2 Flujo de trabajo",
      blocks: [
        {
          type: "p",
          inline: [
            {
              t: "text",
              v: "Así trabaja ",
            },
            { t: "link", v: "este repositorio", href: "https://github.com/KiKDraS/opencode-tutorial" },
            { t: "text", v: " con sus agentes personalizados:" },
          ],
        },
        {
          type: "ol",
          items: [
            [
              { t: "strong", children: [{ t: "code", v: "@orchestrator" }] },
              {
                t: "text",
                v: " (agente primary) planifica, delega y decide merge/release (fusionar ramas y publicar versiones). Pide una confirmación al usuario antes de publicar.",
              },
            ],
            [
              { t: "strong", children: [{ t: "code", v: "@frontend-dev" }] },
              {
                t: "text",
                v: " (sub-agente) escribe HTML, CSS y JS en ramas ",
              },
              { t: "code", v: "feature/*" },
              {
                t: "text",
                v: ". Está sujeto a los contratos de arquitectura y rendimiento.",
              },
            ],
            [
              { t: "strong", children: [{ t: "code", v: "@code-review" }] },
              {
                t: "text",
                v: " (sub-agente) audita el código contra SPEC, DESIGN y los checklists. Sin su ",
              },
              { t: "code", v: "STATUS: APPROVED" },
              { t: "text", v: " no hay merge." },
            ],
            [
              { t: "strong", children: [{ t: "code", v: "@release-manager" }] },
              { t: "text", v: " (sub-agente) crea ramas de release y fusiona a " },
              { t: "code", v: "main" },
              { t: "text", v: ". Hace tag + GitHub Release y despliega con " },
              { t: "code", v: "pnpm deploy" },
              { t: "text", v: " → rama " },
              { t: "code", v: "gh-pages" },
              { t: "text", v: " → sitio en vivo." },
            ],
          ],
        },
        {
          type: "p",
          inline: [
            { t: "text", v: "Reglas del proyecto en " },
            { t: "code", v: "AGENTS.md" },
            { t: "text", v: ". Contenido y fuentes en " },
            { t: "code", v: "SPEC.md" },
            { t: "text", v: ". Diseño vinculante en " },
            { t: "code", v: "DESIGN.md" },
            {
              t: "text",
              v: ". La configuración de todo (permisos, agentes, MCP, plugins) en ",
            },
            { t: "code", v: "opencode.json" },
            {
              t: "text",
              v: ". Ese es el punto: no es teoría, es cómo se construye esta página.",
            },
          ],
        },
      ],
    },
  ],
};

function buildInlineNodes(container, parts) {
  parts.forEach((part) => {
    if (part.t === "text") {
      container.appendChild(document.createTextNode(part.v));
      return;
    }
    const tagName = part.t === "link" ? "a" : part.t;
    const node = document.createElement(tagName);
    if (part.children) {
      buildInlineNodes(node, part.children);
    } else {
      node.textContent = part.v;
    }
    if (part.href) {
      node.href = part.href;
      node.target = "_blank";
      node.rel = "noopener noreferrer";
    }
    container.appendChild(node);
  });
}

function buildBlock(block) {
  if (block.type === "ul" || block.type === "ol") {
    const list = document.createElement(block.type);
    block.items.forEach((item) => {
      const itemNode = document.createElement("li");
      buildInlineNodes(itemNode, item);
      list.appendChild(itemNode);
    });
    return list;
  }
  const paragraph = document.createElement("p");
  buildInlineNodes(paragraph, block.inline);
  return paragraph;
}

function appendSlot(subsection, slot) {
  const container = document.createElement("div");
  if (slot.kind === "video") {
    container.className = "video-card__grid";
    container.dataset.videoGrid = "";
    container.dataset.videos = slot.videos.join(",");
  } else if (slot.kind === "code") {
    container.className = "code-block";
    container.dataset.codeBlockContainer = "";
    container.dataset.codeKey = slot.codeKey;
  } else {
    container.dataset.calloutContainer = "";
    container.dataset.calloutKey = slot.calloutKey;
  }
  subsection.appendChild(container);
}

function createSubsection(template, subtopic) {
  const subsection = template.content.firstElementChild.cloneNode(true);
  const heading = subsection.querySelector("h3");
  heading.id = subtopic.id;
  heading.textContent = subtopic.title;
  const body = subsection.querySelector(".article__body");
  subtopic.blocks.forEach((block) => body.appendChild(buildBlock(block)));
  (subtopic.slots ?? []).forEach((slot) => appendSlot(subsection, slot));
  return subsection;
}

// O(n) per grid container; n = subtopics in the section (≤ 9).
export function renderSubsections() {
  const template = document.getElementById("subsection-template");
  if (!template) return;
  const grids = document.querySelectorAll("[data-subsection-grid]");
  if (grids.length === 0) return;
  grids.forEach((grid) => {
    const subtopics = SUBSECTIONS[grid.dataset.section];
    if (!subtopics) return;
    const wanted = grid.dataset.subtopics
      ? new Set(grid.dataset.subtopics.split(","))
      : null;
    const fragment = document.createDocumentFragment();
    subtopics.forEach((subtopic) => {
      if (wanted && !wanted.has(subtopic.id)) return;
      fragment.appendChild(createSubsection(template, subtopic));
    });
    grid.appendChild(fragment);
  });
}

export function init() {
  const grids = document.querySelectorAll("[data-subsection-grid]");
  if (grids.length === 0) return;
  renderSubsections();
}
