import { House, VideoCamera } from "@phosphor-icons/react/dist/ssr";
import { ButtonLink } from "@/components/ui/Button";
import { FadeUp, RevealLines } from "@/components/motion/Reveal";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { site, whatsappUrl } from "@/lib/site";

const caminos = [
  {
    icon: House,
    slot: "visita-casa",
    titulo: "En tu casa",
    alt: "Asesor mostrando un colchón a una pareja mayor en su salón",
    pasos: ["Nos dices qué te preocupa y cuándo te viene bien.", "Vamos con muestras y te lo enseñamos en tu propio dormitorio o salón.", "Decides sin prisa. Si compras, te lo llevamos y montamos."],
  },
  {
    icon: VideoCamera,
    slot: "videollamada",
    titulo: "Por videollamada",
    alt: "Mujer en su casa en una videollamada con una tablet",
    pasos: ["Eliges día y hora en el calendario.", "Te enseñamos el producto en directo y resolvemos tus dudas.", "Te mandamos por escrito el presupuesto y las opciones de pago."],
  },
];

export function ComoTrabajamos() {
  return (
    <section aria-labelledby="como-titulo" className="wrap py-28 md:py-40">
      <div className="max-w-[40rem]">
        <RevealLines id="como-titulo" className="text-[clamp(2.25rem,3.8vw,3.5rem)]">Te asesoramos como prefieras.</RevealLines>
        <p className="mt-5 text-ink-soft">{site.horario}: por la mañana, por la tarde o el fin de semana, con cita.</p>
      </div>
      <div className="mt-16 grid gap-14 md:grid-cols-2 md:gap-10">
        {caminos.map((c, i) => (
          <FadeUp key={c.titulo} delay={i * 0.12} className={i === 1 ? "md:mt-24" : ""}>
            <ImageSlot slot={c.slot} alt={c.alt} ratio="3/2" tone={i ? "mint" : "sage"} sizes="(min-width: 768px) 45vw, 100vw" />
            <h3 className="mt-7 flex items-center gap-3 text-[2rem]">
              <c.icon size={30} weight="light" aria-hidden />
              {c.titulo}
            </h3>
            <ol className="mt-5 space-y-3 text-[1.0625rem]">
              {c.pasos.map((p) => (
                <li key={p} className="border-l-2 border-sage pl-4">{p}</li>
              ))}
            </ol>
          </FadeUp>
        ))}
      </div>
      <div className="mt-16 flex flex-wrap gap-3">
        <ButtonLink href="/asesoramiento">Pedir asesoramiento</ButtonLink>
        <ButtonLink href={whatsappUrl()} variant="ghost" target="_blank" rel="noopener">WhatsApp {site.telefono}</ButtonLink>
      </div>
    </section>
  );
}
