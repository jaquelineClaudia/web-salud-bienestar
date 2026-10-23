# Salud Bienestar Publicaciones · web

Web de Publicaciones Martín Casado S.L. (Salud Bienestar Publicaciones), distribuidores de Bioenergy Dreams en Leganés.

Estado: **prototipo** (home + ficha de la plancha) con tienda simulada. Contrato de diseño en [DESIGN.md](DESIGN.md).

## Arrancar en local

```bash
npm install
npm run dev      # http://localhost:3000
```

## Dónde está cada cosa

| Qué | Dónde |
| --- | --- |
| Datos de la empresa (CIF, teléfono, dirección) | `src/lib/site.ts` |
| Productos y categorías (tienda simulada) | `src/lib/store/mock.ts` y `catalogo.ts` |
| Conexión con Shopify y caja de pago | `src/lib/store/shopify.ts`, `src/app/api/checkout/route.ts` |
| Formularios (asesoramiento, contacto, empleo) | `src/components/forms/`, `src/app/api/formulario/route.ts`, envío en `src/lib/server/notify.ts` |
| Asistente de compra | `src/components/assistant/Assistant.tsx`, `src/app/api/asistente/route.ts`, instrucciones en `src/lib/server/assistant-prompt.ts` |
| Blog | `src/lib/content/blog.ts` |
| Textos legales (revisar con gestor o abogado) | `src/lib/content/legal.ts` |
| Cookies y analítica | `src/components/layout/CookieBanner.tsx`, `Analytics.tsx` |
| Huecos de foto y fotos del fabricante | `src/lib/media.ts` y `public/fotos/fabricante/` |
| Opiniones reales (la sección se oculta si está vacía) | `src/components/home/Opiniones.tsx` |
| Catálogo de referencia | `docs/catalogo_bioenergy_dreams.md` |

## Servicios externos

Todo se configura con variables de entorno (ver `.env.example`). Sin ellas, la web funciona en modo prueba:

- **Shopify**: con `SHOPIFY_STORE_DOMAIN` y `SHOPIFY_STOREFRONT_TOKEN`, productos, precios, fotos y categorías salen de Shopify y "Ir a pagar" abre su caja segura. Los datos técnicos y el despiece se mantienen en `mock.ts` y se unen por el identificador del producto (handle). Precio 0 en Shopify = "a consultar"; la etiqueta `financiacion` activa la financiación.
- **Formularios**: con `RESEND_API_KEY` llegan al correo; con `GOOGLE_SHEETS_WEBHOOK_URL` se añade una fila a la hoja. Sin ninguna, se escriben en el registro del servidor.
- **Asistente**: con `ANTHROPIC_API_KEY`. No da consejos de salud, solo recomienda productos del catálogo y guarda los datos de contacto (y la conversación) solo con consentimiento expreso.
- **Analítica**: con `NEXT_PUBLIC_GA_ID`, y solo tras aceptar cookies.

## Fotos del fabricante

Se muestran mientras no tengamos respuesta de Bioenergy Dreams. Para ocultarlas y dejar huecos limpios:

```bash
NEXT_PUBLIC_FOTOS_FABRICANTE=no
```

## Textos

Sin afirmaciones sanitarias (RD 1907/1996). Solo descanso, relax, comodidad, limpieza y datos técnicos "según el fabricante".
