import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLegalPage, legalPages } from "@/lib/content/legal";
import { formatDate } from "@/lib/content/blog";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return legalPages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const page = getLegalPage((await params).slug);
  return page ? { title: page.title } : {};
}

export default async function LegalPage({ params }: Params) {
  const page = getLegalPage((await params).slug);
  if (!page) notFound();
  return (
    <article className="wrap max-w-[820px] pb-28 pt-12 md:pt-20">
      <h1 className="text-[clamp(2.5rem,5vw,4rem)]">{page.title}</h1>
      <p className="mt-4 text-ink-soft">Actualizado el {formatDate(page.updated)}</p>
      <div className="mt-12 space-y-10">
        {page.blocks.map((b, i) => (
          <section key={i}>
            {b.h && <h2 className="mb-3 text-[1.75rem]">{b.h}</h2>}
            {b.p?.map((t) => <p key={t} className="mt-3 first:mt-0">{t}</p>)}
            {b.list && (
              <ul className="mt-3 list-disc space-y-2 pl-6 marker:text-sage">
                {b.list.map((t) => <li key={t}>{t}</li>)}
              </ul>
            )}
          </section>
        ))}
      </div>
    </article>
  );
}
