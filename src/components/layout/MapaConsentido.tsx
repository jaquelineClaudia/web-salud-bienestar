"use client";

import { useState } from "react";
import { MapPin } from "@phosphor-icons/react";
import { site } from "@/lib/site";

/** Google Maps solo se carga si la persona lo pide (Google instala cookies propias). */
export function MapaConsentido() {
  const [show, setShow] = useState(false);
  const q = encodeURIComponent(`${site.direccion}, ${site.cp} Leganés, Madrid`);
  if (show)
    return (
      <iframe
        title="Mapa: Salud Bienestar Publicaciones en Leganés"
        src={`https://www.google.com/maps?q=${q}&output=embed`}
        className="aspect-[4/3] w-full rounded-[20px] border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    );
  return (
    <div className="flex aspect-[4/3] w-full flex-col items-start justify-end gap-4 rounded-[20px] bg-sage/60 p-7">
      <MapPin size={36} weight="light" aria-hidden />
      <p className="max-w-[36ch]">Al cargar el mapa, Google puede instalar sus propias cookies.</p>
      <div className="flex flex-wrap gap-3">
        <button onClick={() => setShow(true)} className="min-h-[48px] rounded-full bg-ink px-6 text-paper">Ver el mapa</button>
        <a href={`https://www.google.com/maps/search/?api=1&query=${q}`} target="_blank" rel="noopener" className="inline-flex min-h-[48px] items-center underline underline-offset-4">Abrir en Google Maps</a>
      </div>
    </div>
  );
}
