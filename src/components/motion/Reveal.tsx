"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, MOTION_OK, SplitText, useGSAP } from "./gsap";

type Props = { as?: ElementType; children: ReactNode; className?: string; delay?: number; onLoad?: boolean; id?: string };

/** Titular que se revela línea a línea al entrar en pantalla. */
export function RevealLines({ as: Tag = "h2", children, className, delay = 0, onLoad = false, id }: Props) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      const el = ref.current!;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const split = SplitText.create(el, {
          type: "lines",
          mask: "lines",
          linesClass: "pb-[0.08em]",
          autoSplit: true,
          onSplit(self) {
            gsap.set(el, { visibility: "visible" });
            return gsap.from(self.lines, {
              yPercent: 110,
              duration: 1.3,
              ease: "expo.out",
              stagger: 0.1,
              delay,
              scrollTrigger: onLoad ? undefined : { trigger: el, start: "top 88%", once: true },
            });
          },
        });
        return () => split.revert();
      });
      return () => mm.revert();
    },
    { scope: ref },
  );
  return (
    <Tag ref={ref} data-reveal className={className} id={id}>
      {children}
    </Tag>
  );
}

/** Aparición suave de un bloque al entrar en pantalla. */
export function FadeUp({ children, className, delay = 0, as: Tag = "div" }: Omit<Props, "onLoad">) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from(ref.current, {
          autoAlpha: 0,
          y: 32,
          duration: 1.2,
          delay,
          scrollTrigger: { trigger: ref.current, start: "top 90%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );
  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}

/** Parallax ligero: el hijo se desplaza un poco más lento que la página. */
export function Parallax({ children, className, amount = 8 }: { children: ReactNode; className?: string; amount?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          ref.current!.firstElementChild,
          { yPercent: -amount / 2 },
          {
            yPercent: amount / 2,
            ease: "none",
            scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: 1.2 },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: ref },
  );
  return (
    <div ref={ref} className={`overflow-hidden rounded-[20px] ${className ?? ""}`}>
      <div className="scale-[1.1]">{children}</div>
    </div>
  );
}
