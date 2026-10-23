"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { ChatCircleText, PaperPlaneRight, Phone, WhatsappLogo, X } from "@phosphor-icons/react";
import { site, whatsappUrl } from "@/lib/site";

type Turn = { role: "user" | "assistant"; text: string };

const KEY = "sbp-asistente";
const HELLO: Turn = {
  role: "assistant",
  text: "Hola. Te ayudo a elegir: cuéntame qué buscas para tu casa, tu descanso o tus ratos de relax.",
};
const IDEAS = ["Busco un colchón", "¿Qué hace la plancha?", "Quiero una visita en casa"];

/** Convierte las rutas internas (/tienda/…) del texto en enlaces. */
function withLinks(text: string): ReactNode[] {
  return text.split(/(\/(?:tienda|asesoramiento|contacto|legal|blog)[\w\-/]*)/g).map((part, i) =>
    i % 2 ? (
      <Link key={i} href={part.replace(/[.,]$/, "")} className="underline underline-offset-4">{part}</Link>
    ) : (
      part
    ),
  );
}

/** Botón de ayuda: asistente de compra, WhatsApp y teléfono en un mismo panel. */
export function Assistant() {
  const [open, setOpen] = useState(false);
  const [turns, setTurns] = useState<Turn[]>([HELLO]);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const list = useRef<HTMLOListElement>(null);
  const input = useRef<HTMLTextAreaElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(KEY);
      if (saved) setTurns(JSON.parse(saved));
    } catch {}
  }, []);
  useEffect(() => {
    try {
      sessionStorage.setItem(KEY, JSON.stringify(turns));
    } catch {}
    list.current?.scrollTo({ top: list.current.scrollHeight, behavior: reduce ? "auto" : "smooth" });
  }, [turns, reduce]);
  useEffect(() => {
    if (!open) return;
    if (window.matchMedia("(pointer: fine)").matches) input.current?.focus();
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [open]);

  async function send(text: string) {
    const clean = text.trim();
    if (!clean || busy) return;
    const next: Turn[] = [...turns, { role: "user", text: clean }];
    setTurns([...next, { role: "assistant", text: "" }]);
    setDraft("");
    setBusy(true);
    try {
      const res = await fetch("/api/asistente", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // El saludo inicial no se envía: la conversación empieza por el cliente.
        body: JSON.stringify({ messages: next.slice(1).slice(-29) }),
      });
      if (!res.ok || !res.body) throw new Error(String(res.status));
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let acc = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += dec.decode(value, { stream: true });
        setTurns([...next, { role: "assistant", text: acc }]);
      }
    } catch {
      setTurns([...next, { role: "assistant", text: `Perdona, no he podido responder. Llámanos al ${site.telefono} o escríbenos por WhatsApp.` }]);
    } finally {
      setBusy(false);
    }
  }

  const submit = (e: FormEvent) => {
    e.preventDefault();
    send(draft);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="asistente"
        className="fixed bottom-5 right-5 z-40 inline-flex min-h-[56px] items-center gap-2 rounded-full bg-ink px-5 text-paper shadow-[0_10px_30px_rgb(15_38_34/0.25)] transition-transform duration-500 ease-calm hover:-translate-y-0.5"
      >
        {open ? <X size={24} weight="light" aria-hidden /> : <ChatCircleText size={26} weight="light" aria-hidden />}
        <span className="hidden sm:inline">{open ? "Cerrar" : "¿Te ayudo?"}</span>
        <span className="sr-only sm:hidden">{open ? "Cerrar ayuda" : "Abrir ayuda"}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.section
            id="asistente"
            aria-label="Asistente de compra"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "bottom right" }}
            className="fixed inset-x-3 bottom-[88px] top-[88px] z-50 flex flex-col overflow-hidden rounded-[20px] bg-paper shadow-[0_30px_80px_rgb(15_38_34/0.28)] sm:inset-x-auto sm:right-5 sm:top-auto sm:h-[min(640px,calc(100dvh-120px))] sm:w-[400px]"
          >
            <header className="border-b border-line px-6 pb-4 pt-5">
              <h2 className="text-[1.5rem]">¿En qué te ayudo?</h2>
              <div className="mt-3 flex flex-wrap gap-2 text-[0.9375rem]">
                <a href={whatsappUrl()} target="_blank" rel="noopener" className="inline-flex min-h-[40px] items-center gap-2 rounded-full bg-mint px-4">
                  <WhatsappLogo size={20} weight="light" aria-hidden /> WhatsApp
                </a>
                <a href={`tel:${site.telefonoE164}`} className="inline-flex min-h-[40px] items-center gap-2 rounded-full bg-mint px-4">
                  <Phone size={20} weight="light" aria-hidden /> {site.telefono}
                </a>
              </div>
            </header>

            <ol ref={list} aria-live="polite" className="flex-1 space-y-4 overflow-y-auto px-6 py-5 text-[1.0625rem]">
              {turns.map((t, i) => (
                <li key={i} className={t.role === "user" ? "ml-10 rounded-[18px] rounded-br-md bg-ink px-4 py-3 text-paper" : "mr-6"}>
                  {t.role === "assistant" && !t.text ? (
                    <span className="inline-flex gap-1" aria-label="Escribiendo">
                      {[0, 1, 2].map((d) => (
                        <span key={d} className="size-2 animate-pulse rounded-full bg-sage" style={{ animationDelay: `${d * 150}ms` }} />
                      ))}
                    </span>
                  ) : (
                    <p className="whitespace-pre-line">{t.role === "assistant" ? withLinks(t.text) : t.text}</p>
                  )}
                </li>
              ))}
              {turns.length === 1 && (
                <li className="flex flex-wrap gap-2 pt-1">
                  {IDEAS.map((idea) => (
                    <button key={idea} type="button" onClick={() => send(idea)} className="min-h-[44px] rounded-full border border-ink/30 px-4 text-[1rem] hover:border-ink">
                      {idea}
                    </button>
                  ))}
                </li>
              )}
            </ol>

            <form onSubmit={submit} className="border-t border-line px-4 pb-3 pt-3">
              <div className="flex items-end gap-2">
                <label htmlFor="asistente-texto" className="sr-only">Escribe tu pregunta</label>
                <textarea
                  id="asistente-texto"
                  ref={input}
                  rows={1}
                  value={draft}
                  maxLength={1500}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      send(draft);
                    }
                  }}
                  placeholder="Escribe tu pregunta…"
                  className="max-h-32 min-h-[52px] flex-1 resize-none rounded-[16px] border border-ink/25 bg-white/60 px-4 py-3 text-[1.0625rem] outline-none focus:border-ink"
                />
                <button type="submit" disabled={busy || !draft.trim()} className="grid size-[52px] shrink-0 place-items-center rounded-full bg-ink text-paper disabled:opacity-40" aria-label="Enviar">
                  <PaperPlaneRight size={22} weight="light" aria-hidden />
                </button>
              </div>
              <p className="mt-2 px-1 text-[0.8125rem] leading-snug text-ink-soft">
                Asistente automático: no da consejos de salud. Solo guardamos la conversación si nos dejas tus datos y lo aceptas.{" "}
                <Link href="/legal/privacidad" className="underline">Privacidad</Link>
              </p>
            </form>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
}
