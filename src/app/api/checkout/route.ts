import { shopifyCheckout, shopifyEnabled } from "@/lib/store/shopify";

// Pasa el carrito de la web a la caja de pago de Shopify. Sin Shopify configurado devuelve { demo: true }.
export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as { lines?: { handle?: unknown; quantity?: unknown }[] } | null;
  const lines = (body?.lines ?? [])
    .filter((l) => typeof l.handle === "string" && Number.isInteger(l.quantity) && (l.quantity as number) > 0 && (l.quantity as number) <= 20)
    .map((l) => ({ handle: l.handle as string, quantity: l.quantity as number }))
    .slice(0, 30);
  if (!lines.length) return Response.json({ error: "Carrito vacío" }, { status: 400 });
  if (!shopifyEnabled) return Response.json({ demo: true });
  try {
    return Response.json({ url: await shopifyCheckout(lines) });
  } catch (e) {
    console.error("[checkout]", e);
    return Response.json({ demo: true, error: "No se pudo abrir la caja" }, { status: 502 });
  }
}
