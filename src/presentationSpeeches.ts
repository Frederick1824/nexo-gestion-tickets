export interface PresentationSpeech {
  number: string;
  name: string;
  topic: string;
  summary: string;
  speech: string;
}

export const presentationSpeeches: PresentationSpeech[] = [
  {
    number: "01",
    name: "Josefina Alcaraz",
    topic: "Presentación y contexto",
    summary:
      "Introduce a Ctrl+Estudio, el caso de Trama y la pregunta comunicacional que orienta el proyecto.",
    speech:
      "Buenas, somos el grupo Ctrl+Estudio y hoy les vamos a presentar NEXO desde Competencias Comunicacionales II. Este proyecto nace de un problema que parece simple, pero complica mucho el trabajo: en Trama Soluciones Digitales, los pedidos de soporte llegan por WhatsApp, correo, teléfono, de manera presencial y por formularios web. Cada canal funciona por separado. Entonces, a veces un pedido se repite, otras veces nadie sabe quién lo está atendiendo y el cliente no tiene una respuesta clara. En Sistemas y Organizaciones vimos cómo ordenar ese trabajo. Ahora nos preguntamos algo igual de importante: ¿cómo logramos que todos se comuniquen mejor? Para explicar qué consecuencias tiene esta situación, le doy la palabra a Fiorella.",
  },
  {
    number: "02",
    name: "Fiorella Castillo",
    topic: "El problema de comunicación",
    summary:
      "Explica la información fragmentada y presenta los datos del diagnóstico de marzo de 2026.",
    speech:
      "El problema no es solamente tener muchos canales, sino que la información queda repartida. Una persona puede recibir un mensaje por WhatsApp y otra, una llamada por el mismo inconveniente, sin saber que se trata del mismo caso. Eso provoca tareas duplicadas, confusiones y demoras. En el caso que analizamos, durante marzo de 2026 se registraron 96 solicitudes repetidas en más de un canal, 74 casos sin responsable y 51 cambios de prioridad sin registro. Estas cifras muestran por qué es importante que todos tengan acceso a la misma información. NEXO propone un registro común para que cada solicitud tenga seguimiento, responsable e historial. Pero una herramienta sola no alcanza: también hacen falta reglas claras para usarla. Emmanuel nos va a contar cuáles son los objetivos.",
  },
  {
    number: "03",
    name: "Emmanuel Gillio",
    topic: "Objetivos del proyecto",
    summary:
      "Presenta el registro único, las organizaciones piloto, los criterios compartidos y la capacitación.",
    speech:
      "Nuestro objetivo principal es mejorar la comunicación entre el equipo de Trama y sus clientes mediante un registro único de solicitudes. Para empezar, el proyecto propone trabajar con diez organizaciones piloto. La idea es que NEXO se convierta en el canal principal para registrar los pedidos, que cada caso tenga un historial ordenado y que se sepa quién está a cargo. También queremos que todos utilicen el mismo criterio para decidir qué es urgente y qué puede esperar. Otro punto fundamental es la capacitación: no sirve de mucho crear una plataforma si después nadie sabe cómo usarla. Por eso, este trabajo combina tecnología con acuerdos y explicaciones sencillas. Ahora Emilio va a mostrar cómo pensamos acompañar ese cambio.",
  },
  {
    number: "04",
    name: "Emilio Guzmán",
    topic: "Estrategia y planificación",
    summary:
      "Describe una transición gradual, la preparación inicial y el plan de trabajo de doce semanas.",
    speech:
      "Para que el cambio funcione, no alcanza con decirles a todos que usen NEXO desde mañana. Primero hay que preparar la plataforma, incorporar a las organizaciones piloto y explicar cómo se van a registrar las solicitudes. Después, debemos definir las prioridades, asignar responsables y enseñar el procedimiento al personal y a los clientes. El proyecto prevé un trabajo total de doce semanas. En el documento se detallan especialmente las primeras cuatro, que corresponden a la organización y preparación inicial. Las etapas posteriores se plantean para continuar la implementación, hacer pruebas y evaluar el uso. Lo importante es que la transición sea clara y gradual, para evitar que aparezcan nuevas confusiones. Marcelo va a presentar los materiales de comunicación que proponemos.",
  },
  {
    number: "05",
    name: "Marcelo Raspo",
    topic: "Tres productos comunicacionales",
    summary:
      "Expone el protocolo, la guía visual de prioridades y la propuesta de bot como materiales de acompañamiento.",
    speech:
      "Como resultado de este trabajo proponemos tres materiales concretos. El primero es un protocolo de gestión de incidencias, que indica cómo recibir, clasificar, asignar y cerrar un pedido, y quién se ocupa de cada paso. El segundo es una guía visual de prioridades, con cuatro niveles: baja, media, alta y crítica. La idea es que cualquier persona pueda entenderlos, aunque no tenga conocimientos técnicos. El tercero es una propuesta de bot de WhatsApp. No hablamos de un bot ya implementado, sino de un posible canal de transición que reciba consultas y las dirija al registro de NEXO. Estos tres productos buscan que las personas entiendan el sistema y confíen en él. Para cerrar la presentación, le paso la palabra a Federico.",
  },
  {
    number: "06",
    name: "Federico Montoro",
    topic: "Cierre y conclusiones",
    summary:
      "Integra los dos espacios curriculares y concluye con la importancia de conectar también a las personas.",
    speech:
      "Para cerrar, queremos destacar una idea: mejorar un sistema no es solamente programarlo. También es conseguir que las personas sepan cómo utilizarlo, compartan la información correcta y trabajen con criterios comunes. NEXO busca resolver las dos partes del problema. Desde Sistemas y Organizaciones, pensamos cómo ordenar los procesos y las responsabilidades. Desde Competencias Comunicacionales II, trabajamos en cómo comunicar esos cambios y acompañar a quienes van a usar la herramienta. Por eso, el protocolo, la guía de prioridades y la propuesta de bot no son detalles secundarios: ayudan a que la solución tecnológica tenga sentido en la práctica. En definitiva, NEXO no se trata solo de conectar solicitudes, sino también de conectar personas. Muchas gracias por escucharnos.",
  },
];
