"use client";

import { useRef } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/components/motion/gsap";

const frases = [
  "Llegas a casa con el día encima.",
  "Te acuestas y das vueltas.",
  "Suena el despertador y sigues cansado.",
];

/**
 * Primer acto de la historia. Sección fijada: la página se oscurece hasta el verde noche
 * y aparecen las frases una a una. Es el único cambio de tema de toda la web.
 */
export function Cansancio() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const q = gsap.utils.selector(root);
        gsap.set(q(".frase"), { autoAlpha: 0, y: 40 });
        gsap.set(q(".giro"), { autoAlpha: 0, y: 40 });
        gsap.set(q(".escena"), { backgroundColor: "#f3f5f1", color: "#1f4a42" });
        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          scrollTrigger: { trigger: root.current, start: "top top", end: "+=320%", pin: q(".escena")[0], scrub: 1.2 },
        });
        tl.to(q(".escena"), { backgroundColor: "#0f2622", color: "#e4eee8", duration: 1 });
        q(".frase").forEach((el, i) => {
          tl.to(el, { autoAlpha: 1, y: 0, duration: 0.8 }, i === 0 ? "-=0.3" : "+=0.2");
          tl.to(el, { autoAlpha: 0.28, duration: 0.6 }, "+=0.5");
        });
        tl.to(q(".giro"), { autoAlpha: 1, y: 0, duration: 0.9 }, "+=0.2");
        // La noche se aclara: volvemos al blanco roto antes de entrar en "Descanso".
        tl.to(q(".frase"), { autoAlpha: 0, duration: 0.6 }, "+=0.5");
        tl.to(q(".escena"), { backgroundColor: "#f3f5f1", color: "#1f4a42", duration: 1 }, "<");
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="cansancio-titulo" className="relative">
      <div className="escena flex min-h-[100dvh] items-center bg-night text-night-ink">
        <div className="wrap grid gap-10 py-24 md:grid-cols-12">
          <h2 id="cansancio-titulo" className="sr-only">Cuando el cansancio se acumula</h2>
          <div className="space-y-5 md:col-span-8 md:col-start-2">
            {frases.map((f) => (
              <p key={f} className="frase font-serif text-[clamp(2rem,4.6vw,4rem)] leading-[1.1]">
                {f}
              </p>
            ))}
          </div>
          <p className="giro max-w-[30ch] text-[1.375rem] md:col-span-4 md:col-start-8">
            Empecemos por la noche. Un buen descanso cambia cómo empieza el día.
          </p>
        </div>
      </div>
    </section>
  );
}
