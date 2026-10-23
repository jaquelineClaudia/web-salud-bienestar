"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { gsap } from "@/components/motion/gsap";
import { useCart } from "./store";
import type { Product } from "@/lib/store/types";

type Props = {
  product: Pick<Product, "handle" | "title" | "price" | "featuredImage">;
  label?: string;
  variant?: "primary" | "ghost";
  openAfter?: boolean;
  className?: string;
};

/** Añade al carrito con una bolita que vuela hasta el icono del carrito. */
export function AddToCart({ product, label = "Añadir al carrito", variant = "primary", openAfter = true, className }: Props) {
  const add = useCart((s) => s.add);
  const setOpen = useCart((s) => s.setOpen);
  const wrap = useRef<HTMLSpanElement>(null);

  const onClick = () => {
    add({ handle: product.handle, title: product.title, price: product.price, slot: product.featuredImage.slot });
    const target = document.querySelector<HTMLElement>("[data-cart-target]");
    const from = wrap.current?.getBoundingClientRect();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!target || !from || reduce) {
      if (openAfter) setOpen(true);
      return;
    }
    const to = target.getBoundingClientRect();
    const dot = document.createElement("span");
    dot.setAttribute("aria-hidden", "true");
    Object.assign(dot.style, {
      position: "fixed",
      left: `${from.left + from.width / 2 - 10}px`,
      top: `${from.top + from.height / 2 - 10}px`,
      width: "20px",
      height: "20px",
      borderRadius: "50%",
      background: "var(--sage)",
      zIndex: "70",
      pointerEvents: "none",
    });
    document.body.appendChild(dot);
    const dx = to.left + to.width / 2 - (from.left + from.width / 2);
    const dy = to.top + to.height / 2 - (from.top + from.height / 2);
    gsap
      .timeline({ onComplete: () => { dot.remove(); if (openAfter) setOpen(true); } })
      .to(dot, { x: dx, duration: 0.75, ease: "power2.inOut" }, 0)
      .to(dot, { y: dy, duration: 0.75, ease: "back.in(1.4)" }, 0)
      .to(dot, { scale: 0.4, duration: 0.75, ease: "power1.in" }, 0);
  };

  return (
    <span ref={wrap} className={className}>
      <Button variant={variant} onClick={onClick} className="w-full">
        {label}
      </Button>
    </span>
  );
}
