import "server-only";
import { site } from "@/lib/site";

// Envío de avisos: correo con Resend y, si está configurada, una fila en la hoja de Google.
// Variables de entorno (ver .env.example):
//   RESEND_API_KEY, RESEND_FROM     -> correo a publicacionesmcsl@gmail.com
//   GOOGLE_SHEETS_WEBHOOK_URL       -> Apps Script que añade una fila a la hoja privada
// Sin estas variables (prototipo), el aviso se escribe en el registro del servidor.

export type Attachment = { filename: string; content: string /* base64 */ };

export type Notice = {
  kind: "asesoramiento" | "contacto" | "empleo" | "asistente" | "financiacion";
  subject: string;
  fields: Record<string, string>;
  replyTo?: string;
  attachments?: Attachment[];
};

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);

export async function notify(n: Notice): Promise<{ delivered: boolean }> {
  const rows = Object.entries(n.fields)
    .filter(([, v]) => v)
    .map(([k, v]) => `<tr><td style="padding:6px 12px 6px 0;color:#4a615a;vertical-align:top">${esc(k)}</td><td style="padding:6px 0">${esc(v).replace(/\n/g, "<br>")}</td></tr>`)
    .join("");
  const html = `<div style="font-family:system-ui,sans-serif;font-size:16px;color:#1f4a42"><h2 style="font-weight:500">${esc(n.subject)}</h2><table>${rows}</table><p style="color:#4a615a;font-size:14px">Enviado desde la web ${esc(site.nombreComercial)}.</p></div>`;

  let delivered = false;
  const key = process.env.RESEND_API_KEY;
  if (key) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.RESEND_FROM ?? "Web Salud Bienestar <onboarding@resend.dev>",
        to: [site.email],
        reply_to: n.replyTo,
        subject: n.subject,
        html,
        attachments: n.attachments,
      }),
    });
    delivered = res.ok;
    if (!res.ok) console.error("[notify] Resend", res.status, await res.text());
  }

  const sheet = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (sheet) {
    const res = await fetch(sheet, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tipo: n.kind, fecha: new Date().toISOString(), ...n.fields }),
    }).catch((e) => (console.error("[notify] Sheets", e), null));
    delivered = delivered || Boolean(res?.ok);
  }

  if (!key && !sheet) {
    console.info("[notify] (sin configurar, modo prueba)", n.kind, n.subject, n.fields);
    delivered = true;
  }
  return { delivered };
}
