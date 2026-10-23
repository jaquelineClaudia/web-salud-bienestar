import type { Product } from "./types";

// Resto del catálogo del fabricante (docs/catalogo_bioenergy_dreams.md), con ficha básica.
// Descripciones solo con características: nada de afirmaciones sanitarias (RD 1907/1996).
// Precios = PVP del fabricante, provisionales. Sin precio = "Precio a consultar".

type Row = [title: string, collection: string, type: string, price?: string, slot?: string, line?: Product["line"]];

const rows: Row[] = [
  ["Colchón Memory Grafeno Andulations", "descanso", "Colchones", "4395.00"],
  ["Colchón BlueCool", "descanso", "Colchones", "3975.00"],
  ["Colchón Grafeno-X", "descanso", "Colchones", "3695.00"],
  ["Colchón White Superginseng", "descanso", "Colchones", "3490.00"],
  ["Colchón Perfilado", "descanso", "Colchones", "1399.00"],
  ["Colchón Black Cool", "descanso", "Colchones"],
  ["Colchón Mineral Energy", "descanso", "Colchones"],
  ["Colchón Black", "descanso", "Colchones"],
  ["Colchón Memory Grafeno", "descanso", "Colchones"],
  ["Topper Electro-Scudo Biobalance", "descanso", "Toppers", "5495.00"],
  ["Topper Black Cool", "descanso", "Toppers", "3695.00"],
  ["Topper Turma Cool", "descanso", "Toppers", "3695.00"],
  ["Topper Elektro Superturmalina", "descanso", "Toppers", "2995.00"],
  ["Topper Black Superginseng", "descanso", "Toppers", "2995.00"],
  ["Topper Mineral Energy", "descanso", "Toppers"],
  ["Almohada Super Turmalina", "descanso", "Almohadas", "179.00"],
  ["Almohada BlackCool", "descanso", "Almohadas", "176.00"],
  ["Almohada TurmaCool", "descanso", "Almohadas", "176.00"],
  ["Presoterapia de Piernas Inalámbrica", "masaje-y-relax", "Presoterapia", "3195.00", undefined, "Bioenergy for Life"],
  ["Presoterapia Mano Mister Relax", "masaje-y-relax", "Presoterapia", "695.00", undefined, "Bioenergy for Life"],
  ["Láser de Rodilla Mister Relax", "masaje-y-relax", "Masaje", "2495.00", undefined, "Bioenergy for Life"],
  ["Cinturón Láser Lumbar Abdominal", "masaje-y-relax", "Masaje", "2495.00", undefined, "Bioenergy for Life"],
  ["Láser Multifunción", "masaje-y-relax", "Masaje", "1499.00", undefined, "Bioenergy for Life"],
  ["Láser Cervicales con Roller Mister Relax", "masaje-y-relax", "Masaje", "795.00", undefined, "Bioenergy for Life"],
  ["Masajeador Ojos Mister Relax", "masaje-y-relax", "Masaje", "795.00", undefined, "Bioenergy for Life"],
  ["Láser Cervical Profesional EMS", "masaje-y-relax", "Masaje", undefined, "laser-cervical-ems", "Bioenergy for Life"],
  ["Láser DueTech Frío-Calor", "masaje-y-relax", "Masaje", undefined, "laser-duetech", "Bioenergy for Life"],
  ["Artrosi Stop Mano", "masaje-y-relax", "Masaje", undefined, "artrosi-stop-mano", "Bioenergy for Life"],
  ["Dispositivo Total Relax Andulations", "masaje-y-relax", "Masaje", undefined, undefined, "Bioenergy for Life"],
];

const slug = (t: string) =>
  t
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const resumen: Record<string, string> = {
  Colchones: "Colchón de la colección Bioenergy Dreams. Elegimos contigo firmeza y medida en tu casa.",
  Toppers: "Topper para colocar sobre tu colchón. Te enseñamos tejidos y medidas en la visita.",
  Almohadas: "Almohada de la colección Bioenergy Dreams. Pruébala en casa con nuestro asesor.",
  Presoterapia: "Equipo de presión con aire para tus ratos de relax en casa. Te lo enseñamos funcionando.",
  Masaje: "Equipo de la línea Mister Relax para tus ratos de relax en casa. Te lo enseñamos funcionando.",
};

export const catalogo: Product[] = rows.map(([title, collection, type, price, slot, line]) => {
  const handle = slug(title);
  const s = slot ?? `sin-foto-${handle}`;
  return {
    id: `mock-${handle}`,
    handle,
    title,
    vendor: "Bioenergy Dreams",
    line,
    collection,
    type,
    summary: resumen[type],
    description: "Te contamos todas sus características y te lo enseñamos en una visita o videollamada, sin compromiso.",
    price: price ? { amount: price, currencyCode: "EUR" } : undefined,
    priceIsProvisional: true,
    featuredImage: { slot: s, altText: title },
    images: [{ slot: s, altText: title }],
    financing: Number(price ?? 0) > 300 || !price,
  };
});
