import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

const control =
  "w-full rounded-[12px] border border-ink/35 bg-white/70 px-4 text-[1.0625rem] text-ink placeholder:text-ink-soft/80 focus:border-ink focus:outline-none focus-visible:outline-3 focus-visible:outline-offset-2 aria-[invalid=true]:border-[#9b2c2c]";

type FieldProps = { label: string; name: string; hint?: string; required?: boolean; className?: string };

export function Field({ label, name, hint, required, className = "", ...rest }: FieldProps & ComponentProps<"input">) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={name} className="text-[1rem] font-medium">
        {label} {!required && <span className="font-normal text-ink-soft">(opcional)</span>}
      </label>
      <input id={name} name={name} required={required} aria-describedby={hint ? `${name}-ayuda` : undefined} className={`${control} min-h-[52px]`} {...rest} />
      {hint && <p id={`${name}-ayuda`} className="text-[0.9375rem] text-ink-soft">{hint}</p>}
    </div>
  );
}

export function TextArea({ label, name, hint, required, className = "", ...rest }: FieldProps & ComponentProps<"textarea">) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={name} className="text-[1rem] font-medium">
        {label} {!required && <span className="font-normal text-ink-soft">(opcional)</span>}
      </label>
      <textarea id={name} name={name} required={required} rows={4} aria-describedby={hint ? `${name}-ayuda` : undefined} className={`${control} py-3`} {...rest} />
      {hint && <p id={`${name}-ayuda`} className="text-[0.9375rem] text-ink-soft">{hint}</p>}
    </div>
  );
}

export function Select({ label, name, required, children, className = "", ...rest }: FieldProps & ComponentProps<"select"> & { children: ReactNode }) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={name} className="text-[1rem] font-medium">
        {label} {!required && <span className="font-normal text-ink-soft">(opcional)</span>}
      </label>
      <select id={name} name={name} required={required} className={`${control} min-h-[52px]`} {...rest}>
        {children}
      </select>
    </div>
  );
}

/** Casilla de consentimiento RGPD, obligatoria en todos los formularios. */
export function Consent() {
  return (
    <div className="flex items-start gap-3">
      <input id="consentimiento" name="consentimiento" type="checkbox" value="si" required className="mt-1 size-6 shrink-0 accent-[#1f4a42]" />
      <label htmlFor="consentimiento" className="text-[1rem]">
        He leído la <Link href="/legal/privacidad" className="underline underline-offset-4">política de privacidad</Link> y acepto que
        Publicaciones Martín Casado S.L. use mis datos para responder a esta petición.
      </label>
    </div>
  );
}

/** Campo trampa para bots: oculto a personas y lectores de pantalla. */
export function Honeypot() {
  return (
    <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label>
        No rellenar <input type="text" name="web" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}
