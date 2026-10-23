"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { CartLine } from "@/lib/store/types";

type CartState = {
  lines: CartLine[];
  open: boolean;
  bump: number; // cambia en cada añadido, para animar el icono
  add: (line: Omit<CartLine, "quantity">) => void;
  setQty: (handle: string, quantity: number) => void;
  setOpen: (open: boolean) => void;
};

// Almacenamiento seguro: si el navegador bloquea localStorage, el carrito funciona en memoria.
const safeStorage = createJSONStorage(() => {
  try {
    const k = "__sbp";
    localStorage.setItem(k, k);
    localStorage.removeItem(k);
    return localStorage;
  } catch {
    const mem = new Map<string, string>();
    return {
      getItem: (k: string) => mem.get(k) ?? null,
      setItem: (k: string, v: string) => void mem.set(k, v),
      removeItem: (k: string) => void mem.delete(k),
    };
  }
});

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
      open: false,
      bump: 0,
      add: (line) =>
        set((s) => {
          const found = s.lines.find((l) => l.handle === line.handle);
          const lines = found
            ? s.lines.map((l) => (l.handle === line.handle ? { ...l, quantity: l.quantity + 1 } : l))
            : [...s.lines, { ...line, quantity: 1 }];
          return { lines, bump: s.bump + 1 };
        }),
      setQty: (handle, quantity) =>
        set((s) => ({
          lines: quantity <= 0 ? s.lines.filter((l) => l.handle !== handle) : s.lines.map((l) => (l.handle === handle ? { ...l, quantity } : l)),
        })),
      setOpen: (open) => set({ open }),
    }),
    { name: "sbp-carrito", storage: safeStorage, partialize: (s) => ({ lines: s.lines }) },
  ),
);
