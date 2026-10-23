import { NextResponse } from "next/server";
import { notify, type Notice } from "@/lib/server/notify";

const MAX_CV = 5 * 1024 * 1024;
const CV_TYPES = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];

const labels: Record<string, string> = {
  nombre: "Nombre",
  telefono: "Teléfono",
  email: "Correo",
  modalidad: "Modalidad",
  municipio: "Municipio",
  direccion: "Dirección",
  fecha: "Día preferido",
  hora: "Hora preferida",
  producto: "Producto",
  mensaje: "Mensaje",
  motivo: "Motivo",
  disponibilidad: "Disponibilidad",
};

const subjects: Record<Notice["kind"], (f: Record<string, string>) => string> = {
  asesoramiento: (f) => `Nueva cita: ${f["Modalidad"] ?? "asesoramiento"} con ${f["Nombre"]}`,
  financiacion: (f) => `Solicitud de financiación de ${f["Nombre"]}`,
  contacto: (f) => `Mensaje de ${f["Nombre"]} desde la web`,
  empleo: (f) => `Candidatura de comercial: ${f["Nombre"]}`,
  asistente: (f) => `Contacto desde el asistente: ${f["Nombre"]}`,
};

export async function POST(req: Request) {
  const form = await req.formData();
  // Trampa para bots: campo oculto que una persona nunca rellena.
  if (form.get("web")) return NextResponse.json({ ok: true });

  const kind = String(form.get("tipo") ?? "") as Notice["kind"];
  if (!(kind in subjects)) return NextResponse.json({ ok: false, error: "Formulario no válido." }, { status: 400 });
  if (form.get("consentimiento") !== "si") {
    return NextResponse.json({ ok: false, error: "Necesitamos tu permiso para tratar tus datos." }, { status: 400 });
  }
  const nombre = String(form.get("nombre") ?? "").trim();
  const telefono = String(form.get("telefono") ?? "").trim();
  const email = String(form.get("email") ?? "").trim();
  if (!nombre || (!telefono && !email)) {
    return NextResponse.json({ ok: false, error: "Indícanos tu nombre y un teléfono o correo." }, { status: 400 });
  }

  const fields: Record<string, string> = {};
  for (const [k, label] of Object.entries(labels)) {
    const v = form.get(k);
    if (typeof v === "string" && v.trim()) fields[label] = v.trim().slice(0, 4000);
  }

  const attachments = [];
  const cv = form.get("cv");
  if (cv instanceof File && cv.size > 0) {
    if (cv.size > MAX_CV) return NextResponse.json({ ok: false, error: "El CV no puede pasar de 5 MB." }, { status: 400 });
    if (!CV_TYPES.includes(cv.type)) return NextResponse.json({ ok: false, error: "El CV tiene que ser PDF o Word." }, { status: 400 });
    attachments.push({ filename: cv.name, content: Buffer.from(await cv.arrayBuffer()).toString("base64") });
  }

  const { delivered } = await notify({ kind, subject: subjects[kind](fields), fields, replyTo: email || undefined, attachments });
  if (!delivered) {
    return NextResponse.json({ ok: false, error: "No hemos podido enviarlo. Llámanos o escríbenos por WhatsApp." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
