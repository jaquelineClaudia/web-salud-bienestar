import type { Collection, Product, ImageRef } from "./types";

// Conexión con Shopify (API Storefront). Se activa sola cuando existen
// SHOPIFY_STORE_DOMAIN (p. ej. mi-tienda.myshopify.com) y SHOPIFY_STOREFRONT_TOKEN.
// En Shopify se gestionan nombre, precio, descripción, fotos, categorías (colecciones) y tipo.
// Los datos técnicos (ficha, despiece) siguen en mock.ts y se unen por el identificador (handle).

const DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
const TOKEN = process.env.SHOPIFY_STOREFRONT_TOKEN;
export const shopifyEnabled = Boolean(DOMAIN && TOKEN);

async function storefront<T>(query: string, variables: Record<string, unknown> = {}): Promise<T> {
  const res = await fetch(`https://${DOMAIN}/api/2025-07/graphql.json`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Shopify-Storefront-Access-Token": TOKEN! },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 300, tags: ["shopify"] },
  });
  const json = (await res.json()) as { data?: T; errors?: { message: string }[] };
  if (!res.ok || json.errors?.length) throw new Error(`Shopify: ${json.errors?.map((e) => e.message).join("; ") ?? res.status}`);
  return json.data!;
}

type SImage = { url: string; altText: string | null };
type SProduct = {
  id: string;
  handle: string;
  title: string;
  productType: string;
  description: string;
  tags: string[];
  featuredImage: SImage | null;
  images: { nodes: SImage[] };
  collections: { nodes: { handle: string }[] };
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
  availableForSale: boolean;
};

const PRODUCT_FIELDS = `
  id handle title productType description tags availableForSale
  featuredImage { url altText }
  images(first: 8) { nodes { url altText } }
  collections(first: 3) { nodes { handle } }
  priceRange { minVariantPrice { amount currencyCode } }
`;

// La URL de la foto se usa como identificador de hueco (ver resolveSlot en lib/media.ts).
const img = (i: SImage | null, fallback: string): ImageRef => ({ slot: i?.url ?? "sin-foto-shopify", url: i?.url, altText: i?.altText ?? fallback });

function toProduct(p: SProduct, local?: Product): Product {
  const amount = p.priceRange.minVariantPrice.amount;
  const firstSentence = p.description.split(/(?<=\.)\s/)[0] ?? "";
  return {
    ...local,
    id: p.id,
    handle: p.handle,
    title: p.title,
    vendor: "Bioenergy Dreams",
    collection: p.collections.nodes[0]?.handle ?? local?.collection ?? "",
    type: p.productType || local?.type || "Otros",
    summary: local?.summary ?? firstSentence,
    description: p.description || local?.description || "",
    // Precio 0 en Shopify = "a consultar".
    price: Number(amount) > 0 ? { amount, currencyCode: "EUR" } : undefined,
    priceIsProvisional: false,
    featuredImage: p.featuredImage ? img(p.featuredImage, p.title) : (local?.featuredImage ?? img(null, p.title)),
    images: p.images.nodes.length ? p.images.nodes.map((i) => img(i, p.title)) : (local?.images ?? []),
    financing: p.tags.includes("financiacion") || (local?.financing ?? false),
  };
}

export async function shopifyProducts(locals: Product[]): Promise<Product[]> {
  const data = await storefront<{ products: { nodes: SProduct[] } }>(`{ products(first: 250, sortKey: TITLE) { nodes { ${PRODUCT_FIELDS} } } }`);
  return data.products.nodes.map((p) => toProduct(p, locals.find((l) => l.handle === p.handle)));
}

export async function shopifyCollections(locals: Collection[]): Promise<Collection[]> {
  const data = await storefront<{ collections: { nodes: { handle: string; title: string; description: string; image: SImage | null }[] } }>(
    `{ collections(first: 20) { nodes { handle title description image { url altText } } } }`,
  );
  return data.collections.nodes
    .filter((c) => c.handle !== "frontpage")
    .map((c) => {
      const local = locals.find((l) => l.handle === c.handle);
      return {
        handle: c.handle,
        title: c.title,
        description: c.description || local?.description || "",
        image: c.image ? img(c.image, c.title) : (local?.image ?? img(null, c.title)),
      };
    });
}

/** Crea un carrito en Shopify y devuelve la URL de su caja de pago segura. */
export async function shopifyCheckout(lines: { handle: string; quantity: number }[]): Promise<string> {
  const variants = await Promise.all(
    lines.map(async (l) => {
      const d = await storefront<{ product: { variants: { nodes: { id: string }[] } } | null }>(
        `query($h: String!) { product(handle: $h) { variants(first: 1) { nodes { id } } } }`,
        { h: l.handle },
      );
      const id = d.product?.variants.nodes[0]?.id;
      if (!id) throw new Error(`Producto sin variante en Shopify: ${l.handle}`);
      return { merchandiseId: id, quantity: l.quantity };
    }),
  );
  const d = await storefront<{ cartCreate: { cart: { checkoutUrl: string } | null; userErrors: { message: string }[] } }>(
    `mutation($lines: [CartLineInput!]!) { cartCreate(input: { lines: $lines }) { cart { checkoutUrl } userErrors { message } } }`,
    { lines: variants },
  );
  if (!d.cartCreate.cart) throw new Error(d.cartCreate.userErrors.map((e) => e.message).join("; "));
  return d.cartCreate.cart.checkoutUrl;
}
