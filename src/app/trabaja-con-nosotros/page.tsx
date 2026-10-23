import type { Metadata } from "next";
import { RevealLines } from "@/components/motion/Reveal";
import { EmpleoForm } from "@/components/forms/EmpleoForm";

export const metadata: Metadata = {
  title: "Trabaja con nosotros: comercial a media jornada en Leganés",
  description: "Buscamos comercial a media jornada en Leganés. Sueldo fijo más comisiones y formación. Envíanos tu CV.",
};

const puntos = [
  ["Jornada", "Media jornada"],
  ["Sueldo", "Fijo más comisiones"],
  ["Formación", "A cargo de la empresa, sobre todos los productos"],
  ["Dónde", "Leganés y alrededores, con visitas a domicilio"],
];

export default function EmpleoPage() {
  return (
    <div className="wrap grid gap-14 pb-28 pt-12 md:pt-20 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <RevealLines as="h1" onLoad className="text-[clamp(2.5rem,5vw,4.25rem)]">Buscamos comercial a media jornada.</RevealLines>
        <p className="mt-6 max-w-[42ch] text-[1.25rem] text-ink-soft">
          Si te gusta tratar con la gente y explicar las cosas con calma, nos encantará conocerte. No hace falta experiencia en el sector: te formamos.
        </p>
        <dl className="mt-10 divide-y divide-line border-y border-line">
          {puntos.map(([k, v]) => (
            <div key={k} className="grid grid-cols-[8rem_1fr] gap-4 py-4">
              <dt className="text-ink-soft">{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="lg:col-span-6 lg:col-start-7">
        <h2 className="mb-8 text-[2rem]">Envíanos tu candidatura</h2>
        <EmpleoForm />
      </div>
    </div>
  );
}
