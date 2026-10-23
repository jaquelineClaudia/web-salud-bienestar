import { collections as localCollections, products as base } from "./mock";
import { catalogo } from "./catalogo";
import { shopifyCollections, shopifyEnabled, shopifyProducts } from "./shopify";
import type { Collection, Product } from "./types";

// Punto único de acceso a la tienda. Sin Shopify configurado lee la tienda simulada;
// con SHOPIFY_STORE_DOMAIN y SHOPIFY_STOREFRONT_TOKEN lee Shopify (ver shopify.ts).

const localProducts = [...base, ...catalogo];

export async function getProducts(): Promise<Product[]> {
  if (!shopifyEnabled) return localProducts;
  try {
    return await shopifyProducts(localProducts);
  } catch (e) {
    console.error(e);
    return localProducts;
  }
}

export async function getProduct(handle: string): Promise<Product | undefined> {
  return (await getProducts()).find((p) => p.handle === handle);
}

export async function getCollections(): Promise<Collection[]> {
  if (!shopifyEnabled) return localCollections;
  try {
    return await shopifyCollections(localCollections);
  } catch (e) {
    console.error(e);
    return localCollections;
  }
}

export async function getFeatured(): Promise<Product[]> {
  const order = [
    "plancha-portatil-multifuncion",
    "centro-masaje-shiatsu-zen-premium",
    "colchon-electro-scudo-biobalance",
    "aspirador-sin-cables-cyclone-led",
    "colchon-oxygen-clinic",
    "almohada-adapta-3-0",
    "biopure-water",
  ];
  const products = await getProducts();
  return order.map((h) => products.find((p) => p.handle === h)!).filter(Boolean);
}

export async function getRelated(product: Product, limit = 3): Promise<Product[]> {
  const products = await getProducts();
  const same = products.filter((p) => p.handle !== product.handle && p.collection === product.collection);
  const rest = products.filter((p) => p.handle !== product.handle && p.collection !== product.collection);
  return [...same, ...rest].slice(0, limit);
}

export { formatMoney, sumMoney } from "./money";

export type { Collection, Product } from "./types";
