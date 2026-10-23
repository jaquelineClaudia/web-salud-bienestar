import Link from "next/link";
import { RevealLines, FadeUp } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { HeroMedia } from "./HeroMedia";

export function Hero() {
  return (
    <section className="wrap grid min-h-[calc(100dvh-72px)] items-center gap-10 pb-16 pt-10 md:grid-cols-12 md:pt-16">
      <div className="md:col-span-6 lg:col-span-6">
        <RevealLines as="h1" onLoad className="text-[clamp(2.75rem,5.4vw,5rem)]">
          Cuidamos tu salud, <em className="italic">mejoramos</em> tu descanso.
        </RevealLines>
        <FadeUp delay={0.5}>
          <p className="mt-7 max-w-[34ch] text-[1.25rem] text-ink-soft">
            Colchones, masaje y hogar sano de Bioenergy Dreams, con asesoramiento en tu propia casa.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href="/tienda">Ver la tienda</ButtonLink>
            <ButtonLink href="/asesoramiento" variant="ghost">Pedir asesoramiento</ButtonLink>
          </div>
        </FadeUp>
      </div>
      <div className="relative md:col-span-6 md:col-start-7 lg:col-span-5 lg:col-start-8">
        <HeroMedia>
          <ImageSlot slot="hero-dormitorio" alt="Dormitorio luminoso con un colchón Bioenergy Dreams" ratio="4/5" priority sizes="(min-width: 768px) 45vw, 100vw" />
        </HeroMedia>
        <div className="absolute -bottom-8 -left-6 hidden w-[38%] md:block lg:-left-20">
          <Link href="/tienda/plancha-portatil-multifuncion" aria-label="Ver la plancha portátil multifunción" className="block transition-transform duration-700 ease-calm hover:-translate-y-1">
            <HeroMedia delay={0.35}>
              <ImageSlot slot="hero-detalle" alt="Plancha portátil multifunción" ratio="1/1" tone="mint" className="ring-8 ring-paper" />
            </HeroMedia>
          </Link>
        </div>
      </div>
    </section>
  );
}
