import Link from "next/link";
import { FadeUp, RevealLines } from "@/components/motion/Reveal";
import { ImageSlot } from "@/components/ui/ImageSlot";

export function HogarSano() {
  return (
    <section aria-labelledby="hogar-titulo" className="wrap py-28 md:py-40">
      <RevealLines id="hogar-titulo" className="max-w-[14ch] text-[clamp(2.25rem,3.8vw,3.5rem)]">
        Y en casa, todo más fácil.
      </RevealLines>
      <div className="mt-14 grid gap-6 md:grid-cols-12 md:grid-rows-[auto_auto]">
        <FadeUp className="md:col-span-7 md:row-span-2">
          <Link href="/tienda/plancha-portatil-multifuncion" className="group block">
            <ImageSlot slot="plancha-principal" alt="Plancha portátil multifunción en su base" ratio="4/5" tone="mint" className="transition-transform duration-700 ease-calm group-hover:scale-[0.99]" sizes="(min-width: 768px) 58vw, 100vw" />
            <div className="mt-5 flex flex-wrap items-baseline justify-between gap-3">
              <h3 className="text-[2rem]">Plancha portátil multifunción</h3>
              <span className="text-ink-soft">Vapor con ozono y UV-C, en menos de 40 s*</span>
            </div>
          </Link>
        </FadeUp>
        <FadeUp delay={0.1} className="md:col-span-5">
          <Link href="/tienda/aspirador-sin-cables-cyclone-led" className="group grid grid-cols-[1fr_1.1fr] items-end gap-5 rounded-[20px] bg-mint p-5">
            <ImageSlot slot="aspirador-principal" alt="Aspirador sin cables Cyclone LED" ratio="3/4" tone="sage" sizes="20vw" />
            <div className="pb-2">
              <h3 className="text-[1.625rem]">Aspirador sin cables</h3>
              <p className="mt-2 text-[1rem] text-ink-soft">Filtro HEPA 13 y hasta 40 min de batería en modo Eco*.</p>
            </div>
          </Link>
        </FadeUp>
        <FadeUp delay={0.2} className="md:col-span-4 md:col-start-9">
          <Link href="/tienda/biopure-water" className="group block">
            <ImageSlot slot="biopure" alt="Equipo BIOPURE WATER en una cocina" ratio="1/1" tone="sage" sizes="30vw" />
            <h3 className="mt-4 text-[1.625rem]">BIOPURE WATER</h3>
          </Link>
        </FadeUp>
      </div>
      <p className="mt-10 text-[0.9375rem] text-ink-soft">* Según el fabricante.</p>
    </section>
  );
}
