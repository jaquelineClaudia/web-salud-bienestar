"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { FormShell } from "./FormShell";
import { Field, Select, TextArea } from "./Fields";
import { site, whatsappUrl } from "@/lib/site";

type Option = { handle: string; title: string };

const pad = (n: number) => String(n).padStart(2, "0");
const today = () => {
  const d = new Date();
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};

/** Archivo .ics para que el cliente guarde la cita en su calendario. */
function icsHref(fecha: string, hora: string, modalidad: string) {
  if (!fecha || !hora) return null;
  const [y, m, d] = fecha.split("-");
  const [h, min] = hora.split(":");
  const start = `${y}${m}${d}T${h}${min}00`;
  const endH = pad((Number(h) + 1) % 24);
  const body = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Salud Bienestar Publicaciones//ES",
    "BEGIN:VEVENT",
    `UID:${Date.now()}@saludbienestar`,
    `DTSTART;TZID=Europe/Madrid:${start}`,
    `DTEND;TZID=Europe/Madrid:${y}${m}${d}T${endH}${min}00`,
    `SUMMARY:${modalidad} con Salud Bienestar Publicaciones (pendiente de confirmar)`,
    `DESCRIPTION:Te llamaremos al ${site.telefono} para confirmar la hora.`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(body)}`;
}

export function AsesoramientoForm({ products }: { products: Option[] }) {
  const params = useSearchParams();
  const financiacion = params.get("motivo") === "financiacion";
  const [modalidad, setModalidad] = useState("Visita a domicilio");

  return (
    <FormShell
      tipo={financiacion ? "financiacion" : "asesoramiento"}
      submitLabel={financiacion ? "Solicitar financiación" : "Pedir cita"}
      success={(data) => {
        const fecha = String(data.get("fecha") ?? "");
        const hora = String(data.get("hora") ?? "");
        const ics = icsHref(fecha, hora, String(data.get("modalidad")));
        const resumen = `Hola, soy ${data.get("nombre")}. Acabo de pedir ${String(data.get("modalidad")).toLowerCase()} en la web${fecha ? ` para el ${fecha.split("-").reverse().join("/")} a las ${hora}` : ""}.`;
        return (
          <>
            <p className="font-serif text-[1.75rem] leading-snug">Recibido. Te llamamos para confirmar el día y la hora.</p>
            <p className="mt-3 text-ink-soft">Si lo prefieres, escríbenos ahora por WhatsApp y lo cerramos en un momento.</p>
            <div className="mt-6 flex flex-wrap gap-4">
              <a href={whatsappUrl(resumen)} target="_blank" rel="noopener" className="inline-flex min-h-[52px] items-center rounded-full bg-ink px-7 text-paper">Confirmar por WhatsApp</a>
              {ics && (
                <a href={ics} download="cita-salud-bienestar.ics" className="inline-flex min-h-[52px] items-center underline underline-offset-4">Añadir a mi calendario</a>
              )}
            </div>
          </>
        );
      }}
    >
      <fieldset>
        <legend className="text-[1rem] font-medium">¿Cómo prefieres que te atendamos?</legend>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {["Visita a domicilio", "Videollamada"].map((m) => (
            <label key={m} className="flex min-h-[56px] cursor-pointer items-center gap-3 rounded-[12px] border border-ink/35 bg-white/70 px-4 has-[:checked]:border-ink has-[:checked]:bg-mint">
              <input type="radio" name="modalidad" value={m} checked={modalidad === m} onChange={() => setModalidad(m)} className="size-5 accent-[#1f4a42]" />
              {m}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Día que te viene bien" name="fecha" type="date" min={today()} required />
        <Field label="Hora" name="hora" type="time" step={900} required hint="Cualquier hora, también tardes y fines de semana." />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Nombre" name="nombre" autoComplete="name" required />
        <Field label="Teléfono" name="telefono" type="tel" autoComplete="tel" inputMode="tel" required />
      </div>
      <Field label="Correo" name="email" type="email" autoComplete="email" />

      {modalidad === "Visita a domicilio" && (
        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="Municipio" name="municipio" autoComplete="address-level2" required placeholder="Leganés" />
          <Field label="Dirección" name="direccion" autoComplete="street-address" hint="Te la pedimos al confirmar si prefieres." />
        </div>
      )}

      <Select label="Producto que te interesa" name="producto" defaultValue={params.get("producto") ? products.find((p) => p.handle === params.get("producto"))?.title : ""}>
        <option value="">Todavía no lo sé</option>
        {products.map((p) => (
          <option key={p.handle} value={p.title}>{p.title}</option>
        ))}
      </Select>

      {financiacion && <input type="hidden" name="motivo" value="Quiere información sobre pago a plazos o financiación" />}
      <TextArea label="¿Algo que debamos saber?" name="mensaje" placeholder="Por ejemplo: medida de la cama, si hay escaleras, quién estará en casa…" />
    </FormShell>
  );
}
