import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { site } from "@/lib/site";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["opsz", "SOFT", "WONK"],
  display: "swap",
});

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Colchones, masaje y hogar sano en Leganés | Salud Bienestar Publicaciones",
    template: "%s | Salud Bienestar Publicaciones",
  },
  description:
    "Distribuidores de Bioenergy Dreams en Leganés y Madrid: colchones fabricados en España, centro de masaje Shiatsu y plancha con ozono. Asesoramiento en tu casa.",
  robots: { index: false, follow: false }, // prototipo: no indexar
};

export const viewport: Viewport = { themeColor: "#f3f5f1" };

const localBusiness = {
  "@context": "https://schema.org",
  "@type": "Store",
  name: site.nombreComercial,
  legalName: site.razonSocial,
  telephone: site.telefonoE164,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.direccion,
    postalCode: site.cp,
    addressLocality: "Leganés",
    addressRegion: "Madrid",
    addressCountry: "ES",
  },
  areaServed: "Comunidad de Madrid",
  brand: site.marca,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-ES" className={`${fraunces.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} />
      </head>
      <body className="antialiased">
        <a href="#contenido" className="skip-link">Saltar al contenido</a>
        <Header />
        <main id="contenido" className="pt-[72px]">{children}</main>
        <Footer />
        <WhatsAppFab />
        <CartDrawer />
        <CookieBanner />
      </body>
    </html>
  );
}
