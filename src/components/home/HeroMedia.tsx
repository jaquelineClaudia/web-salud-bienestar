"use client";

import { useRef, type ReactNode } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/components/motion/gsap";

/** Entrada de la foto principal: se descubre de abajo arriba con un leve zoom de salida. */
export function HeroMedia({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(ref.current, { clipPath: "inset(100% 0% 0% 0% round 20px)" }, { clipPath: "inset(0% 0% 0% 0% round 20px)", duration: 1.6, ease: "expo.inOut", delay: 0.15 + delay });
        gsap.from(ref.current!.firstElementChild, { scale: 1.12, duration: 2.2, ease: "power3.out", delay: 0.15 + delay });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );
  return <div ref={ref} className="overflow-hidden rounded-[20px]">{children}</div>;
}
