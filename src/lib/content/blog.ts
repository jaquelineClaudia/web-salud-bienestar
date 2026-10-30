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
    slug: "artrosis-y-artritis",
    title: "Artrosis y artritis: en qué se diferencian y cómo cuidarte en el día a día",
    summary: "Dos palabras que se confunden mucho. Qué es cada una, qué opciones hay y qué hábitos suelen recomendar los profesionales.",
    date: "2026-10-30",
    minutes: 6,
    slot: "artrosi-stop-mano",
    body: [
      { p: ["Este artículo es solo informativo y no sustituye la opinión de tu médico ni de tu fisioterapeuta. Si tienes dolor o molestias en las articulaciones, lo primero es que te vea un profesional."] },
      { p: ["Artrosis y artritis suenan casi igual y muchas personas las usan como si fueran lo mismo. No lo son, y entender la diferencia ayuda a hablar con el médico con más claridad."] },
      { h: "Qué es la artrosis", p: ["La artrosis es un desgaste del cartílago, el tejido que recubre los extremos de los huesos y hace que la articulación se deslice con suavidad. Aparece sobre todo a partir de los 50 años y es muy frecuente en rodillas, caderas, manos y columna.", "Suele notarse como rigidez al levantarse o después de estar un rato quieto, que mejora al ponerse en marcha."] },
      { h: "Qué es la artritis", p: ["La artritis es una inflamación de la articulación. No es una sola enfermedad: hay muchos tipos, como la artritis reumatoide, la gota o la artritis psoriásica, y pueden aparecer a cualquier edad.", "Por eso es tan importante el diagnóstico: el médico de familia o el reumatólogo son quienes pueden decir qué tipo es y cómo abordarlo."] },
      { h: "Hay muchas formas de abordarlas", p: ["No existe una receta única. Según el caso, los profesionales combinan ejercicio adaptado, fisioterapia, control del peso, medicación pautada por el médico, ayudas como plantillas o férulas y, en algunos casos, otros tratamientos que decide el especialista.", "Lo que funciona a una persona puede no servirle a otra, así que conviene revisar el plan con tu médico de vez en cuando."] },
      { h: "Moverse, con cabeza", p: ["Casi todas las guías coinciden en que mantenerse activo es parte del cuidado. Estos son ejercicios suaves que los fisioterapeutas suelen proponer; pregunta al tuyo cuáles te convienen y cuántas repeticiones hacer:", "Caminar a diario, a tu ritmo y con buen calzado. Nadar o hacer aquagym, porque el agua reduce el peso sobre las articulaciones. Bicicleta estática con poca resistencia. Tai chi o yoga suave para el equilibrio y la flexibilidad.", "Para las manos: abrir y cerrar el puño despacio, tocar con el pulgar la punta de cada dedo y apretar una pelota blanda unos segundos. Para las rodillas: sentado en una silla, estirar la pierna y mantenerla unos segundos.", "Si un ejercicio te molesta, para y coméntalo con tu fisioterapeuta."] },
      { h: "Hábitos que ayudan en el día a día", p: ["Mantener un peso saludable, que se nota sobre todo en rodillas y caderas. Comer variado, al estilo de la dieta mediterránea. Alternar posturas y no estar mucho rato en la misma posición. Usar herramientas con mango grueso si te cuesta agarrar cosas pequeñas.", "Y descansar bien. Un colchón y una almohada adecuados hacen que la noche sea más cómoda y que te levantes con mejor ánimo para moverte al día siguiente."] },
      { h: "Un rato de relax para tus manos", p: ["En nuestra tienda tenemos el Artrosi Stop Mano, de la línea Bioenergy for Life: un equipo para la mano pensado para tus ratos de relax y comodidad en casa. No es un medicamento ni un tratamiento, y no sustituye nada de lo que te haya indicado tu médico o tu fisioterapeuta.", "Si te interesa, te lo enseñamos funcionando en una visita o por videollamada y te contamos sus características técnicas según el fabricante, sin compromiso. Si estás en tratamiento, consulta antes con tu médico si es adecuado para ti."] },
    ],
  },
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
