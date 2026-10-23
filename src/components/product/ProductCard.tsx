"use client";

import Link from "next/link";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { formatMoney } from "@/lib/store";
import type { Product } from "@/lib/store/types";

/** Ficha de producto en listados. Con ratón se inclina un poco hacia el puntero. */
export function ProductCard({ product }: { product: Product }) {
  const reduce = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rx = useSpring(useTransform(py, [0, 1], [3, -3]), { stiffness: 150, damping: 18 });
  const ry = useSpring(useTransform(px, [0, 1], [-4, 4]), { stiffness: 150, damping: 18 });

  const onMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const reset = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <Link href={`/tienda/${product.handle}`} onPointerMove={onMove} onPointerLeave={reset} className="group block [perspective:900px]">
      <motion.div style={reduce ? undefined : { rotateX: rx, rotateY: ry }} className="will-change-transform">
        <ImageSlot slot={product.featuredImage.slot} alt={product.featuredImage.altText} ratio="4/5" tone="sage" sizes="(min-width: 1024px) 26vw, 78vw" />
      </motion.div>
      <div className="mt-5 flex items-start justify-between gap-4">
        <h3 className="font-serif text-[1.5rem] leading-tight">{product.title}</h3>
      </div>
      <p className="mt-2 text-ink-soft">
        {formatMoney(product.price)}
        {product.price && product.priceIsProvisional && <span className="text-[0.875rem]"> · PVP orientativo</span>}
      </p>
    </Link>
  );
}
