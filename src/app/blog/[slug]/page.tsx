import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { ButtonLink } from "@/components/ui/Button";
import { RevealLines } from "@/components/motion/Reveal";
import { formatDate, getPost, publicados } from "@/lib/content/blog";

type Params = { params: Promise<{ slug: string }> };

// Cada hora vuelve a mirar la fecha: un artículo programado da 404 hasta su día.
export const revalidate = 3600;

export function generateStaticParams() {
  return publicados().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const post = getPost((await params).slug);
  return post ? { title: post.title, description: post.summary } : {};
}

export default async function PostPage({ params }: Params) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  return (
    <article className="pb-28 pt-12 md:pt-20">
      <header className="wrap max-w-[960px]">
        <Link href="/blog" className="text-ink-soft underline underline-offset-4">Blog</Link>
        <RevealLines as="h1" onLoad className="mt-6 text-[clamp(2.5rem,5vw,4.25rem)]">{post.title}</RevealLines>
        <p className="mt-6 text-ink-soft">{formatDate(post.date)} · {post.minutes} min de lectura</p>
      </header>
      <div className="wrap mt-12 max-w-[1120px]">
        <ImageSlot slot={post.slot} alt="" ratio="16/9" tone="mint" />
      </div>
      <div className="wrap mt-14 max-w-[760px] space-y-10 text-[1.1875rem]">
        {post.body.map((b, i) => (
          <section key={i}>
            {b.h && <h2 className="mb-4 text-[1.875rem]">{b.h}</h2>}
            {b.p.map((t) => <p key={t} className="mt-3 first:mt-0">{t}</p>)}
          </section>
        ))}
        <div className="border-t border-line pt-10">
          <ButtonLink href="/asesoramiento">Pedir asesoramiento</ButtonLink>
        </div>
      </div>
    </article>
  );
}
