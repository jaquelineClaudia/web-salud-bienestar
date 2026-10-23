import type { Metadata } from "next";
import { RevealLines } from "@/components/motion/Reveal";
import { ContactoForm } from "@/components/forms/ContactoForm";
import { MapaConsentido } from "@/components/layout/MapaConsentido";
import { site, whatsappUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contacto: teléfono, WhatsApp y dirección en Leganés",
  description: `Llámanos al ${site.telefono}, escríbenos por WhatsApp o a ${site.email}. ${site.direccion}, Leganés.`,
};

export default function ContactoPage() {
  return (
    <div className="wrap pb-28 pt-12 md:pt-20">
      <RevealLines as="h1" onLoad className="text-[clamp(2.75rem,6vw,5rem)]">Hablemos.</RevealLines>
      <p className="mt-4 text-[1.25rem] text-ink-soft">{site.horario}. Con cita, en casa o por videollamada.</p>
      <div className="mt-14 grid gap-14 lg:grid-cols-12">
        <div className="space-y-10 lg:col-span-5">
          <ul className="space-y-6 text-[1.25rem]">
            <li>
              <p className="text-[1rem] text-ink-soft">Teléfono</p>
              <a href={`tel:${site.telefonoE164}`} className="font-serif text-[2.25rem] underline underline-offset-8">{site.telefono}</a>
            </li>
            <li>
              <p className="text-[1rem] text-ink-soft">WhatsApp</p>
              <a href={whatsappUrl()} target="_blank" rel="noopener" className="underline underline-offset-4">Escribir por WhatsApp</a>
            </li>
            <li>
              <p className="text-[1rem] text-ink-soft">Correo</p>
              <a href={`mailto:${site.email}`} className="break-all underline underline-offset-4">{site.email}</a>
            </li>
            <li>
              <p className="text-[1rem] text-ink-soft">Dirección</p>
              <address className="not-italic">{site.direccion}<br />{site.cp} {site.ciudad}</address>
            </li>
          </ul>
          <MapaConsentido />
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <h2 className="mb-8 text-[2rem]">Escríbenos</h2>
          <ContactoForm />
        </div>
      </div>
    </div>
  );
}
