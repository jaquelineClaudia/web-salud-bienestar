"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { ArrowUpRight } from "@phosphor-icons/react";
import { ImageSlot } from "@/components/ui/ImageSlot";
import type { Collection } from "@/lib/store/types";

/** Lista tipográfica de categorías. Con ratón, la foto de cada una sigue al puntero. */
export function Categorias({ items }: { items: Collection[] }) {
  const [active, setActive] = useState<number | null>(null);
  const box = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 120, damping: 20 });
  const sy = useSpring(y, { stiffness: 120, damping: 20 });

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !box.current) return;
    const r = box.current.getBoundingClientRect();
    x.set(e.clientX - r.left);
    y.set(e.clientY - r.top);
  };

  return (
    <section aria-labelledby="categorias-titulo" className="wrap py-28 md:py-36">
      <h2 id="categorias-titulo" className="mb-10 text-[clamp(1.75rem,2.6vw,2.25rem)] text-ink-soft">Lo que encontrarás en la tienda</h2>
      <div ref={box} className="relative" onPointerMove={onMove} onPointerLeave={() => setActive(null)}>
        <ul className="border-t border-line">
          {items.map((c, i) => (
            <li key={c.handle} className="border-b border-line">
              <Link
                href={`/tienda?categoria=${c.handle}`}
                onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
                onFocus={() => setActive(null)}
                className="group grid grid-cols-[1fr_auto] items-center gap-6 py-7 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_auto] md:py-9"
              >
                <span className="font-serif text-[clamp(2.25rem,5vw,4.5rem)] leading-none transition-transform duration-700 ease-calm group-hover:translate-x-3">
                  {c.title}
                </span>
                <span className="hidden max-w-[40ch] text-[1.0625rem] text-ink-soft md:block">{c.description}</span>
                <ArrowUpRight size={32} weight="light" className="transition-transform duration-500 ease-calm group-hover:-translate-y-1 group-hover:translate-x-1" />
              </Link>
            </li>
          ))}
        </ul>
        {!reduce && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute left-0 top-0 hidden w-[240px] md:block"
            style={{ x: sx, y: sy, translateX: "-50%", translateY: "-60%" }}
            animate={{ opacity: active === null ? 0 : 1, scale: active === null ? 0.9 : 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {items.map((c, i) => (
              <div key={c.handle} className={active === i ? "block" : "hidden"}>
                <ImageSlot slot={c.image.slot} alt="" ratio="4/5" tone={i % 2 ? "sage" : "mint"} className="shadow-[0_24px_50px_rgb(15_38_34/0.2)]" />
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
