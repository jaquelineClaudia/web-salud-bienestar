import Link from "next/link";
import { legal, nav, site, whatsappUrl } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-night text-night-ink">
      <div className="wrap grid gap-14 py-20 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="font-serif text-[2.25rem] leading-tight">{site.horario}.</p>
          <p className="mt-4 max-w-[38ch] text-night-ink/80">
            Visitas a domicilio en Leganés y la Comunidad de Madrid, o videollamada si lo prefieres.
          </p>
          <div className="mt-8 flex flex-col gap-2 text-[1.25rem]">
            <a href={`tel:${site.telefonoE164}`} className="underline underline-offset-4 hover:decoration-2">Llamar al {site.telefono}</a>
            <a href={whatsappUrl()} target="_blank" rel="noopener" className="underline underline-offset-4 hover:decoration-2">Escribir por WhatsApp</a>
            <a href={`mailto:${site.email}`} className="break-all underline underline-offset-4 hover:decoration-2">{site.email}</a>
          </div>
        </div>
        <nav aria-label="Pie" className="md:col-span-3 md:col-start-7">
          <ul className="space-y-3">
            {nav.map((n) => (
              <li key={n.href}><Link href={n.href} className="underline-offset-4 hover:underline">{n.label}</Link></li>
            ))}
            <li><Link href="/trabaja-con-nosotros" className="underline-offset-4 hover:underline">Trabaja con nosotros</Link></li>
          </ul>
        </nav>
        <address className="not-italic text-night-ink/80 md:col-span-3">
          {site.razonSocial}
          <br />
          {site.direccion}
          <br />
          {site.cp} {site.ciudad}
          <br />
          <span className="mt-3 block">Distribuidores de {site.marca}.</span>
        </address>
      </div>
      <div className="border-t border-night-ink/15">
        <ul className="wrap flex flex-wrap gap-x-6 gap-y-2 py-6 text-[0.9375rem] text-night-ink/75">
          {legal.map((l) => (
            <li key={l.href}><Link href={l.href} className="underline-offset-4 hover:underline">{l.label}</Link></li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
