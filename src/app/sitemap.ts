import type { MetadataRoute } from "next";
import { site, legal } from "@/lib/site";
import { getProducts } from "@/lib/store";
import { publicados } from "@/lib/content/blog";

export const revalidate = 3600;

// Mapa del sitio para Google: páginas, productos, artículos y textos legales.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const u = (path: string) => `${site.url}${path}`;
  const pages = ["", "/tienda", "/asesoramiento", "/sobre-nosotros", "/contacto", "/blog", "/trabaja-con-nosotros"];
  return [
    ...pages.map((p) => ({ url: u(p), changeFrequency: "weekly" as const, priority: p === "" ? 1 : 0.8 })),
    ...(await getProducts()).map((p) => ({ url: u(`/tienda/${p.handle}`), changeFrequency: "weekly" as const, priority: 0.7 })),
    ...publicados().map((p) => ({ url: u(`/blog/${p.slug}`), lastModified: p.date, priority: 0.5 })),
    ...legal.map((l) => ({ url: u(l.href), priority: 0.2 })),
  ];
}
