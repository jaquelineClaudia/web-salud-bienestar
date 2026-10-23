import type { Metadata } from "next";
import { Suspense } from "react";
import { House, VideoCamera, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { AsesoramientoForm } from "@/components/forms/AsesoramientoForm";
import { RevealLines } from "@/components/motion/Reveal";
import { getProducts } from "@/lib/store";
import { site, whatsappUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Asesoramiento y demostración en casa o por videollamada",
  description: "Pide una visita a domicilio en Leganés y Madrid o una videollamada. Eliges el día y la hora. Sin compromiso.",
};

export default async function AsesoramientoPage() {
  const products = (await getProducts()).map(({ handle, title }) => ({ handle, title }));
  return (
    <div className="wrap grid gap-14 pb-28 pt-12 md:pt-20 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <RevealLines as="h1" onLoad className="text-[clamp(2.5rem,5vw,4.25rem)]">Te lo enseñamos antes de que decidas.</RevealLines>
        <p className="mt-6 max-w-[42ch] text-[1.25rem] text-ink-soft">
          Elige el día y la hora que mejor te vengan. Te llamamos para confirmarlo. {site.horario}.
        </p>
        <ul className="mt-10 space-y-6">
          <li className="flex gap-4">
            <House size={30} weight="light" aria-hidden className="shrink-0" />
            <div>
              <h2 className="text-[1.5rem]">En tu casa</h2>
              <p className="text-ink-soft">Vamos con muestras a Leganés y la Comunidad de Madrid, y lo pruebas en tu propio dormitorio o salón.</p>
            </div>
          </li>
          <li className="flex gap-4">
            <VideoCamera size={30} weight="light" aria-hidden className="shrink-0" />
            <div>
              <h2 className="text-[1.5rem]">Por videollamada</h2>
              <p className="text-ink-soft">Por WhatsApp o por enlace. Te enseñamos el producto en directo y resolvemos tus dudas.</p>
            </div>
          </li>
        </ul>
        <a href={whatsappUrl("Hola, me gustaría pedir una cita de asesoramiento.")} target="_blank" rel="noopener" className="mt-10 inline-flex min-h-[52px] items-center gap-3 rounded-full border border-ink px-6">
          <WhatsappLogo size={24} weight="light" aria-hidden /> Prefiero escribir por WhatsApp
        </a>
      </div>
      <div className="lg:col-span-6 lg:col-start-7">
        <Suspense>
          <AsesoramientoForm products={products} />
        </Suspense>
      </div>
    </div>
  );
}
