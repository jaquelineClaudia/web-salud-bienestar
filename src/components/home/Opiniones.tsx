// Opiniones reales de clientes (por ejemplo, de Google). Mientras la lista esté vacía, la sección no se muestra.
// No se inventan opiniones.
type Opinion = { texto: string; nombre: string; lugar: string };
export const opiniones: Opinion[] = [];

export function Opiniones() {
  if (opiniones.length === 0) return null;
  return (
    <section aria-labelledby="opiniones-titulo" className="wrap py-28">
      <h2 id="opiniones-titulo" className="text-[clamp(2.25rem,3.8vw,3.5rem)]">Lo que dicen nuestros clientes.</h2>
      <ul className="mt-12 grid gap-10 md:grid-cols-2">
        {opiniones.map((o) => (
          <li key={o.nombre}>
            <blockquote className="font-serif text-[1.75rem] leading-snug">“{o.texto}”</blockquote>
            <p className="mt-4 text-ink-soft">{o.nombre}, {o.lugar}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
