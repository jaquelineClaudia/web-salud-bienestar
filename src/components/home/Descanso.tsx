import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { FadeUp, Parallax, RevealLines } from "@/components/motion/Reveal";
import { ImageSlot } from "@/components/ui/ImageSlot";

export function Descanso() {
  return (
    <section aria-labelledby="descanso-titulo" className="wrap grid items-end gap-10 py-28 md:grid-cols-12 md:py-40">
      <Parallax className="md:col-span-7" amount={10}>
        <ImageSlot slot="descanso-colchon" alt="Colchón de muelles ensacados en un dormitorio luminoso" ratio="5/4" sizes="(min-width: 768px) 58vw, 100vw" />
      </Parallax>
      <div className="md:col-span-4 md:col-start-9 md:pb-10">
        <RevealLines id="descanso-titulo" className="text-[clamp(2.25rem,3.8vw,3.5rem)]">
          Un colchón hecho aquí, a tu medida.
        </RevealLines>
        <FadeUp>
          <p className="mt-6 text-ink-soft">
            Muelles ensacados fabricados en España, en las colecciones Hi-Tech e i-Nature. Vamos a tu casa con muestras y elegimos juntos firmeza y medida.
          </p>
          <ul className="mt-8 space-y-2 border-t border-line pt-6 text-[1.0625rem]">
            <li>Colchones, toppers y almohadas</li>
            <li>Camas articuladas y canapés</li>
            <li>Nórdicos para cada estación</li>
          </ul>
          <Link href="/tienda?categoria=descanso" className="group mt-8 inline-flex min-h-[48px] items-center gap-2 text-[1.125rem] underline underline-offset-[6px]">
            Ver descanso
            <ArrowRight size={20} weight="light" className="transition-transform duration-500 ease-calm group-hover:translate-x-1" />
          </Link>
        </FadeUp>
      </div>
    </section>
  );
}
