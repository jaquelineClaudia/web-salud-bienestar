import type { Metadata } from "next";
import Link from "next/link";
import { RevealLines, FadeUp } from "@/components/motion/Reveal";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { formatDate, posts } from "@/lib/content/blog";

export const metadata: Metadata = {
  title: "Blog: descanso, relax y cuidado de la casa",
  description: "Consejos sencillos para elegir colchón, planchar en vertical y crear un rincón de relax en casa.",
};

export default function BlogPage() {
  const [first, ...rest] = posts;
  return (
    <div className="wrap pb-28 pt-12 md:pt-20">
      <RevealLines as="h1" onLoad className="max-w-[16ch] text-[clamp(2.75rem,6vw,5rem)]">Ideas para casa.</RevealLines>

      <FadeUp>
        <Link href={`/blog/${first.slug}`} className="group mt-14 grid gap-8 md:grid-cols-12 md:items-end">
          <ImageSlot slot={first.slot} alt="" ratio="4/3" tone="mint" className="md:col-span-7" />
          <div className="md:col-span-5">
            <p className="text-ink-soft">{formatDate(first.date)} · {first.minutes} min</p>
            <h2 className="mt-3 text-[clamp(2rem,3vw,2.75rem)] group-hover:underline group-hover:underline-offset-8">{first.title}</h2>
            <p className="mt-4 text-ink-soft">{first.summary}</p>
          </div>
        </Link>
      </FadeUp>

      <ul className="mt-24 divide-y divide-line border-y border-line">
        {rest.map((p) => (
          <li key={p.slug}>
            <Link href={`/blog/${p.slug}`} className="group grid gap-4 py-10 md:grid-cols-12 md:items-center">
              <p className="text-ink-soft md:col-span-3">{formatDate(p.date)}</p>
              <h2 className="text-[1.875rem] md:col-span-6 group-hover:underline group-hover:underline-offset-8">{p.title}</h2>
              <p className="text-ink-soft md:col-span-3">{p.summary}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
