"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ImageSlot } from "@/components/ui/ImageSlot";
import type { ImageRef } from "@/lib/store/types";

export function Gallery({ images }: { images: ImageRef[] }) {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();
  const img = images[i];
  return (
    <div>
      <div className="relative">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={img.slot}
            initial={{ opacity: 0, scale: reduce ? 1 : 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <ImageSlot slot={img.slot} alt={img.altText} ratio="1/1" tone="mint" priority={i === 0} sizes="(min-width: 1024px) 55vw, 100vw" />
          </motion.div>
        </AnimatePresence>
      </div>
      <ul className="mt-4 grid grid-cols-4 gap-3" aria-label="Fotos del producto">
        {images.map((m, n) => (
          <li key={m.slot}>
            <button
              onClick={() => setI(n)}
              aria-label={`Ver foto ${n + 1}: ${m.altText}`}
              aria-pressed={i === n}
              className="block w-full rounded-[14px] ring-offset-2 ring-offset-paper transition aria-pressed:ring-2 aria-pressed:ring-ink"
            >
              <ImageSlot slot={m.slot} alt="" ratio="1/1" tone={n % 2 ? "sage" : "mint"} className="rounded-[14px] [&_span]:hidden" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
