import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="wrap flex min-h-[70dvh] flex-col items-start justify-center gap-6 py-24">
      <h1 className="max-w-[16ch] text-[2.75rem] md:text-[4rem]">Esta página llega en la siguiente fase.</h1>
      <p className="max-w-[48ch] text-ink-soft">
        El prototipo incluye la página de inicio y la ficha de la plancha. El resto de páginas se construye cuando aprobéis este diseño.
      </p>
      <div className="flex flex-wrap gap-3">
        <ButtonLink href="/">Volver al inicio</ButtonLink>
        <ButtonLink href="/tienda/plancha-portatil-multifuncion" variant="ghost">Ver la plancha</ButtonLink>
      </div>
    </section>
  );
}
