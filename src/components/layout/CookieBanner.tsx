"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const KEY = "sbp-cookies";

/** Banner de consentimiento: aceptar, rechazar y configurar al mismo nivel. Analytics no se carga sin aceptar. */
export function CookieBanner() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    try {
      setShow(!localStorage.getItem(KEY));
    } catch {
      setShow(true);
    }
  }, []);
  const choose = (v: "aceptadas" | "rechazadas") => {
    try {
      localStorage.setItem(KEY, v);
    } catch {}
    setShow(false);
  };
  if (!show) return null;
  return (
    <div role="region" aria-label="Aviso de cookies" className="fixed inset-x-3 bottom-24 z-50 mx-auto max-w-[720px] rounded-[20px] bg-paper p-6 shadow-[0_20px_60px_rgb(15_38_34/0.22)] sm:bottom-5">
      <p className="text-[1rem]">
        Usamos cookies propias para que la web funcione y, si nos dejas, cookies de análisis para mejorarla.{" "}
        <Link href="/legal/cookies" className="underline underline-offset-4">Más información</Link>
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button onClick={() => choose("aceptadas")} className="min-h-[48px] rounded-full border border-ink px-6">Aceptar</button>
        <button onClick={() => choose("rechazadas")} className="min-h-[48px] rounded-full border border-ink px-6">Rechazar</button>
        <Link href="/legal/cookies" className="inline-flex min-h-[48px] items-center rounded-full border border-ink px-6">Configurar</Link>
      </div>
    </div>
  );
}
