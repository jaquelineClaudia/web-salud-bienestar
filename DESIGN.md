# DESIGN.md · Salud Bienestar Publicaciones

Contrato de diseño (skill reference-design-contract). Plan aprobado por Jaqueline el 23/10/2026.

## 1. Visual Theme & Atmosphere
Revista de descanso: mucho aire, fotos luminosas y reales, titulares serif, movimiento lento.
Público: adultos y personas mayores de Leganés y Madrid. La accesibilidad manda sobre el efecto.
Diales (taste-skill): DESIGN_VARIANCE 6 · MOTION_INTENSITY 5 · VISUAL_DENSITY 3.

## 2. Color
Un único color de acción. Nada de beige con dorados ni degradados morados.
| Token | Valor | Uso |
| --- | --- | --- |
| `--ink` / `--action` | #1F4A42 | Texto principal, botones |
| `--paper` | #F3F5F1 | Fondo |
| `--mint` | #DCEBE2 | Superficies |
| `--sage` | #A9BFAE | Bloques, huecos de foto |
| `--night` | #0F2622 | Única sección en modo noche (home, "cansancio") |
| `--ink-soft` | #4A615A | Texto secundario (AA sobre paper y mint) |
El modo oscuro del sistema no invierte la página: la noche es un momento narrativo, una sola vez.

## 3. Typography
- Titulares: Fraunces (pedida en el encargo). Peso 300-400, SOFT 50, WONK 0, opsz alto. Énfasis con cursiva de la misma familia.
- Texto: Inter, justificada por legibilidad para personas mayores. Cuerpo mínimo 18 px, interlineado 1.6, máx. 65 caracteres.
- Escala: 18 / 20 / 24 / 32 / 44 / 64 / 88 px. Nada de etiquetas pequeñas en mayúsculas sobre cada sección (máx. 1 cada 3 secciones).

## 4. Spacing & Grid
Rejilla de 12 columnas, máx. 1360 px, margen lateral 20 px móvil / 48 px escritorio. Secciones con 120-200 px de aire vertical.
En móvil todo colapsa a una columna.

## 5. Layout & Composition
Asimetría: texto en columnas 1-5, imagen desplazada en 7-12; sin héroes centrados.
Cada sección de la home usa una familia de composición distinta (split, pin, horizontal, mosaico, lista tipográfica, carril, dos caminos).
Máx. 2 secciones seguidas de imagen+texto.

## 6. Components
- Radios: botones en píldora; fotos y paneles 20 px; campos 12 px. Sin tarjetas con sombra salvo el carrito.
- Botón primario: fondo `--action`, texto `--paper`, alto mín. 52 px, efecto onda desde el punto de pulsación.
- Un texto por intención: "Ver la tienda", "Pedir asesoramiento", "Añadir al carrito", "Comprar ahora".
- Huecos de foto (`ImageSlot`): nombre y proporción fijos; si no hay foto, panel salvia con el nombre del producto.
- Iconos: Phosphor, trazo "light".

## 7. Motion & Interaction
GSAP + ScrollTrigger para scroll; Motion para carrito y transiciones de página.
Curvas lentas (0,8-1,4 s, `power3.out` / `expo.out`), sin rebotes. Solo transform y opacity.
`prefers-reduced-motion: reduce` → todo visible y estático, sin pin ni scrub.

## 8. Voice & Brand
Español de España, tú, cercano y claro. Frases cortas. Sin afirmaciones sanitarias (RD 1907/1996):
se habla de descanso, relax, comodidad y limpieza del hogar. Datos técnicos con "según el fabricante".
"Te atendemos cuando te venga bien" en lugar de horario.

## 9. Anti-patterns
Degradados morados, tres tarjetas iguales en fila, iconos de stock, "Bienvenido a nuestra web",
rayas largas (—) en textos, indicadores de "scroll", números de sección tipo "01 /", opiniones inventadas,
cursores personalizados, botones con texto en dos líneas.
