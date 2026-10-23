"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/components/motion/gsap";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { ButtonLink } from "@/components/ui/Button";

const paneles = [
  { slot: "shiatsu-rollers", cifra: "8", texto: "rollers 3D que recorren cuello y espalda" },
  { slot: "shiatsu-airbags", cifra: "9", texto: "airbags de presión para envolver la zona" },
  { slot: "shiatsu-calor", cifra: "3", texto: "intensidades y calor por infrarrojos" },
  { slot: "shiatsu-plegado", cifra: "15", texto: "minutos y se apaga solo. Luego se pliega" },
];

/**
 * Segundo acto: bienestar. En escritorio, la sección se fija y el contenido avanza en horizontal
 * con el scroll. En móvil o con reduce-motion, es un carril que se desliza con el dedo.
 */
export function Bienestar() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const el = track.current!;
        const pan = gsap.to(el, {
          x: () => Math.min(0, window.innerWidth - el.scrollWidth),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            pin: true,
            start: "top top",
            end: () => `+=${Math.max(0, el.scrollWidth - window.innerWidth)}`,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
        gsap.utils.toArray<HTMLElement>(".panel-cifra", el).forEach((n) => {
          gsap.from(n, { yPercent: 40, autoAlpha: 0, duration: 1, scrollTrigger: { trigger: n, containerAnimation: pan, start: "left 85%", toggleActions: "play none none reverse" } });
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="bienestar-titulo" className="overflow-hidden bg-mint lg:flex lg:min-h-[100dvh] lg:items-center lg:pt-[72px]">
      <div
        ref={track}
        className="flex snap-x snap-mandatory scroll-px-5 md:scroll-px-12 gap-6 overflow-x-auto px-5 py-24 md:px-12 lg:w-max lg:snap-none lg:overflow-visible lg:py-0"
      >
        <div className="flex w-[82vw] shrink-0 snap-start flex-col justify-center gap-6 sm:w-[60vw] lg:w-[34vw] lg:pr-10">
          <h2 id="bienestar-titulo" className="text-[clamp(2.25rem,3.8vw,3.5rem)]">
            Un rato para ti, en tu sillón de siempre.
          </h2>
          <p className="max-w-[36ch] text-ink-soft">
            El centro de masaje Shiatsu ZEN Premium se coloca sobre una silla o un sofá. Datos según el fabricante.
          </p>
          <div>
            <ButtonLink href="/tienda/centro-masaje-shiatsu-zen-premium" variant="ghost">Ver el Shiatsu ZEN</ButtonLink>
          </div>
        </div>
        <div className="w-[82vw] shrink-0 snap-start sm:w-[60vw] lg:w-[30vw]">
          <ImageSlot slot="shiatsu-sillon" alt="Hombre mayor relajado con el centro de masaje en su sillón" ratio="4/5" tone="sage" sizes="40vw" />
        </div>
        {paneles.map((p, i) => (
          <figure key={p.slot} className={`flex w-[70vw] shrink-0 snap-start flex-col gap-5 sm:w-[44vw] lg:w-[22vw] ${i % 2 ? "lg:pt-14" : "lg:pb-14"}`}>
            <ImageSlot slot={p.slot} alt="" ratio={i % 2 ? "1/1" : "4/5"} tone="sage" sizes="25vw" />
            <figcaption className="flex items-baseline gap-4">
              <span className="panel-cifra font-serif text-[clamp(3.5rem,6vw,5.5rem)] leading-none">{p.cifra}</span>
              <span className="max-w-[18ch] text-[1.0625rem] leading-snug">{p.texto}</span>
            </figcaption>
          </figure>
        ))}
        <div aria-hidden className="w-[6vw] shrink-0" />
      </div>
    </section>
  );
}
