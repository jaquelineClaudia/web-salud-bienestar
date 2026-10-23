// Tipos con la misma forma que la API Storefront de Shopify (simplificada).
// Al conectar Shopify, `shopify.ts` devolverá estos mismos objetos y las páginas no cambian.

export type Money = { amount: string; currencyCode: "EUR" };

export type ImageRef = {
  /** Identificador del hueco de foto (ver lib/media.ts). */
  slot: string;
  url?: string;
  altText: string;
};

export type SpecGroup = {
  title: string;
  items: { label: string; value: string }[];
};

/** Pieza del despiece animado de la ficha. En Shopify: metaobjeto "pieza". */
export type ExplodedPart = {
  id: string;
  name: string;
  detail: string;
  /** Capa de la foto a la que pertenece y posición de su nota, en % del ancho y alto. */
  layer: "cuerpo" | "base";
  x: number;
  y: number;
};

export type Collection = {
  handle: string;
  title: string;
  description: string;
  image: ImageRef;
};

export type Product = {
  id: string;
  handle: string;
  title: string;
  /** Nombre que usa el fabricante, por si difiere del nuestro. */
  vendorTitle?: string;
  vendor: "Bioenergy Dreams";
  line?: "Bioenergy Home" | "Bioenergy for Life";
  collection: string;
  summary: string;
  /** Frase corta para la sección de descripción de la ficha. */
  tagline?: string;
  description: string;
  price?: Money;
  /** true mientras el precio sea el PVP del fabricante y no el nuestro. */
  priceIsProvisional: boolean;
  featuredImage: ImageRef;
  images: ImageRef[];
  highlights?: { value: string; label: string }[];
  specs?: SpecGroup[];
  chips?: { title: string; values: string[] };
  certifications?: string[];
  parts?: ExplodedPart[];
  financing: boolean;
};

export type CartLine = {
  handle: string;
  title: string;
  price?: Money;
  quantity: number;
  slot: string;
};
