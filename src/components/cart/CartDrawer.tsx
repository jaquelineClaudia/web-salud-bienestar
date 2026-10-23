"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Minus, Plus, X } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import { useCart } from "./store";
import { formatMoney, sumMoney } from "@/lib/store";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { Button, ButtonLink } from "@/components/ui/Button";

export function CartDrawer() {
  const { lines, open, setOpen, setQty } = useCart();
  const reduce = useReducedMotion();
  const panel = useRef<HTMLDivElement>(null);
  const [demoNote, setDemoNote] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    panel.current?.focus();
    return () => document.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[60]">
          <motion.button
            aria-label="Cerrar carrito"
            className="absolute inset-0 bg-night/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.5 }}
            onClick={() => setOpen(false)}
          />
          <motion.div
            ref={panel}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby="carrito-titulo"
            className="absolute right-0 top-0 flex h-[100dvh] w-full max-w-[460px] flex-col bg-paper shadow-[-24px_0_60px_rgb(15_38_34/0.18)] outline-none"
            initial={reduce ? { opacity: 0 } : { x: "100%" }}
            animate={reduce ? { opacity: 1 } : { x: 0 }}
            exit={reduce ? { opacity: 0 } : { x: "100%" }}
            transition={{ duration: reduce ? 0 : 0.7, ease }}
          >
            <div className="flex items-center justify-between border-b border-line px-6 py-5">
              <h2 id="carrito-titulo" className="text-[1.75rem]">Tu carrito</h2>
              <button onClick={() => setOpen(false)} className="grid size-12 place-items-center rounded-full hover:bg-mint" aria-label="Cerrar carrito">
                <X size={22} weight="light" />
              </button>
            </div>

            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-start justify-center gap-6 px-6">
                <p className="max-w-[30ch] text-ink-soft">Todavía no has añadido nada. Si dudas entre dos productos, te ayudamos a elegir.</p>
                <ButtonLink href="/tienda" variant="ghost" onClick={() => setOpen(false)}>Ver la tienda</ButtonLink>
              </div>
            ) : (
              <>
                <ul className="flex-1 divide-y divide-line overflow-y-auto px-6">
                  <AnimatePresence initial={false}>
                    {lines.map((l) => (
                      <motion.li
                        key={l.handle}
                        layout={!reduce}
                        initial={{ opacity: 0, y: reduce ? 0 : 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, ease }}
                        className="flex gap-4 py-5"
                      >
                        <ImageSlot slot={l.slot} alt="" ratio="1/1" tone="mint" className="w-20 shrink-0 [&_span]:hidden" />
                        <div className="flex flex-1 flex-col gap-2">
                          <p className="leading-snug">{l.title}</p>
                          <p className="text-ink-soft">{formatMoney(l.price)}</p>
                          <div className="flex items-center gap-1">
                            <button className="grid size-11 place-items-center rounded-full border border-line hover:border-ink" onClick={() => setQty(l.handle, l.quantity - 1)} aria-label={`Quitar una unidad de ${l.title}`}>
                              <Minus size={16} />
                            </button>
                            <span className="w-8 text-center" aria-live="polite">{l.quantity}</span>
                            <button className="grid size-11 place-items-center rounded-full border border-line hover:border-ink" onClick={() => setQty(l.handle, l.quantity + 1)} aria-label={`Añadir una unidad de ${l.title}`}>
                              <Plus size={16} />
                            </button>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
                <div className="space-y-4 border-t border-line px-6 py-6">
                  <div className="flex items-baseline justify-between">
                    <span>Total</span>
                    <span className="font-serif text-[1.75rem]">{sumMoney(lines)}</span>
                  </div>
                  <p className="text-[0.9375rem] text-ink-soft">Pago con tarjeta, Bizum o a plazos. Los precios del prototipo son orientativos.</p>
                  <Button className="w-full" onClick={() => setDemoNote(true)}>Ir a pagar</Button>
                  {demoNote && (
                    <p role="status" className="rounded-[12px] bg-mint p-4 text-[0.9375rem]">
                      Esto es un prototipo: el pago está desactivado. Cuando conectemos Shopify, aquí se abre su caja segura.
                    </p>
                  )}
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
