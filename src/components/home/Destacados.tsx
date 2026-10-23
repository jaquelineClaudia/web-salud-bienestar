import { ProductCard } from "@/components/product/ProductCard";
import type { Product } from "@/lib/store/types";
import { RevealLines } from "@/components/motion/Reveal";

export function Destacados({ items }: { items: Product[] }) {
  return (
    <section aria-labelledby="destacados-titulo" className="bg-mint py-24 md:py-32">
      <div className="wrap">
        <RevealLines id="destacados-titulo" className="text-[clamp(2.25rem,3.8vw,3.5rem)]">Los que más nos piden.</RevealLines>
      </div>
      <ul className="mt-12 flex snap-x snap-mandatory scroll-px-5 gap-6 overflow-x-auto px-5 md:scroll-px-12 pb-6 md:px-12 [scrollbar-width:thin]">
        {items.map((p) => (
          <li key={p.handle} className="w-[78vw] shrink-0 snap-start sm:w-[44vw] lg:w-[28vw] xl:w-[24vw]">
            <ProductCard product={p} />
          </li>
        ))}
      </ul>
    </section>
  );
}
