import { collections, products } from "./mock";
import type { Collection, Money, Product } from "./types";

// Punto único de acceso a la tienda. Hoy lee la tienda simulada; al conectar Shopify
// se cambia esta capa por llamadas a la API Storefront con las mismas firmas.

export async function getProducts(): Promise<Product[]> {
  return products;
}

export async function getProduct(handle: string): Promise<Product | undefined> {
  return products.find((p) => p.handle === handle);
}

export async function getCollections(): Promise<Collection[]> {
  return collections;
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
  return order.map((h) => products.find((p) => p.handle === h)!).filter(Boolean);
}

export async function getRelated(product: Product, limit = 3): Promise<Product[]> {
  const same = products.filter((p) => p.handle !== product.handle && p.collection === product.collection);
  const rest = products.filter((p) => p.handle !== product.handle && p.collection !== product.collection);
  return [...same, ...rest].slice(0, limit);
}

const fmt = new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" });
export const formatMoney = (m?: Money) => (m ? fmt.format(Number(m.amount)) : "Precio a consultar");
export const sumMoney = (lines: { price?: Money; quantity: number }[]) =>
  fmt.format(lines.reduce((t, l) => t + (l.price ? Number(l.price.amount) * l.quantity : 0), 0));

export type { Collection, Product } from "./types";
