"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "@/components/motion/gsap";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { resolveSlot } from "@/lib/media";
import type { ExplodedPart } from "@/lib/store/types";

// Capas recortadas de la foto del catálogo: la plancha y su base, del mismo tamaño para encajar.
const LAYERS = {
  cuerpo: "/fotos/fabricante/plancha_cuerpo.webp",
  base: "/fotos/fabricante/plancha_base.webp",
};

// Separación de las capas en la vista despiezada (% de su propio alto).
const LIFT = { cuerpo: { yPercent: -24, rotate: -4 }, base: { yPercent: 12 } };

/**
 * Despiece animado de la plancha. En escritorio la sección queda fija: al bajar, la plancha
 * sale de su base y se marcan sus partes una a una; al final vuelve a encajar.
 */
export function Despiece({ parts }: { parts: ExplodedPart[] }) {
  const root = useRef<HTMLElement>(null);
  const hasPhotos = Boolean(resolveSlot("plancha-sin-base").src);

  useGSAP(
    () => {
      if (!hasPhotos) return;
      const q = gsap.utils.selector(root);
      const layer = (id: string) => q(`[data-layer="${id}"]`);
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.set(q("[data-mark]"), { autoAlpha: 0, scale: 0.6 });
        gsap.set(q("[data-note]"), { opacity: 0.32 });
        const tl = gsap.timeline({
          defaults: { duration: 1, ease: "power2.inOut" },
          scrollTrigger: { trigger: root.current, start: "top top", end: "+=280%", pin: true, scrub: 1.2 },
        });
        tl.to(layer("cuerpo"), { ...LIFT.cuerpo, duration: 1.4 });
        tl.to(layer("base"), { ...LIFT.base, duration: 1.4 }, "<");
        parts.forEach((p) => {
          tl.to(q(`[data-mark="${p.id}"]`), { autoAlpha: 1, scale: 1, duration: 0.6, ease: "power3.out" }, "+=0.2");
          tl.to(q(`[data-note="${p.id}"]`), { opacity: 1, duration: 0.6 }, "<");
        });
        tl.to({}, { duration: 1.2 });
        // Vuelve a encajar.
        tl.to(q("[data-mark]"), { autoAlpha: 0, duration: 0.5 });
        tl.to(q("[data-layer]"), { yPercent: 0, rotate: 0, duration: 1.4, ease: "power3.inOut" }, "<");
        tl.to(q("[data-note]"), { opacity: 0.32, duration: 0.8 }, "<");
      });

      mm.add("(max-width: 1023px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.set(q("[data-mark]"), { autoAlpha: 0 });
        const tl = gsap.timeline({
          defaults: { duration: 1.2, ease: "power3.inOut" },
          scrollTrigger: { trigger: q("[data-stage]")[0], start: "top 70%", toggleActions: "play none none reverse" },
        });
        tl.to(layer("cuerpo"), LIFT.cuerpo, 0).to(layer("base"), LIFT.base, 0);
        tl.to(q("[data-mark]"), { autoAlpha: 1, duration: 0.5, stagger: 0.12 });
      });

      // Sin animaciones: la vista despiezada, fija, con todas las marcas.
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(layer("cuerpo"), LIFT.cuerpo);
        gsap.set(layer("base"), LIFT.base);
      });

      return () => mm.revert();
    },
    { scope: root, dependencies: [parts, hasPhotos] },
  );

  const marks = (l: ExplodedPart["layer"]) =>
    parts.map((p, i) =>
      p.layer !== l ? null : (
        <span key={p.id} data-mark={p.id} className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2" style={{ left: `${p.x}%`, top: `${p.y}%` }}>
          <span className="grid size-8 place-items-center rounded-full bg-ink text-[0.9375rem] font-semibold text-paper ring-4 ring-paper/80">{i + 1}</span>
          <span className="hidden whitespace-nowrap rounded-full bg-paper/95 px-3 py-1 text-[0.9375rem] shadow-[0_6px_16px_rgb(15_38_34/0.12)] xl:inline">{p.name}</span>
        </span>
      ),
    );

  return (
    <section ref={root} aria-labelledby="despiece-titulo" className="overflow-hidden bg-paper">
      <div className="wrap grid min-h-[100dvh] items-center gap-12 pb-12 pt-24 lg:grid-cols-12 lg:pt-[104px]">
        <div className="lg:col-span-6 lg:col-start-1 xl:col-span-6">
          {hasPhotos ? (
            <div data-stage className="relative px-[4%] py-[14%]">
              <div className="relative w-full" style={{ aspectRatio: "927 / 615" }} role="img" aria-label="La plancha separada de su base, con sus partes numeradas">
                <div data-layer="base" className="absolute inset-0">
                  <Image src={LAYERS.base} alt="" fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-contain" />
                  {marks("base")}
                </div>
                <div data-layer="cuerpo" className="absolute inset-0 drop-shadow-[0_30px_30px_rgb(15_38_34/0.18)]">
                  <Image src={LAYERS.cuerpo} alt="" fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-contain" />
                  {marks("cuerpo")}
                </div>
              </div>
            </div>
          ) : (
            <ImageSlot slot="plancha-sin-base" alt="Plancha portátil multifunción" ratio="927/615" tone="mint" />
          )}
        </div>
        <div className="lg:col-span-4 lg:col-start-9">
          <h2 id="despiece-titulo" className="text-[clamp(2.25rem,3.6vw,3.25rem)]">Por dentro, pieza a pieza.</h2>
          <ol className="mt-10 space-y-7">
            {parts.map((p, i) => (
              <li key={p.id} data-note={p.id} className="grid grid-cols-[2rem_1fr] gap-4">
                <span aria-hidden className="grid size-8 place-items-center rounded-full border border-ink text-[0.9375rem] font-semibold">{i + 1}</span>
                <div>
                  <h3 className="font-serif text-[1.5rem] leading-tight">{p.name}</h3>
                  <p className="mt-1 text-[1.0625rem] text-ink-soft">{p.detail}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-8 text-[0.9375rem] text-ink-soft">Características según el fabricante.</p>
        </div>
      </div>
    </section>
  );
}
