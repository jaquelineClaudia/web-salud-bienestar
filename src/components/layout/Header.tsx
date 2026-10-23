"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { List, ShoppingBag, X } from "@phosphor-icons/react";
import { nav } from "@/lib/site";
import { useCart } from "@/components/cart/store";

export function Header() {
  const pathname = usePathname();
  const [menu, setMenu] = useState(false);
  const { lines, setOpen, bump } = useCart();
  const count = lines.reduce((n, l) => n + l.quantity, 0);
  const reduce = useReducedMotion();
  // Evita desajuste de hidratación: el carrito guardado solo existe en el navegador.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  useEffect(() => setMenu(false), [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line/60 bg-paper/85 backdrop-blur-md">
      <div className="wrap flex h-[72px] items-center justify-between gap-6">
        <Link href="/" className="flex flex-col leading-none" aria-label="Salud Bienestar Publicaciones, inicio">
          <span className="font-serif text-[1.375rem] tracking-[-0.01em]">Salud Bienestar</span>
          <span className="mt-1 text-[0.8125rem] text-ink-soft">Publicaciones · Leganés</span>
        </Link>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {nav.map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  aria-current={pathname.startsWith(n.href) ? "page" : undefined}
                  className="relative py-2 text-[1.0625rem] after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-ink after:transition-transform after:duration-500 after:ease-calm hover:after:scale-x-100 aria-[current=page]:after:scale-x-100"
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <button
            data-cart-target
            onClick={() => setOpen(true)}
            className="relative grid size-12 place-items-center rounded-full hover:bg-mint"
            aria-label={`Abrir carrito${mounted && count ? `, ${count} productos` : ""}`}
          >
            <ShoppingBag size={26} weight="light" />
            <AnimatePresence>
              {mounted && count > 0 && (
                <motion.span
                  key={bump}
                  initial={reduce ? false : { scale: 0.4 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                  className="absolute right-0.5 top-0.5 grid min-w-6 place-items-center rounded-full bg-ink px-1.5 text-[0.8125rem] font-semibold leading-6 text-paper"
                >
                  {count}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
          <button
            className="grid size-12 place-items-center rounded-full hover:bg-mint lg:hidden"
            onClick={() => setMenu((m) => !m)}
            aria-expanded={menu}
            aria-controls="menu-movil"
            aria-label={menu ? "Cerrar menú" : "Abrir menú"}
          >
            {menu ? <X size={26} weight="light" /> : <List size={26} weight="light" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menu && (
          <motion.nav
            id="menu-movil"
            aria-label="Menú"
            initial={{ opacity: 0, y: reduce ? 0 : -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="border-t border-line bg-paper lg:hidden"
          >
            <ul className="wrap flex flex-col py-4">
              {nav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="block py-3 font-serif text-[2rem]">{n.label}</Link>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
