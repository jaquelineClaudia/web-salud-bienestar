import type { Metadata } from "next";
import { Suspense } from "react";
import { getCollections, getProducts } from "@/lib/store";
import { ShopBrowser } from "@/components/shop/ShopBrowser";
import { RevealLines } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Tienda: colchones, masaje y hogar sano",
  description:
    "Colchones fabricados en España, toppers, almohadas, centro de masaje Shiatsu y plancha con ozono de Bioenergy Dreams. Asesoramiento en Leganés y Madrid.",
};

export default async function TiendaPage() {
  const [products, collections] = await Promise.all([getProducts(), getCollections()]);
  return (
    <>
      <section className="wrap pb-10 pt-12 md:pt-20">
        <RevealLines as="h1" onLoad className="text-[clamp(2.75rem,6vw,5rem)]">Tienda</RevealLines>
        <p className="mt-4 max-w-[52ch] text-[1.25rem] text-ink-soft">
          Todo el catálogo de Bioenergy Dreams. Si dudas, te lo enseñamos en tu casa antes de comprar.
        </p>
      </section>
      <Suspense>
        <ShopBrowser products={products} collections={collections} />
      </Suspense>
    </>
  );
}
