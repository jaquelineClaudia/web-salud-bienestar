"use client";

import Link from "next/link";
import { useRef, type ComponentProps, type MouseEvent, type ReactNode } from "react";

type Variant = "primary" | "ghost" | "light";

const styles: Record<Variant, string> = {
  primary: "bg-ink text-paper hover:bg-[#173a34]",
  ghost: "border border-ink/40 text-ink hover:border-ink",
  light: "bg-paper text-ink hover:bg-white",
};

const base =
  "relative isolate inline-flex min-h-[52px] items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-full px-7 text-[1.0625rem] font-medium transition-[background-color,border-color,transform] duration-300 ease-calm active:scale-[0.98]";

/** Onda que nace donde se pulsa. Solo transform y opacity; se omite con reduce-motion. */
function useRipple() {
  const ref = useRef<HTMLElement | null>(null);
  const onPointerDown = (e: MouseEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const size = Math.hypot(r.width, r.height) * 2;
    const dot = document.createElement("span");
    dot.setAttribute("aria-hidden", "true");
    Object.assign(dot.style, {
      position: "absolute",
      left: `${e.clientX - r.left - size / 2}px`,
      top: `${e.clientY - r.top - size / 2}px`,
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: "50%",
      background: "currentColor",
      opacity: "0.18",
      transform: "scale(0)",
      zIndex: "-1",
      pointerEvents: "none",
      transition: "transform 900ms cubic-bezier(0.22,1,0.36,1), opacity 900ms ease",
    });
    el.appendChild(dot);
    requestAnimationFrame(() => {
      dot.style.transform = "scale(1)";
      dot.style.opacity = "0";
    });
    setTimeout(() => dot.remove(), 950);
  };
  return { ref, onPointerDown };
}

type Common = { variant?: Variant; children: ReactNode; className?: string };

export function ButtonLink({ variant = "primary", className = "", children, ...rest }: Common & ComponentProps<typeof Link>) {
  const { ref, onPointerDown } = useRipple();
  return (
    <Link
      ref={ref as React.Ref<HTMLAnchorElement>}
      onPointerDown={onPointerDown}
      className={`${base} ${styles[variant]} ${className}`}
      {...rest}
    >
      {children}
    </Link>
  );
}

export function Button({ variant = "primary", className = "", children, ...rest }: Common & ComponentProps<"button">) {
  const { ref, onPointerDown } = useRipple();
  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      onPointerDown={onPointerDown}
      className={`${base} ${styles[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
