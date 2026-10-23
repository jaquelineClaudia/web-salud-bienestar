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
| Productos y categorías del prototipo | `src/lib/store/mock.ts` (al conectar Shopify, se gestionan desde su panel) |
| Huecos de foto y fotos del fabricante | `src/lib/media.ts` y `public/fotos/fabricante/` |
| Opiniones reales (la sección se oculta si está vacía) | `src/components/home/Opiniones.tsx` |
| Catálogo de referencia | `docs/catalogo_bioenergy_dreams.md` |

## Fotos del fabricante

Se muestran mientras no tengamos respuesta de Bioenergy Dreams. Para ocultarlas y dejar huecos limpios:

```bash
NEXT_PUBLIC_FOTOS_FABRICANTE=no
```

## Textos

Sin afirmaciones sanitarias (RD 1907/1996). Solo descanso, relax, comodidad, limpieza y datos técnicos "según el fabricante".
