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
    slug: "manos-cansadas-rigidas-habitos",
    title: "Manos cansadas y rígidas: 7 hábitos que ayudan en el día a día",
    summary: "Por qué se notan las manos rígidas o cansadas, hábitos sencillos para cuidarlas, cuándo ir al médico y un rato de relax en casa.",
    date: "2026-11-01",
    minutes: 6,
    slot: "presoterapia-mano",
    body: [
      { p: ["Este artículo es solo informativo y no sustituye la opinión de tu médico. Si tienes molestias en las manos que no se van, lo primero es que te vea un profesional."] },
      { p: ["Abrir un bote, abrocharse un botón o escribir un mensaje en el móvil. Son gestos pequeños, pero cuando las manos amanecen rígidas o llegan cansadas al final del día, se notan mucho. Es algo que nos cuentan a menudo en las visitas que hacemos por Leganés y la zona sur de Madrid, sobre todo cuando llega el frío."] },
      { h: "¿Por qué se notan las manos rígidas o cansadas?", p: [
        "Las manos trabajan todo el día: tienen muchas articulaciones pequeñas, tendones y músculos que se mueven sin parar. Estas son algunas causas habituales de esa sensación.",
        "Los años: con la edad, las articulaciones pierden algo de flexibilidad y es normal notar las manos más torpes al despertar. El frío: en invierno las manos se quedan frías y menos ágiles. Los movimientos repetidos: coser, cocinar, escribir en el móvil o hacer trabajos manuales durante muchas horas cansa la mano. Y también el poco movimiento: si las manos pasan mucho tiempo quietas, se agarrotan.",
        "Algunas enfermedades, como la artrosis, la artritis o el síndrome del túnel carpiano, también pueden causar rigidez, dolor u hormigueo. Por eso es importante que un médico valore cualquier molestia que no se va.",
      ] },
      { h: "7 hábitos sencillos para cuidar tus manos", p: [
        "1. Empieza el día con agua tibia. Mete las manos unos minutos en agua tibia, no caliente, y mueve los dedos despacio.",
        "2. Haz cuatro movimientos suaves, cinco veces cada uno y sin llegar al dolor: cierra la mano en un puño suave y ábrela estirando bien los dedos; toca con el pulgar la punta de cada dedo; separa los dedos todo lo que puedas y vuelve a juntarlos; con la mano apoyada en la mesa, levanta los dedos uno a uno.",
        "3. Haz pausas. Si haces una tarea repetitiva, para cada 30 o 45 minutos, sacude las manos y estíralas.",
        "4. Abrígalas en invierno. Guantes al salir a la calle y, en casa, unos mitones finos si se te quedan frías.",
        "5. Usa ayudas para los gestos difíciles. Abrebotes, cubiertos con mango grueso o bolígrafos anchos hacen que la mano trabaje con menos esfuerzo.",
        "6. Muévete. Caminar y mantenerse activo ayuda a que todo el cuerpo, manos incluidas, se sienta mejor.",
        "7. Date un rato de relax. Un masaje suave en las palmas y los dedos, con un poco de crema, es un pequeño momento de cuidado para ti.",
      ] },
      { h: "¿Cuándo hay que ir al médico?", p: [
        "Estos consejos son para el bienestar del día a día y no sustituyen a una consulta. Pide cita con tu médico de cabecera si notas rigidez por la mañana que dura más de media hora; hinchazón, enrojecimiento o calor en alguna articulación; hormigueo o adormecimiento en los dedos, sobre todo por la noche; pérdida de fuerza, como que se te caigan las cosas; dedos que se ponen blancos o morados con el frío, o un dolor que aparece de repente o no mejora.",
      ] },
      { h: "Un momento de relax para tus manos, sin salir de casa", p: [
        "Además de estos hábitos, muchas personas disfrutan dedicando unos minutos al día a relajar las manos. Para eso tenemos nuestro masajeador de manos con presoterapia.",
        "Unas cámaras de aire envuelven la mano y la presionan y sueltan poco a poco, como un masaje. Tiene calor agradable para los días de frío, 3 modos de masaje y varios niveles de intensidad, y temporizador de 5, 10 o 15 minutos. Funciona sin cables, con batería recargable por USB-C, y pesa unos 1,3 kg, así que puedes usarlo en el sofá mientras ves la tele. Datos técnicos según el fabricante.",
        "Es un aparato de bienestar y relax, no un tratamiento médico. Si tienes alguna enfermedad, problemas de circulación, heridas en la mano o llevas marcapasos, consulta antes con tu médico.",
      ] },
      { h: "Preguntas frecuentes", p: [
        "¿Cuánto tiempo se usa cada vez? Tiene temporizador de 5, 10 o 15 minutos. Lo habitual es empezar por la sesión corta y la intensidad más baja.",
        "¿Se puede usar en las dos manos? Sí, primero una y después la otra.",
        "¿Es difícil de usar? No. Tiene un panel con botones grandes y, en la visita, te enseñamos a usarlo.",
        "¿Se puede pagar a plazos? Sí, con financiación de hasta 48 meses.",
      ] },
      { h: "¿Quieres probarlo en casa?", p: ["Te lo enseñamos en tu casa, con calma y sin compromiso. Atendemos en Leganés, Getafe, Fuenlabrada, Parla, Móstoles, Alcorcón, Madrid capital y Toledo, o puedes venir a vernos al Centro Comercial Prado Overa, planta baja, oficina 12, en Leganés."] },
    ],
  },
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
      { h: "Un rato de relax para tus manos", p: ["En nuestra tienda tenemos un equipo de masaje para la mano, pensado para tus ratos de relax y comodidad en casa. No es un medicamento ni un tratamiento, y no sustituye nada de lo que te haya indicado tu médico o tu fisioterapeuta.", "Si te interesa, te lo enseñamos funcionando en una visita o por videollamada y te contamos sus características técnicas según el fabricante, sin compromiso. Si estás en tratamiento, consulta antes con tu médico si es adecuado para ti."] },
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

// Fecha de hoy en Madrid (AAAA-MM-DD). Un artículo con fecha futura no se ve hasta ese día.
const hoyEnMadrid = () => new Date().toLocaleDateString("en-CA", { timeZone: "Europe/Madrid" });

/** Artículos ya publicados (fecha de hoy o anterior), del más nuevo al más antiguo. */
export const publicados = () =>
  posts.filter((p) => p.date <= hoyEnMadrid()).sort((a, b) => b.date.localeCompare(a.date));

export const getPost = (slug: string) => publicados().find((p) => p.slug === slug);
export const formatDate = (d: string) =>
  new Date(`${d}T12:00:00`).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" });
