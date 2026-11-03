// Artículos del blog. Sin afirmaciones sanitarias: hábitos, cuidado de la casa y uso de los productos.
export type Post = {
  slug: string;
  title: string;
  summary: string;
  date: string; // AAAA-MM-DD
  minutes: number;
  slot: string;
  /** Producto de la tienda del que habla el artículo: sale un enlace a su ficha al final. */
  product?: { handle: string; title: string };
  /** img: foto opcional debajo de la sección (hueco de src/lib/media.ts). */
  body: { h?: string; p: string[]; img?: { slot: string; alt: string } }[];
};

export const posts: Post[] = [
  {
    slug: "espalda-baja-cargada-habitos",
    title: "Espalda baja cargada: hábitos para el día a día y cuándo ir al médico",
    summary: "Por qué se carga la zona lumbar, qué hábitos sencillos ayudan, las señales para consultar al médico y un rato de calor y relax en casa.",
    date: "2026-11-04",
    minutes: 6,
    slot: "blog-paseo-parque",
    product: { handle: "cinturon-laser-lumbar-abdominal", title: "Cinturón Láser Lumbar Abdominal" },
    body: [
      { p: ["Este artículo es solo informativo y no sustituye la opinión de tu médico ni de tu fisioterapeuta. Si tienes dolor de espalda, lo primero es que te vea un profesional."] },
      { p: ["Agacharse a coger la compra, pasar horas sentado o dormir en un colchón que ya no sujeta. La parte baja de la espalda, la zona lumbar, aguanta mucho en el día a día y es de las que antes se quejan. Es una de las molestias que más nos comentan en las visitas por Leganés y la zona sur de Madrid."] },
      { h: "¿Por qué se carga la zona lumbar?", p: [
        "La zona lumbar sostiene buena parte del peso del cuerpo y trabaja en casi todos los movimientos: agacharse, girarse, levantarse de la silla o cargar peso.",
        "Algunas causas habituales de esa sensación de espalda cargada son pasar muchas horas sentado o de pie en la misma postura, levantar peso doblando la espalda en lugar de las rodillas, moverse poco, el estrés y el cansancio, y un colchón o una silla que ya no dan buen apoyo.",
        "Con los años también aparecen cambios en la columna, como el desgaste de los discos o la artrosis. Por eso, si la molestia dura o va a más, es importante que la valore un médico.",
      ] },
      { h: "Hábitos sencillos que ayudan", p: [
        "1. Sigue moviéndote. Salvo que el médico te diga otra cosa, quedarse en la cama no suele ser buena idea. Caminar un poco cada día, a tu ritmo, es de lo que más se recomienda.",
        "2. Cambia de postura. Si pasas mucho rato sentado, levántate cada 30 o 45 minutos y da unos pasos.",
        "3. Siéntate con apoyo. Espalda pegada al respaldo, pies apoyados en el suelo y, si hace falta, un cojín pequeño en la zona lumbar.",
        "4. Agáchate con las rodillas. Para coger peso del suelo, dobla las rodillas, acerca el objeto al cuerpo y no gires la espalda mientras lo levantas.",
        "5. Reparte la carga. Mejor dos bolsas pequeñas, una en cada mano, que una muy pesada. Y si puedes, usa un carro de la compra.",
        "6. Cuida el descanso. Un colchón hundido o demasiado blando hace que la espalda no descanse bien. Como orientación, se suele revisar cada 8 a 10 años.",
        "7. Busca tu rato de calma. Una ducha templada, unos estiramientos suaves que te haya enseñado tu fisioterapeuta o unos minutos tumbado con las piernas apoyadas en alto ayudan a desconectar al final del día.",
      ], img: { slot: "blog-pareja-paseo", alt: "Una pareja mayor pasea de la mano por una calle soleada" } },
      { h: "¿Cuándo hay que ir al médico?", p: [
        "Pide cita con tu médico de cabecera si el dolor no mejora en unas semanas, si te despierta por la noche o si va a más.",
        "Ve a urgencias si el dolor aparece tras una caída o un golpe; si se acompaña de fiebre; si notas hormigueo, adormecimiento o pérdida de fuerza en una pierna, o si notas adormecida la zona de las ingles o tienes problemas para controlar la orina o las heces.",
      ] },
      { h: "Un rato de calor y relax para la espalda, en casa", p: [
        "Muchas personas disfrutan de un rato de calor en la espalda al final del día, con una manta o una bolsa de agua caliente. Si buscas algo más cómodo, tenemos un cinturón de masaje con calor, vibración y luz roja.",
        "Se ajusta con velcro a la cintura y también puede colocarse en otras zonas, como hombros, codo, pierna o rodilla. Tiene calor regulable en 4 niveles, de 40 a 55 °C, 4 modos de vibración y un panel de luces LED rojas e infrarrojas (685 y 895 nm). Funciona sin cables, con batería recargable por USB, y se maneja desde una pantalla con botones. Datos técnicos según el fabricante.",
        "Es un aparato de bienestar y relax, no un tratamiento médico. Empieza siempre por el calor más bajo y no lo uses mientras duermes. Si estás embarazada, llevas marcapasos, tienes diabetes, poca sensibilidad en la piel, heridas en la zona o estás en tratamiento, consulta antes con tu médico.",
      ] },
      { h: "Preguntas frecuentes", p: [
        "¿Solo sirve para la espalda? No. Por su forma de cinturón se puede colocar en la cintura, los hombros, el codo, la pierna o la rodilla.",
        "¿Se puede usar sentado en el sofá? Sí. No tiene cables, así que puedes usarlo sentado o tumbado mientras lees o ves la tele.",
        "¿Es difícil de usar? No. Tiene botón de encendido, selector de calor, de masaje y de intensidad de la luz. En la visita te enseñamos a usarlo.",
        "¿Se puede pagar a plazos? Sí, con financiación de hasta 48 meses.",
      ] },
      { h: "¿Quieres probarlo en casa?", p: ["Te lo enseñamos en tu casa, con calma y sin compromiso. Atendemos en Leganés, Getafe, Fuenlabrada, Parla, Móstoles, Alcorcón, Madrid capital y Toledo, o puedes venir a vernos al Centro Comercial Prado Overa, planta baja, oficina 12, en Leganés."] },
    ],
  },
  {
    slug: "manos-cansadas-rigidas-habitos",
    title: "Manos cansadas y rígidas: 7 hábitos que ayudan en el día a día",
    summary: "Por qué se notan las manos rígidas o cansadas, hábitos sencillos para cuidarlas, cuándo ir al médico y un rato de relax en casa.",
    date: "2026-11-01",
    minutes: 6,
    slot: "presoterapia-mano",
    product: { handle: "presoterapia-mano-mister-relax", title: "Presoterapia Mano Mister Relax" },
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
      ], img: { slot: "blog-manos-crema", alt: "Unas manos se reparten un poco de crema" } },
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
// En las vistas previas de Vercel (no en la web publicada) se ven también los programados, para revisarlos.
const esVistaPrevia = process.env.VERCEL_ENV === "preview";

export const publicados = () =>
  posts.filter((p) => esVistaPrevia || p.date <= hoyEnMadrid()).sort((a, b) => b.date.localeCompare(a.date));

export const getPost = (slug: string) => publicados().find((p) => p.slug === slug);
export const formatDate = (d: string) =>
  new Date(`${d}T12:00:00`).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" });
