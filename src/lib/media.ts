// Huecos de foto con nombre. Cada hueco tiene proporción fija para que cambiar la foto
// nunca descoloque el diseño. Con Shopify conectado, las fotos de producto vienen del panel.

/**
 * Interruptor de fotos del fabricante. Encendido en el prototipo (fotos de catálogo que nos pasó Jaqueline).
 * Si Bioenergy Dreams no da permiso, poner NEXT_PUBLIC_FOTOS_FABRICANTE=no y salen los huecos vacíos.
 */
export const USE_MANUFACTURER_PHOTOS = process.env.NEXT_PUBLIC_FOTOS_FABRICANTE !== "no";

const F = "/fotos/fabricante";
const unsplash = (id: string) => `https://images.unsplash.com/${id}?w=2000&q=75&auto=format&fit=crop`;

/** cutout: foto de producto sin fondo, se muestra entera sobre un panel de color. */
/** credit: autor de la foto, para fotos de bancos de imágenes libres (Unsplash). */
type Slot = { brief: string; src?: string; manufacturer?: boolean; cutout?: boolean; credit?: string };

export const slots: Record<string, Slot> = {
  "hero-dormitorio": { brief: "Dormitorio luminoso por la mañana", src: `${F}/dormitorio-black-superginseng.webp`, manufacturer: true },
  "hero-detalle": { brief: "Plancha portátil", src: `${F}/plancha.webp`, manufacturer: true, cutout: true },
  "descanso-colchon": { brief: "Colchón de muelles ensacados", src: `${F}/colchon-electro-scudo.webp`, manufacturer: true, cutout: true },
  "shiatsu-sillon": { brief: "Centro de masaje Shiatsu ZEN Premium", src: `${F}/shiatsu-zen.webp`, manufacturer: true, cutout: true },
  "shiatsu-rollers": { brief: "Detalle de los rollers 3D", src: `${F}/shiatsu-detalle-rollers.webp`, manufacturer: true },
  "shiatsu-airbags": { brief: "Detalle de los airbags laterales", src: `${F}/shiatsu-detalle-airbags.webp`, manufacturer: true },
  "shiatsu-calor": { brief: "Zona lumbar con calor por infrarrojos", src: `${F}/shiatsu-detalle-lumbar.webp`, manufacturer: true },
  "shiatsu-plegado": { brief: "Centro de masaje plegado junto al sofá", manufacturer: true },
  "cat-descanso": { brief: "Colchón", src: `${F}/colchon-electro-scudo.webp`, manufacturer: true, cutout: true },
  "cat-masaje": { brief: "Centro de masaje", src: `${F}/shiatsu-zen.webp`, manufacturer: true, cutout: true },
  "cat-hogar": { brief: "Plancha en su base", src: `${F}/plancha.webp`, manufacturer: true, cutout: true },
  "cat-magneto": { brief: "Equipo de magnetoterapia", manufacturer: true },
  "plancha-principal": { brief: "Plancha portátil en su base", src: `${F}/plancha.webp`, manufacturer: true, cutout: true },
  "plancha-sin-base": { brief: "Plancha portátil fuera de la base", src: `${F}/plancha_cuerpo.webp`, manufacturer: true, cutout: true },
  "plancha-uso-vertical": { brief: "Planchando en vertical una camisa colgada" },
  "plancha-panel": { brief: "Detalle del panel de mandos", manufacturer: true },
  "plancha-base": { brief: "Plancha apoyada en su base con gancho", manufacturer: true },
  "aspirador-principal": { brief: "Aspirador sin cables", src: `${F}/aspirador.webp`, manufacturer: true, cutout: true },
  "shiatsu-principal": { brief: "Centro de masaje Shiatsu ZEN Premium", src: `${F}/shiatsu-zen.webp`, manufacturer: true, cutout: true },
  "colchon-electro-scudo": { brief: "Colchón Electro-Scudo Biobalance", src: `${F}/colchon-electro-scudo.webp`, manufacturer: true, cutout: true },
  "colchon-oxygen-clinic": { brief: "Colchón Oxygen Clinic", src: `${F}/colchon-oxygen-clinic.webp`, manufacturer: true, cutout: true },
  "colchon-biosport": { brief: "Colchón BioSport", manufacturer: true },
  "almohada-adapta": { brief: "Almohada ADAPTA 3.0", manufacturer: true },
  biopure: { brief: "Equipo BIOPURE WATER en una cocina", manufacturer: true },
  "visita-casa": { brief: "Asesor enseñando un colchón en el salón de una pareja mayor" },
  videollamada: { brief: "Persona en casa en videollamada con una tablet" },
  equipo: { brief: "el equipo, en el local o con un cliente" },
  "equipo-1": { brief: "retrato de una persona del equipo" },
  "equipo-2": { brief: "retrato de una persona del equipo" },
  "presoterapia-mano": { brief: "Masajeador de manos con presoterapia", src: "/fotos/presoterapia-mano.webp" },
  // Fotos del blog de Unsplash (licencia libre, uso comercial permitido). Se cargan desde images.unsplash.com.
  "blog-manos-crema": { brief: "Manos con un poco de crema", src: unsplash("photo-1619451427882-6aaaded0cc61"), credit: "Nataliya Melnychuk / Unsplash" },
  "blog-paseo-parque": { brief: "Persona mayor paseando por un parque en otoño", src: unsplash("photo-1764628039015-222c6d30c68d"), credit: "Victoria Prymak / Unsplash" },
  "blog-pareja-paseo": { brief: "Pareja mayor paseando de la mano", src: unsplash("photo-1790451933031-992d6722258e"), credit: "Bruno BD / Unsplash" },
};

/** Autor de la foto de un hueco, si hay que citarlo. */
export const slotCredit = (id: string) => slots[id]?.src ? slots[id].credit : undefined;

export function resolveSlot(id: string): { src?: string; brief: string; cutout?: boolean } {
  // Fotos que vienen de Shopify: el identificador es la propia URL.
  if (id.startsWith("https://")) return { src: id, brief: "", cutout: true };
  const s = slots[id] ?? { brief: id.startsWith("sin-foto-") ? "Foto del producto pendiente" : id };
  if (s.manufacturer && !USE_MANUFACTURER_PHOTOS) return { brief: s.brief };
  return { src: s.src, brief: s.brief, cutout: s.cutout };
}

// Fotos de producto del catálogo que no tienen hueco propio arriba.
Object.assign(slots, {
  "laser-cervical-ems": { brief: "Láser Cervical Profesional EMS", src: `${F}/laser-cervical-ems.webp`, manufacturer: true, cutout: true },
  "laser-duetech": { brief: "Láser DueTech Frío-Calor", src: `${F}/laser-duetech.webp`, manufacturer: true, cutout: true },
  "artrosi-stop-mano": { brief: "Artrosi Stop Mano", src: `${F}/artrosi-stop-mano.webp`, manufacturer: true, cutout: true },
} satisfies Record<string, Slot>);
