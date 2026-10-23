// Artículos del blog. Sin afirmaciones sanitarias: hábitos, cuidado de la casa y uso de los productos.
export type Post = {
  slug: string;
  title: string;
  summary: string;
  date: string; // AAAA-MM-DD
  minutes: number;
  slot: string;
  body: { h?: string; p: string[] }[];
};

export const posts: Post[] = [
  {
    slug: "como-elegir-colchon-en-casa",
    title: "Cómo elegir colchón sin equivocarte: cinco preguntas antes de comprar",
    summary: "Medida, firmeza, cómo duermes y con quién. Lo que te preguntaremos en la visita, para que llegues con las respuestas.",
    date: "2026-10-20",
    minutes: 4,
    slot: "cat-descanso",
    body: [
      { p: ["Un colchón te acompaña muchos años, así que merece la pena elegirlo con calma. Estas son las preguntas que hacemos siempre en la visita."] },
      { h: "1. ¿Qué medida necesitas de verdad?", p: ["Mide el somier o la cama antes de nada. Si dormís dos, piensa si hay espacio para pasar de 135 a 150 cm de ancho: se nota mucho."] },
      { h: "2. ¿Cómo duermes?", p: ["De lado, boca arriba o boca abajo. La postura cambia la firmeza que te resultará cómoda, y por eso conviene probar tumbándose unos minutos en la postura de siempre."] },
      { h: "3. ¿Pasas calor por la noche?", p: ["Los tejidos y los muelles ensacados dejan pasar el aire de forma distinta. Cuéntanoslo y te enseñamos las opciones."] },
      { h: "4. ¿Cuánto se mueve la otra persona?", p: ["Los muelles ensacados trabajan cada uno por su cuenta, así que el movimiento de un lado se nota menos en el otro."] },
      { h: "5. ¿Qué almohada usas?", p: ["La almohada y el colchón van juntos. Una almohada configurable, como la ADAPTA 3.0, se ajusta en altura para que encaje con tu colchón nuevo."] },
      { p: ["Si quieres, vamos a tu casa con muestras y lo vemos juntos, sin compromiso."] },
    ],
  },
  {
    slug: "planchar-en-vertical",
    title: "Planchar en vertical: camisas, cortinas y ropa de cama sin sacar la tabla",
    summary: "Unos trucos sencillos para planchar colgando la ropa, y cómo cuidar la plancha para que dure.",
    date: "2026-10-14",
    minutes: 3,
    slot: "plancha-principal",
    body: [
      { p: ["Planchar en vertical ahorra tiempo en el día a día: cuelgas la prenda y la repasas sin montar la tabla."] },
      { h: "Camisas", p: ["Cuélgala en una percha, abrocha el primer botón y estira el tejido hacia abajo con una mano mientras pasas la plancha con la otra. Empieza por el cuello y los puños."] },
      { h: "Cortinas", p: ["Repásalas colgadas, de arriba abajo. Así no hace falta descolgarlas cada vez."] },
      { h: "Ropa de cama", p: ["Tiende la sábana sobre el colchón ya hecho y pasa la plancha en horizontal. Queda lisa y lista."] },
      { h: "Para que dure", p: ["Usa agua del grifo o la que indique el manual, vacía el depósito si vas a guardarla varios días y déjala enfriar en su base antes de recogerla."] },
    ],
  },
  {
    slug: "rincon-de-relax-en-casa",
    title: "Un rincón de relax en casa con lo que ya tienes",
    summary: "Luz, una silla cómoda y quince minutos para ti. Ideas sencillas para desconectar al final del día.",
    date: "2026-10-07",
    minutes: 3,
    slot: "shiatsu-principal",
    body: [
      { p: ["No hace falta una habitación entera. Basta un rincón tranquilo y un rato fijo cada día."] },
      { h: "Elige el sitio", p: ["Junto a una ventana o en una esquina del salón, lejos de la tele. Una silla o un sillón donde apoyes bien la espalda."] },
      { h: "Luz cálida", p: ["Por la tarde, apaga la luz del techo y deja una lámpara baja. El cambio se nota."] },
      { h: "Un rato tuyo", p: ["Quince minutos con música suave, un libro o el centro de masaje Shiatsu sobre tu silla. Tiene apagado automático a los 15 minutos, así que no tienes que estar pendiente."] },
    ],
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
export const formatDate = (d: string) =>
  new Date(`${d}T12:00:00`).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" });
