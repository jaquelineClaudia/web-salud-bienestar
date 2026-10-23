"use client";

import { FormShell } from "./FormShell";
import { Field, TextArea } from "./Fields";

export function EmpleoForm() {
  return (
    <FormShell tipo="empleo" submitLabel="Enviar candidatura" success={<p className="font-serif text-[1.75rem] leading-snug">Gracias. Hemos recibido tu CV y te llamaremos si encajas en el puesto.</p>}>
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Nombre y apellidos" name="nombre" autoComplete="name" required />
        <Field label="Teléfono" name="telefono" type="tel" autoComplete="tel" required />
      </div>
      <Field label="Correo" name="email" type="email" autoComplete="email" required />
      <Field label="Disponibilidad" name="disponibilidad" placeholder="Mañanas, tardes, desde cuándo…" />
      <Field
        label="Tu CV"
        name="cv"
        type="file"
        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        required
        hint="PDF o Word, hasta 5 MB."
        className="[&_input]:py-3 [&_input]:file:mr-4 [&_input]:file:rounded-full [&_input]:file:border-0 [&_input]:file:bg-mint [&_input]:file:px-4 [&_input]:file:py-2"
      />
      <TextArea label="Cuéntanos algo de ti" name="mensaje" />
    </FormShell>
  );
}
