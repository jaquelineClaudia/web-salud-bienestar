// Datos de la empresa. Los campos marcados "RELLENAR" se completan antes de publicar.
export const site = {
  nombreComercial: "Salud Bienestar Publicaciones",
  razonSocial: "Publicaciones Martín Casado S.L.",
  cif: "B85032811", // CIF: no se muestra en el pie; solo en Aviso legal, donde lo exige la LSSI (art. 10)
  datosRegistrales: "", // Registro Mercantil de Madrid, tomo, folio, hoja (vacío = no se muestra)
  direccion: "C. Puerto de la Morcuera, 13",
  cp: "28919",
  ciudad: "Leganés (Madrid)",
  telefono: "682 674 797",
  telefonoE164: "+34682674797",
  email: "publicacionesmcsl@gmail.com",
  horario: "Te atendemos cuando te venga bien",
  marca: "Bioenergy Dreams",
  // Dirección pública de la web. Al tener dominio propio, se cambia aquí (o con NEXT_PUBLIC_SITE_URL en Vercel).
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://web-salud-bienestar.vercel.app",
  // false = Google no la muestra. Se pasa a true cuando la empresa decida salir en buscadores.
  indexar: false,
  // Código de verificación de Google Search Console (método "Etiqueta HTML", solo el valor de content).
  googleVerification: "Q3TuI5RSDVj8hnFFeP03a9Nr9PzHiClc3WqdBQbcAuU",
  linkedin: "https://www.linkedin.com/",
} as const;

export const whatsappUrl = (texto = "Hola, me gustaría recibir asesoramiento.") =>
  `https://wa.me/${site.telefonoE164.replace("+", "")}?text=${encodeURIComponent(texto)}`;

export const nav = [
  { href: "/tienda", label: "Tienda" },
  { href: "/asesoramiento", label: "Asesoramiento" },
  { href: "/sobre-nosotros", label: "Nosotros" },
  { href: "/blog", label: "Blog" },
  { href: "/contacto", label: "Contacto" },
] as const;

export const legal = [
  { href: "/legal/aviso-legal", label: "Aviso legal" },
  { href: "/legal/privacidad", label: "Privacidad" },
  { href: "/legal/cookies", label: "Cookies" },
  { href: "/legal/condiciones-de-venta", label: "Condiciones de venta" },
  { href: "/legal/envios-y-devoluciones", label: "Envíos y devoluciones" },
  { href: "/legal/accesibilidad", label: "Accesibilidad" },
] as const;
