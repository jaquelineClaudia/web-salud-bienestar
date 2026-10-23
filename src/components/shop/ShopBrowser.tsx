"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { MagnifyingGlass, X } from "@phosphor-icons/react";
import { ProductCard } from "@/components/product/ProductCard";
import { ButtonLink } from "@/components/ui/Button";
import type { Collection, Product } from "@/lib/store/types";

const precios = [
  { id: "hasta-200", label: "Hasta 200 €", test: (n: number) => n > 0 && n <= 200 },
  { id: "200-1000", label: "De 200 a 1.000 €", test: (n: number) => n > 200 && n <= 1000 },
  { id: "mas-1000", label: "Más de 1.000 €", test: (n: number) => n > 1000 },
  { id: "consultar", label: "Precio a consultar", test: (n: number) => n === 0 },
] as const;

const orden = [
  { id: "", label: "Destacados" },
  { id: "precio-asc", label: "Precio: de menor a mayor" },
  { id: "precio-desc", label: "Precio: de mayor a menor" },
] as const;

const norm = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
const price = (p: Product) => (p.price ? Number(p.price.amount) : 0);

function Chip({ active, children, onClick }: { active: boolean; children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className="min-h-[44px] rounded-full border border-ink/30 px-4 text-[1rem] transition-colors duration-300 hover:border-ink aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-paper"
    >
      {children}
    </button>
  );
}

export function ShopBrowser({ products, collections }: { products: Product[]; collections: Collection[] }) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const reduce = useReducedMotion();

  const categoria = params.get("categoria") ?? "";
  const tipo = params.get("tipo") ?? "";
  const precio = params.get("precio") ?? "";
  const q = params.get("q") ?? "";
  const sort = params.get("orden") ?? "";

  const set = (key: string, value: string) => {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    if (key === "categoria") next.delete("tipo");
    router.replace(`${pathname}${next.size ? `?${next}` : ""}`, { scroll: false });
  };

  const tipos = useMemo(
    () => [...new Set(products.filter((p) => !categoria || p.collection === categoria).map((p) => p.type))],
    [products, categoria],
  );

  const results = useMemo(() => {
    const nq = norm(q.trim());
    const band = precios.find((b) => b.id === precio);
    const list = products.filter(
      (p) =>
        (!categoria || p.collection === categoria) &&
        (!tipo || p.type === tipo) &&
        (!band || band.test(price(p))) &&
        (!nq || norm(`${p.title} ${p.summary} ${p.type}`).includes(nq)),
    );
    if (sort === "precio-asc") list.sort((a, b) => (price(a) || Infinity) - (price(b) || Infinity));
    if (sort === "precio-desc") list.sort((a, b) => price(b) - price(a));
    return list;
  }, [products, categoria, tipo, precio, q, sort]);

  const hasFilters = Boolean(categoria || tipo || precio || q);
  const current = collections.find((c) => c.handle === categoria);

  return (
    <div className="wrap grid gap-10 pb-28 lg:grid-cols-12">
      <aside className="lg:col-span-3" aria-label="Filtros de la tienda">
        <div className="space-y-8 lg:sticky lg:top-[104px]">
          <div>
            <label htmlFor="buscar" className="block text-[1rem] font-medium">Buscar</label>
            <div className="relative mt-2">
              <MagnifyingGlass size={20} weight="light" aria-hidden className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-soft" />
              <input
                id="buscar"
                type="search"
                defaultValue={q}
                onChange={(e) => set("q", e.target.value)}
                placeholder="Colchón, almohada, masaje…"
                className="min-h-[52px] w-full rounded-[12px] border border-ink/30 bg-white/60 pl-11 pr-4 text-[1.0625rem] placeholder:text-ink-soft/80 focus:border-ink focus:outline-none"
              />
            </div>
          </div>

          <fieldset>
            <legend className="text-[1rem] font-medium">Categoría</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              <Chip active={!categoria} onClick={() => set("categoria", "")}>Todas</Chip>
              {collections.map((c) => (
                <Chip key={c.handle} active={categoria === c.handle} onClick={() => set("categoria", c.handle)}>{c.title}</Chip>
              ))}
            </div>
          </fieldset>

          {tipos.length > 1 && (
            <fieldset>
              <legend className="text-[1rem] font-medium">Tipo</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                <Chip active={!tipo} onClick={() => set("tipo", "")}>Todos</Chip>
                {tipos.map((t) => (
                  <Chip key={t} active={tipo === t} onClick={() => set("tipo", t)}>{t}</Chip>
                ))}
              </div>
            </fieldset>
          )}

          <fieldset>
            <legend className="text-[1rem] font-medium">Precio</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {precios.map((b) => (
                <Chip key={b.id} active={precio === b.id} onClick={() => set("precio", precio === b.id ? "" : b.id)}>{b.label}</Chip>
              ))}
            </div>
          </fieldset>

          {hasFilters && (
            <button type="button" onClick={() => router.replace(pathname, { scroll: false })} className="inline-flex min-h-[44px] items-center gap-2 underline underline-offset-4">
              <X size={18} aria-hidden /> Quitar filtros
            </button>
          )}
        </div>
      </aside>

      <section className="lg:col-span-9" aria-labelledby="resultados">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-5">
          <div>
            <h2 id="resultados" className="text-[2rem]">{current?.title ?? "Todos los productos"}</h2>
            <p className="mt-1 text-ink-soft" aria-live="polite">
              {results.length} {results.length === 1 ? "producto" : "productos"}
            </p>
          </div>
          <label className="flex items-center gap-3 text-[1rem]">
            <span>Ordenar</span>
            <select
              value={sort}
              onChange={(e) => set("orden", e.target.value)}
              className="min-h-[48px] rounded-[12px] border border-ink/30 bg-white/60 px-3"
            >
              {orden.map((o) => (
                <option key={o.id} value={o.id}>{o.label}</option>
              ))}
            </select>
          </label>
        </div>
        {current && <p className="mt-5 max-w-[60ch] text-ink-soft">{current.description}</p>}

        {results.length === 0 ? (
          <div className="mt-16 flex flex-col items-start gap-5">
            <p className="max-w-[44ch] text-[1.25rem]">
              {categoria === "magnetoterapia-y-ozono"
                ? "Estamos preparando los equipos de magnetoterapia y ozono. Pregúntanos y te contamos los modelos."
                : "No hay productos con esos filtros. Prueba a quitar alguno o pregúntanos directamente."}
            </p>
            <ButtonLink href="/asesoramiento" variant="ghost">Pedir asesoramiento</ButtonLink>
          </div>
        ) : (
          <ul className="mt-10 grid gap-x-6 gap-y-14 sm:grid-cols-2 xl:grid-cols-3">
            <AnimatePresence initial={false} mode="popLayout">
              {results.map((p) => (
                <motion.li
                  key={p.handle}
                  layout={!reduce}
                  initial={{ opacity: 0, y: reduce ? 0 : 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ProductCard product={p} />
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        )}
      </section>
    </div>
  );
}
