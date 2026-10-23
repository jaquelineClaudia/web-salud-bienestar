// Huecos de foto con nombre. Cada hueco tiene proporción fija para que cambiar la foto
// nunca descoloque el diseño. Con Shopify conectado, las fotos de producto vienen del panel.

/**
 * Interruptor de fotos del fabricante. Encendido en el prototipo (fotos de catálogo que nos pasó Jaqueline).
 * Si Bioenergy Dreams no da permiso, poner NEXT_PUBLIC_FOTOS_FABRICANTE=no y salen los huecos vacíos.
 */
export const USE_MANUFACTURER_PHOTOS = process.env.NEXT_PUBLIC_FOTOS_FABRICANTE !== "no";

const F = "/fotos/fabricante";

/** cutout: foto de producto sin fondo, se muestra entera sobre un panel de color. */
type Slot = { brief: string; src?: string; manufacturer?: boolean; cutout?: boolean };

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
};

export function resolveSlot(id: string): { src?: string; brief: string; cutout?: boolean } {
  const s = slots[id] ?? { brief: id };
  if (s.manufacturer && !USE_MANUFACTURER_PHOTOS) return { brief: s.brief };
  return { src: s.src, brief: s.brief, cutout: s.cutout };
}
