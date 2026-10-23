"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { OPEN_SETTINGS_EVENT, readConsent, saveConsent } from "@/lib/consent";

/** Banner de consentimiento: aceptar, rechazar y configurar al mismo nivel. Analítica no se carga sin aceptar. */
export function CookieBanner() {
  const [show, setShow] = useState(false);
  const [config, setConfig] = useState(false);
  const [analitica, setAnalitica] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    setShow(!readConsent());
    const open = () => {
      setAnalitica(readConsent()?.analitica ?? false);
      setConfig(true);
    };
    window.addEventListener(OPEN_SETTINGS_EVENT, open);
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, open);
  }, []);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (config && !d.open) d.showModal();
    if (!config && d.open) d.close();
  }, [config]);

  const choose = (v: boolean) => {
    saveConsent(v);
    setShow(false);
    setConfig(false);
  };

  return (
    <>
      {show && !config && (
        <div role="region" aria-label="Aviso de cookies" className="fixed inset-x-3 bottom-24 z-50 mx-auto max-w-[720px] rounded-[20px] bg-paper p-6 shadow-[0_20px_60px_rgb(15_38_34/0.22)] sm:bottom-5">
          <p className="text-[1rem]">
            Usamos cookies propias para que la web funcione y, si nos dejas, cookies de análisis para mejorarla.{" "}
            <Link href="/legal/cookies" className="underline underline-offset-4">Más información</Link>
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <button onClick={() => choose(true)} className="min-h-[48px] rounded-full border border-ink px-6">Aceptar</button>
            <button onClick={() => choose(false)} className="min-h-[48px] rounded-full border border-ink px-6">Rechazar</button>
            <button onClick={() => setConfig(true)} className="min-h-[48px] rounded-full border border-ink px-6">Configurar</button>
          </div>
        </div>
      )}

      <dialog
        ref={dialog}
        onClose={() => setConfig(false)}
        aria-labelledby="cookies-titulo"
        className="m-auto w-[min(92vw,560px)] rounded-[20px] bg-paper p-0 text-ink backdrop:bg-night/50"
      >
        <form method="dialog" className="p-7" onSubmit={(e) => { e.preventDefault(); choose(analitica); }}>
          <h2 id="cookies-titulo" className="text-[2rem]">Configurar cookies</h2>
          <div className="mt-6 divide-y divide-line border-y border-line">
            <div className="flex items-start justify-between gap-6 py-5">
              <div>
                <p className="font-medium">Necesarias</p>
                <p className="text-[1rem] text-ink-soft">Guardan tu carrito y esta elección. Siempre activas.</p>
              </div>
              <span className="shrink-0 text-[1rem] text-ink-soft">Siempre</span>
            </div>
            <label className="flex cursor-pointer items-start justify-between gap-6 py-5">
              <span>
                <span className="block font-medium">Análisis</span>
                <span className="block text-[1rem] text-ink-soft">Nos dicen qué páginas se visitan, sin identificarte, para mejorar la web.</span>
              </span>
              <input type="checkbox" checked={analitica} onChange={(e) => setAnalitica(e.target.checked)} className="mt-1 size-6 shrink-0 accent-[var(--ink)]" />
            </label>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <button type="submit" className="min-h-[48px] rounded-full bg-ink px-6 text-paper">Guardar</button>
            <button type="button" onClick={() => setConfig(false)} className="min-h-[48px] rounded-full border border-ink px-6">Cancelar</button>
          </div>
        </form>
      </dialog>
    </>
  );
}
