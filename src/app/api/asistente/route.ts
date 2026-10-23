import Anthropic from "@anthropic-ai/sdk";
import { buildSystemPrompt } from "@/lib/server/assistant-prompt";
import { notify } from "@/lib/server/notify";
import { site } from "@/lib/site";

// Asistente de compra. Necesita ANTHROPIC_API_KEY; sin ella responde con un aviso y los datos de contacto.
// Las conversaciones no se guardan en ningún sitio salvo que la persona deje sus datos y acepte:
// entonces se envían (con la conversación) al correo y a la hoja, como cualquier formulario.

export const runtime = "nodejs";
export const maxDuration = 60;

const MODEL = "claude-opus-5-5";
const MAX_TURNS = 30;
const MAX_CHARS = 1500;

type ChatTurn = { role: "user" | "assistant"; text: string };

const SAVE_LEAD: Anthropic.Beta.BetaTool = {
  name: "guardar_contacto",
  description:
    "Guarda los datos de contacto de la persona y un resumen de lo que busca, para que el equipo la llame. Úsala solo cuando la persona haya dado nombre y teléfono o correo y haya aceptado expresamente que guardemos sus datos y esta conversación.",
  input_schema: {
    type: "object",
    properties: {
      nombre: { type: "string", description: "Nombre de la persona" },
      telefono: { type: "string", description: "Teléfono, si lo ha dado" },
      email: { type: "string", description: "Correo, si lo ha dado" },
      interes: { type: "string", description: "Resumen breve de lo que busca y los productos que le interesan" },
      consentimiento: { type: "boolean", description: "true solo si la persona ha aceptado de forma explícita" },
    },
    required: ["nombre", "interes", "consentimiento"],
    additionalProperties: false,
  },
  eager_input_streaming: true,
};

type Lead = { nombre: string; telefono?: string; email?: string; interes: string; consentimiento: boolean };

function parseLead(input: unknown): Lead | null {
  if (!input || typeof input !== "object") return null;
  const i = input as Record<string, unknown>;
  const str = (v: unknown) => (typeof v === "string" && v.trim() ? v.trim().slice(0, 300) : undefined);
  const nombre = str(i.nombre);
  const interes = str(i.interes);
  if (!nombre || !interes || typeof i.consentimiento !== "boolean") return null;
  return { nombre, interes, telefono: str(i.telefono), email: str(i.email), consentimiento: i.consentimiento };
}

function cleanHistory(body: unknown): ChatTurn[] | null {
  const turns = (body as { messages?: unknown })?.messages;
  if (!Array.isArray(turns) || turns.length === 0 || turns.length > MAX_TURNS) return null;
  const out: ChatTurn[] = [];
  for (const t of turns) {
    if (!t || (t.role !== "user" && t.role !== "assistant") || typeof t.text !== "string") return null;
    const text = t.text.trim().slice(0, MAX_CHARS);
    if (text) out.push({ role: t.role, text });
  }
  return out[0]?.role === "user" && out.at(-1)?.role === "user" ? out : null;
}

const transcript = (turns: ChatTurn[]) => turns.map((t) => `${t.role === "user" ? "Cliente" : "Asistente"}: ${t.text}`).join("\n\n");

export async function POST(req: Request) {
  const history = cleanHistory(await req.json().catch(() => null));
  if (!history) return new Response("Petición no válida", { status: 400 });

  const encoder = new TextEncoder();
  const headers = { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" };

  if (!process.env.ANTHROPIC_API_KEY) {
    return new Response(
      `Ahora mismo el asistente no está disponible. Llámanos al ${site.telefono}, escríbenos por WhatsApp o pide asesoramiento en /asesoramiento y te atendemos enseguida.`,
      { headers: { ...headers, "X-Asistente": "off" } },
    );
  }

  const client = new Anthropic();
  const system = await buildSystemPrompt();
  const messages: Anthropic.Beta.BetaMessageParam[] = history.map((t) => ({ role: t.role, content: t.text }));

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const write = (s: string) => controller.enqueue(encoder.encode(s));
      try {
        // Bucle corto: como mucho, guardar el contacto y responder después.
        for (let step = 0; step < 3; step++) {
          const res = client.beta.messages.stream(
            {
              model: MODEL,
              max_tokens: 4000,
              betas: ["server-side-fallback-2026-07-01"],
              fallbacks: "default",
              output_config: { effort: "low" },
              system: [{ type: "text", text: system, cache_control: { type: "ephemeral", ttl: "1h" } }],
              tools: [SAVE_LEAD],
              messages,
            },
            { signal: req.signal },
          );
          res.on("text", (t) => write(t));
          const message = await res.finalMessage();

          if (message.stop_reason === "refusal") {
            write(`\n\nEsto prefiero que lo hables con nuestro equipo: ${site.telefono}.`);
            break;
          }
          const toolUses = message.content.filter((b): b is Anthropic.Beta.BetaToolUseBlock => b.type === "tool_use");
          if (message.stop_reason !== "tool_use" || toolUses.length === 0) break;

          messages.push({ role: "assistant", content: message.content });
          const results: Anthropic.Beta.BetaToolResultBlockParam[] = [];
          for (const tu of toolUses) {
            const lead = tu.name === "guardar_contacto" ? parseLead(tu.input) : null;
            if (!lead) {
              results.push({ type: "tool_result", tool_use_id: tu.id, is_error: true, content: JSON.stringify({ INVALID_JSON: tu.input }) });
            } else if (!lead.consentimiento || (!lead.telefono && !lead.email)) {
              results.push({ type: "tool_result", tool_use_id: tu.id, is_error: true, content: "Faltan el consentimiento expreso o un teléfono o correo. No se ha guardado nada." });
            } else {
              await notify({
                kind: "asistente",
                subject: `Asistente web: ${lead.nombre} quiere que le llamemos`,
                replyTo: lead.email,
                fields: {
                  Nombre: lead.nombre,
                  Teléfono: lead.telefono ?? "",
                  Correo: lead.email ?? "",
                  "Le interesa": lead.interes,
                  Consentimiento: "Sí, dado en el chat",
                  Conversación: transcript(history),
                },
              });
              results.push({ type: "tool_result", tool_use_id: tu.id, content: "Guardado. El equipo llamará pronto." });
            }
          }
          messages.push({ role: "user", content: results });
          if (message.content.some((b) => b.type === "text")) write("\n\n");
        }
      } catch (err) {
        if (err instanceof Anthropic.APIUserAbortError) return controller.close();
        console.error("[asistente]", err instanceof Anthropic.APIError ? `${err.status} ${err.message}` : err);
        write(`\n\nPerdona, ha habido un problema. Puedes llamarnos al ${site.telefono} o escribirnos por WhatsApp.`);
      }
      controller.close();
    },
  });

  return new Response(stream, { headers });
}
