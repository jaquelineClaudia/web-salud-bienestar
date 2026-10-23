"use client";

import { useRef, useState, type FormEvent, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { CheckCircle } from "@phosphor-icons/react";
import { Button } from "@/components/ui/Button";
import { Consent, Honeypot } from "./Fields";

type Props = {
  tipo: string;
  submitLabel: string;
  success: ReactNode | ((data: FormData) => ReactNode);
  children: ReactNode;
  encType?: "multipart/form-data";
};

/** Envía el formulario a /api/formulario y muestra estados de envío, éxito y error. */
export function FormShell({ tipo, submitLabel, success, children }: Props) {
  const [state, setState] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [error, setError] = useState("");
  const sent = useRef<FormData | null>(null);
  const reduce = useReducedMotion();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    data.set("tipo", tipo);
    setState("sending");
    setError("");
    try {
      const res = await fetch("/api/formulario", { method: "POST", body: data });
      const json = await res.json();
      if (!json.ok) throw new Error(json.error);
      sent.current = data;
      setState("ok");
    } catch (err) {
      setError(err instanceof Error && err.message ? err.message : "No hemos podido enviarlo. Inténtalo de nuevo.");
      setState("error");
    }
  };

  return (
    <AnimatePresence mode="wait" initial={false}>
      {state === "ok" ? (
        <motion.div
          key="ok"
          role="status"
          initial={{ opacity: 0, y: reduce ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-[20px] bg-mint p-8"
        >
          <CheckCircle size={40} weight="light" aria-hidden />
          <div className="mt-4 text-[1.1875rem]">{typeof success === "function" ? success(sent.current!) : success}</div>
        </motion.div>
      ) : (
        <motion.form key="form" onSubmit={onSubmit} exit={{ opacity: 0 }} className="relative grid gap-6" noValidate={false}>
          <Honeypot />
          {children}
          <Consent />
          {state === "error" && (
            <p role="alert" className="rounded-[12px] border border-[#9b2c2c]/40 bg-[#fbeeee] p-4 text-[#7a1f1f]">{error}</p>
          )}
          <div>
            <Button type="submit" disabled={state === "sending"} className="disabled:opacity-60">
              {state === "sending" ? "Enviando…" : submitLabel}
            </Button>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
