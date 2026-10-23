import type { Metadata } from "next";
import { FadeUp, RevealLines } from "@/components/motion/Reveal";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Sobre nosotros: distribuidores de Bioenergy Dreams en Leganés",
  description: "Somos Salud Bienestar Publicaciones, distribuidores de Bioenergy Dreams en Leganés. Trato cercano y asesoramiento en tu casa.",
};

const formas = [
  { t: "Sin prisas", d: "Te enseñamos el producto con calma y decides cuando quieras. Sin presión." },
  { t: "En tu casa", d: "Un colchón o un sillón se eligen mejor donde los vas a usar. Por eso vamos nosotros." },
  { t: "Después también", d: "Si tienes una duda con lo que has comprado, nos llamas y te atendemos." },
];

export default function SobreNosotrosPage() {
  return (
    <>
      <section className="wrap grid gap-12 pb-20 pt-12 md:grid-cols-12 md:pt-20">
        <div className="md:col-span-6">
          <RevealLines as="h1" onLoad className="text-[clamp(2.5rem,5vw,4.5rem)]">Una empresa de Leganés que va a tu casa.</RevealLines>
          <FadeUp>
            <p className="mt-6 max-w-[46ch] text-[1.25rem] text-ink-soft">
              Somos Salud Bienestar Publicaciones, el nombre comercial de Publicaciones Martín Casado S.L. Distribuimos los productos de descanso, relax y hogar de Bioenergy Dreams y sus líneas Bioenergy Home y Bioenergy for Life.
            </p>
          </FadeUp>
        </div>
        <FadeUp className="md:col-span-5 md:col-start-8">
          <ImageSlot slot="equipo" alt="El equipo de Salud Bienestar Publicaciones" ratio="4/5" tone="mint" />
        </FadeUp>
      </section>

      <section aria-labelledby="como-titulo" className="bg-mint">
        <div className="wrap py-24 md:py-32">
          <RevealLines id="como-titulo" className="max-w-[18ch] text-[clamp(2.25rem,3.8vw,3.5rem)]">Así nos gusta trabajar.</RevealLines>
          <ol className="mt-14 grid gap-10 md:grid-cols-3">
            {formas.map((f, i) => (
              <FadeUp as="li" key={f.t} delay={i * 0.1} className={i === 1 ? "md:mt-16" : i === 2 ? "md:mt-32" : ""}>
                <h3 className="text-[2rem]">{f.t}</h3>
                <p className="mt-3 text-[1.125rem] text-ink-soft">{f.d}</p>
              </FadeUp>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="equipo-titulo" className="wrap grid gap-12 py-24 md:grid-cols-12 md:py-32">
        <div className="md:col-span-5">
          <RevealLines id="equipo-titulo" className="text-[clamp(2.25rem,3.8vw,3.5rem)]">El equipo</RevealLines>
          <p className="mt-5 text-ink-soft">Pronto pondremos aquí nuestras caras y nombres, para que sepas quién va a llamar a tu puerta.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/asesoramiento">Pedir asesoramiento</ButtonLink>
            <ButtonLink href="/trabaja-con-nosotros" variant="ghost">Trabaja con nosotros</ButtonLink>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6 md:col-span-6 md:col-start-7">
          <ImageSlot slot="equipo-1" alt="Miembro del equipo" ratio="3/4" tone="sage" />
          <ImageSlot slot="equipo-2" alt="Miembro del equipo" ratio="3/4" tone="mint" className="mt-16" />
        </div>
      </section>
    </>
  );
}
