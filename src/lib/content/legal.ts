import { site } from "@/lib/site";

// Textos legales orientativos. Deben revisarlos un gestor o abogado antes de publicar la web.
// Los campos "RELLENAR" salen de lib/site.ts.

export type LegalBlock = { h?: string; p?: string[]; list?: string[] };
export type LegalPage = { slug: string; title: string; updated: string; blocks: LegalBlock[] };

const titular = `${site.razonSocial} (nombre comercial: ${site.nombreComercial})`;
const domicilio = `${site.direccion}, ${site.cp} ${site.ciudad}`;
const UPDATED = "2026-10-23";

export const legalPages: LegalPage[] = [
  {
    slug: "aviso-legal",
    title: "Aviso legal",
    updated: UPDATED,
    blocks: [
      {
        h: "Datos del titular",
        p: ["En cumplimiento del artículo 10 de la Ley 34/2002 de Servicios de la Sociedad de la Información (LSSI), estos son los datos del titular de esta web:"],
        list: [
          `Titular: ${titular}`,
          `CIF: ${site.cif}`,
          `Domicilio: ${domicilio}`,
          `Correo: ${site.email}`,
          `Teléfono: ${site.telefono}`,
          ...(site.datosRegistrales ? [`Datos registrales: ${site.datosRegistrales}`] : []),
        ],
      },
      { h: "Objeto", p: [`Esta web presenta y vende los productos de ${site.marca} que distribuimos, y permite pedir asesoramiento o una demostración.`] },
      {
        h: "Información de producto",
        p: [
          "Las características técnicas que mostramos son las que indica el fabricante. Los productos de esta web no son productos sanitarios ni sustituyen la opinión de un profesional de la salud.",
        ],
      },
      { h: "Propiedad intelectual", p: [`Los textos y el diseño de esta web son de ${site.razonSocial}. Las marcas y fotos de producto pertenecen a sus titulares y se usan con fines informativos.`] },
      { h: "Responsabilidad", p: ["Procuramos que la información sea correcta y esté al día, pero puede contener errores puntuales. Si ves alguno, avísanos y lo corregimos."] },
      { h: "Ley aplicable", p: ["Se aplica la legislación española. Para cualquier conflicto con personas consumidoras, serán competentes los juzgados de su domicilio."] },
    ],
  },
  {
    slug: "privacidad",
    title: "Política de privacidad",
    updated: UPDATED,
    blocks: [
      { h: "Responsable", p: [`${titular}. ${domicilio}. Correo: ${site.email}.`] },
      {
        h: "Qué datos tratamos y para qué",
        list: [
          "Formularios de asesoramiento y contacto: nombre, teléfono, correo y lo que nos cuentes, para atender tu petición y concertar la visita o videollamada.",
          "Candidaturas de empleo: datos de contacto y CV, para el proceso de selección.",
          "Asistente de compra: lo que escribes en el chat, para responderte. Solo guardamos tus datos de contacto si nos los das y marcas la casilla para que te llamemos.",
          "Pedidos: datos de compra y envío, para gestionar el pedido, la factura y la garantía. El pago lo procesa la pasarela de pago; no vemos ni guardamos tu tarjeta.",
        ],
      },
      { h: "Base legal", p: ["Tu consentimiento (formularios, asistente y candidaturas), la ejecución del contrato (pedidos) y las obligaciones legales (facturación)."] },
      {
        h: "Cuánto tiempo los guardamos",
        list: [
          "Peticiones de asesoramiento, contacto y asistente: hasta 12 meses desde el último contacto, salvo que te hagas cliente.",
          "Conversaciones del asistente sin datos de contacto: no se guardan. Solo se mantienen en tu navegador mientras tienes la pestaña abierta.",
          "Candidaturas: 12 meses.",
          "Pedidos y facturas: los plazos que marca la ley (en general, 6 años).",
        ],
      },
      {
        h: "Con quién los compartimos",
        p: [
          "Con proveedores que nos ayudan a prestar el servicio: alojamiento de la web, tienda online y pasarela de pago, correo electrónico, hoja de cálculo donde anotamos las peticiones y, en el asistente, el proveedor del modelo de inteligencia artificial. Todos tratan los datos por encargo nuestro. Algunos están fuera del Espacio Económico Europeo y se acogen a las garantías previstas por el RGPD.",
          "No vendemos tus datos ni los cedemos para publicidad.",
        ],
      },
      { h: "Tus derechos", p: [`Puedes pedir acceso, rectificación, supresión, oposición, limitación y portabilidad escribiendo a ${site.email}. Si no te atendemos bien, puedes reclamar ante la Agencia Española de Protección de Datos (aepd.es).`] },
    ],
  },
  {
    slug: "cookies",
    title: "Política de cookies",
    updated: UPDATED,
    blocks: [
      { h: "Qué son", p: ["Pequeños archivos que la web guarda en tu navegador para recordar cosas, como el carrito."] },
      {
        h: "Cuáles usamos",
        list: [
          "Necesarias (propias): el carrito y tu elección sobre cookies. Siempre activas.",
          "Análisis (Google Analytics, de terceros): solo si las aceptas. Nos dicen qué páginas se visitan, sin identificarte.",
          "Mapa (Google Maps): solo se carga si pulsas «Ver el mapa» en la página de contacto.",
        ],
      },
      { h: "Cómo cambiar tu elección", p: ["Pulsa «Configurar cookies» al pie de cualquier página. También puedes borrarlas desde los ajustes de tu navegador."] },
    ],
  },
  {
    slug: "condiciones-de-venta",
    title: "Condiciones de venta",
    updated: UPDATED,
    blocks: [
      { h: "Vendedor", p: [`${titular}, ${domicilio}. CIF ${site.cif}.`] },
      { h: "Precios", p: ["Los precios incluyen IVA. Los gastos de envío, si los hay, se muestran antes de pagar."] },
      { h: "Pago", p: ["Tarjeta, Bizum y, en los productos que lo indican, pago a plazos con financiación sujeta a aprobación de la entidad."] },
      { h: "Derecho de desistimiento", p: ["Tienes 14 días naturales desde que recibes el producto para devolverlo sin dar explicaciones. Escríbenos a " + site.email + " o llámanos y te indicamos cómo hacerlo. Te devolvemos el dinero en un máximo de 14 días desde que nos comunicas tu decisión, por el mismo medio de pago.", "El producto debe devolverse en buen estado. Por higiene, los colchones, almohadas y textiles de cama no pueden devolverse si se ha retirado su precinto o protección, salvo defecto."] },
      { h: "Garantía", p: ["Los productos tienen la garantía legal de 3 años por falta de conformidad. Si algo falla, avísanos y lo gestionamos con el fabricante."] },
      { h: "Reclamaciones", p: [`Puedes escribirnos a ${site.email}. Tenemos hojas de reclamaciones a tu disposición.`] },
    ],
  },
  {
    slug: "envios-y-devoluciones",
    title: "Envíos y devoluciones",
    updated: UPDATED,
    blocks: [
      { h: "Envíos", p: ["Enviamos a la península. En Leganés y alrededores podemos llevarlo nosotros y enseñarte a usarlo. El plazo de entrega se indica en cada pedido y te avisamos antes de ir."] },
      { h: "Colchones y piezas grandes", p: ["Te llamamos para acordar día y hora de entrega."] },
      { h: "Devoluciones", p: ["Tienes 14 días desde que lo recibes. Consulta las condiciones en «Condiciones de venta» o llámanos y lo vemos."] },
      { h: "Si llega dañado", p: ["Anótalo en el albarán del transportista y escríbenos en las primeras 24 horas con una foto."] },
    ],
  },
  {
    slug: "accesibilidad",
    title: "Accesibilidad",
    updated: UPDATED,
    blocks: [
      { p: ["Queremos que cualquier persona pueda usar esta web con comodidad. La hemos hecho siguiendo las pautas WCAG 2.2 nivel AA:"] },
      {
        list: [
          "Letra de 18 px como mínimo y buen contraste.",
          "Botones grandes, fáciles de pulsar.",
          "Se puede navegar con teclado y con lector de pantalla.",
          "Si tu dispositivo tiene activado «reducir movimiento», la web quita las animaciones.",
        ],
      },
      { h: "¿Algo no funciona bien?", p: [`Cuéntanoslo en ${site.email} o al ${site.telefono} y lo arreglamos.`] },
    ],
  },
];

export const getLegalPage = (slug: string) => legalPages.find((p) => p.slug === slug);
