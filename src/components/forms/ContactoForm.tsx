"use client";

import { FormShell } from "./FormShell";
import { Field, TextArea } from "./Fields";

export function ContactoForm() {
  return (
    <FormShell tipo="contacto" submitLabel="Enviar mensaje" success={<p className="font-serif text-[1.75rem] leading-snug">Mensaje recibido. Te respondemos enseguida.</p>}>
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Nombre" name="nombre" autoComplete="name" required />
        <Field label="Teléfono" name="telefono" type="tel" autoComplete="tel" hint="Teléfono o correo, el que prefieras." />
      </div>
      <Field label="Correo" name="email" type="email" autoComplete="email" />
      <TextArea label="Mensaje" name="mensaje" required />
    </FormShell>
  );
}
