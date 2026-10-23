import type { Money } from "./types";

// Formato de precios. Separado de index.ts para poder usarlo en componentes de cliente.
const fmt = new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" });
export const formatMoney = (m?: Money) => (m ? fmt.format(Number(m.amount)) : "Precio a consultar");
export const sumMoney = (lines: { price?: Money; quantity: number }[]) =>
  fmt.format(lines.reduce((t, l) => t + (l.price ? Number(l.price.amount) * l.quantity : 0), 0));
