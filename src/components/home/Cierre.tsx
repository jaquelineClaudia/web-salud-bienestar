import { RevealLines } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { site, whatsappUrl } from "@/lib/site";

export function Cierre() {
  return (
    <section aria-labelledby="cierre-titulo" className="bg-sage/45">
      <div className="wrap grid gap-10 py-28 md:grid-cols-12 md:py-36">
        <RevealLines id="cierre-titulo" className="text-[clamp(2.75rem,6vw,5.5rem)] md:col-span-7">
          ¿Te ayudamos a elegir?
        </RevealLines>
        <div className="flex flex-col justify-end gap-6 md:col-span-4 md:col-start-9">
          <p className="text-[1.25rem]">Llámanos o escríbenos. Sin compromiso y sin prisas.</p>
          <a href={`tel:${site.telefonoE164}`} className="font-serif text-[2.5rem] leading-none underline-offset-8 hover:underline">{site.telefono}</a>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href={whatsappUrl()} target="_blank" rel="noopener">Escríbenos por WhatsApp</ButtonLink>
          </div>
          <a href={`mailto:${site.email}`} className="break-all text-[1.125rem] underline underline-offset-4">{site.email}</a>
        </div>
      </div>
    </section>
  );
}
