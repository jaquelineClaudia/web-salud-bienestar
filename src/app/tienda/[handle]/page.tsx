import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CreditCard, Truck, ArrowCounterClockwise } from "@phosphor-icons/react/dist/ssr";
import { getCollections, getProduct, getProducts, getRelated, formatMoney } from "@/lib/store";
import { Gallery } from "@/components/product/Gallery";
import { Despiece } from "@/components/product/Despiece";
import { ProductCard } from "@/components/product/ProductCard";
import { AddToCart } from "@/components/cart/AddToCart";
import { ButtonLink } from "@/components/ui/Button";
import { FadeUp, RevealLines } from "@/components/motion/Reveal";
import { site, whatsappUrl } from "@/lib/site";

export async function generateStaticParams() {
  return (await getProducts()).map((p) => ({ handle: p.handle }));
}

export async function generateMetadata({ params }: { params: Promise<{ handle: string }> }): Promise<Metadata> {
  const p = await getProduct((await params).handle);
  if (!p) return {};
  return { title: `${p.title} | Bioenergy Dreams en Madrid`, description: p.summary };
}

export default async function ProductPage({ params }: { params: Promise<{ handle: string }> }) {
  const product = await getProduct((await params).handle);
  if (!product) notFound();
  const [collections, related] = await Promise.all([getCollections(), getRelated(product)]);
  const collection = collections.find((c) => c.handle === product.collection);

  return (
    <>
      <section className="wrap grid gap-10 pb-24 pt-8 lg:grid-cols-12 lg:pt-14">
        <div className="lg:col-span-7">
          <Gallery images={product.images} />
        </div>
        <div className="lg:col-span-5 lg:pl-6">
          <div className="lg:sticky lg:top-[104px]">
            <nav aria-label="Ruta" className="text-[0.9375rem] text-ink-soft">
              <Link href="/tienda" className="underline-offset-4 hover:underline">Tienda</Link>
              <span aria-hidden> / </span>
              <Link href={`/tienda?categoria=${product.collection}`} className="underline-offset-4 hover:underline">{collection?.title}</Link>
            </nav>
            <RevealLines as="h1" onLoad className="mt-4 text-[clamp(2.25rem,3.6vw,3.25rem)]">{product.title}</RevealLines>
            {product.line && <p className="mt-2 text-ink-soft">{product.line} · {product.vendor}</p>}
            <p className="mt-6 text-[1.1875rem]">{product.summary}</p>

            <div className="mt-8 flex items-baseline gap-3">
              <p className="font-serif text-[2.5rem] leading-none">{formatMoney(product.price)}</p>
              {product.price && <p className="text-[0.9375rem] text-ink-soft">IVA incluido</p>}
            </div>
            {product.priceIsProvisional && (
              <p className="mt-2 text-[0.9375rem] text-ink-soft">PVP del fabricante, orientativo mientras confirmamos nuestro precio.</p>
            )}
            {product.financing && (
              <p className="mt-4 flex items-center gap-2 text-[1.0625rem]">
                <CreditCard size={22} weight="light" aria-hidden />
                <span>
                  Puedes pagarlo a plazos.{" "}
                  <Link href="/asesoramiento?motivo=financiacion" className="underline underline-offset-4">Solicitar financiación</Link>
                </span>
              </p>
            )}

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {product.price ? (
                <AddToCart product={product} label="Comprar" />
              ) : (
                <ButtonLink href={whatsappUrl(`Hola, ¿qué precio tiene ${product.title}?`)} target="_blank" rel="noopener">Pedir precio</ButtonLink>
              )}
              <ButtonLink href={`/asesoramiento?producto=${product.handle}`} variant="ghost">Pedir asesoramiento</ButtonLink>
            </div>
            <a href={whatsappUrl(`Hola, tengo una pregunta sobre: ${product.title}`)} target="_blank" rel="noopener" className="mt-5 inline-flex min-h-[44px] items-center underline underline-offset-4">
              ¿Dudas? Pregúntanos por WhatsApp
            </a>

            <ul className="mt-8 space-y-3 border-t border-line pt-6 text-[1rem] text-ink-soft">
              <li className="flex items-center gap-3"><Truck size={22} weight="light" aria-hidden />Entrega y demostración en Madrid y alrededores</li>
              <li className="flex items-center gap-3"><ArrowCounterClockwise size={22} weight="light" aria-hidden />14 días para desistir de la compra</li>
            </ul>
          </div>
        </div>
      </section>

      {product.highlights && (
        <section aria-label="Datos principales" className="bg-mint">
          <dl className="wrap grid gap-8 py-16 sm:grid-cols-3">
            {product.highlights.map((h) => (
              <div key={h.label}>
                <dt className="sr-only">{h.label}</dt>
                <dd className="font-serif text-[clamp(3rem,6vw,5rem)] leading-none">{h.value}</dd>
                <dd className="mt-2 text-ink-soft">{h.label}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      <section className="wrap grid gap-10 py-24 md:grid-cols-12 md:py-32">
        <RevealLines className="text-[clamp(2.25rem,3.6vw,3.25rem)] md:col-span-5">{product.tagline ?? "En pocas palabras."}</RevealLines>
        <FadeUp className="md:col-span-6 md:col-start-7">
          <p className="text-[1.25rem]">{product.description}</p>
        </FadeUp>
      </section>

      {product.parts && <Despiece parts={product.parts} />}

      {product.specs && (
        <section aria-labelledby="ficha-titulo" className="wrap py-24 md:py-32">
          <RevealLines id="ficha-titulo" className="text-[clamp(2.25rem,3.6vw,3.25rem)]">Ficha técnica</RevealLines>
          <p className="mt-3 text-ink-soft">Datos según el fabricante.</p>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {product.specs.map((g, i) => (
              <FadeUp key={g.title} delay={i * 0.1} className={`rounded-[20px] p-7 ${i === 1 ? "bg-sage/50" : "bg-mint"}`}>
                <h3 className="text-[1.75rem]">{g.title}</h3>
                <dl className="mt-6 space-y-4">
                  {g.items.map((it) => (
                    <div key={it.label}>
                      <dt className="text-[0.9375rem] text-ink-soft">{it.label}</dt>
                      <dd className="text-[1.25rem]">{it.value}</dd>
                    </div>
                  ))}
                </dl>
              </FadeUp>
            ))}
          </div>
          {product.chips && (
            <div className="mt-12">
              <h3 className="text-[1.5rem]">{product.chips.title}</h3>
              <ul className="mt-4 flex flex-wrap gap-3">
                {product.chips.values.map((v) => (
                  <li key={v} className="rounded-full border border-ink/30 px-5 py-2.5">{v}</li>
                ))}
              </ul>
            </div>
          )}
          <div className="mt-14 rounded-[20px] border border-dashed border-ink/30 p-7">
            <h3 className="text-[1.5rem]">Certificaciones</h3>
            {product.certifications?.length ? (
              <ul className="mt-4 flex flex-wrap gap-3">
                {product.certifications.map((c) => (
                  <li key={c} className="rounded-full bg-mint px-5 py-2.5">{c}</li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 max-w-[60ch] text-ink-soft">
                Pendiente de confirmar con el fabricante qué sellos tiene este modelo (por ejemplo CE o RoHS). Solo mostraremos los que estén acreditados.
              </p>
            )}
          </div>
        </section>
      )}

      <section aria-labelledby="demo-titulo" className="bg-night text-night-ink">
        <div className="wrap grid gap-8 py-24 md:grid-cols-12 md:py-28">
          <h2 id="demo-titulo" className="text-[clamp(2.25rem,4.4vw,3.75rem)] md:col-span-6">¿Quieres verla funcionar antes de decidir?</h2>
          <div className="flex flex-col justify-end gap-6 md:col-span-5 md:col-start-8">
            <p className="text-[1.1875rem] text-night-ink/85">Te la enseñamos en tu casa o por videollamada. {site.horario}.</p>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href={`/asesoramiento?producto=${product.handle}`} variant="light">Pedir asesoramiento</ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="relacionados-titulo" className="wrap py-24 md:py-32">
        <h2 id="relacionados-titulo" className="text-[clamp(2rem,3vw,2.75rem)]">También te puede interesar</h2>
        <ul className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((p, i) => (
            <li key={p.handle} className={i === 1 ? "lg:mt-16" : ""}>
              <ProductCard product={p} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
