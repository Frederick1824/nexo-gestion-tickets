import type { Area, Priority, Status, Ticket } from "./types";
export const areas: Area[] = [
  "Mesa de Entrada",
  "Soporte Técnico",
  "Infraestructura y Seguridad",
  "Desarrollo",
];
export const technicians = [
  "Lucía Torres",
  "Marcos Vidal",
  "Sofía Ríos",
  "Diego Luna",
];
export const priorities: Priority[] = ["baja", "media", "alta", "crítica"];
export const statuses: Status[] = [
  "Pendiente",
  "En proceso",
  "Resuelta",
  "Cerrada",
];
const specs: [string, string, Priority, Area, Status, string | undefined][] = [
  [
    "TRAMA-001",
    "Acceso bloqueado al portal",
    "crítica",
    "Infraestructura y Seguridad",
    "Pendiente",
    undefined,
  ],
  [
    "TRAMA-002",
    "Impresora de recepción sin conexión",
    "media",
    "Soporte Técnico",
    "Pendiente",
    undefined,
  ],
  [
    "TRAMA-003",
    "Actualizar formulario de contacto",
    "baja",
    "Desarrollo",
    "Pendiente",
    "Sofía Ríos",
  ],
  [
    "TRAMA-004",
    "Correo institucional con rebotes",
    "alta",
    "Infraestructura y Seguridad",
    "Pendiente",
    undefined,
  ],
  [
    "TRAMA-005",
    "Equipo con lentitud recurrente",
    "alta",
    "Soporte Técnico",
    "En proceso",
    "Lucía Torres",
  ],
  [
    "TRAMA-006",
    "Error al registrar clientes",
    "crítica",
    "Desarrollo",
    "En proceso",
    "Diego Luna",
  ],
  [
    "TRAMA-007",
    "Configurar nuevo puesto de trabajo",
    "media",
    "Soporte Técnico",
    "En proceso",
    "Marcos Vidal",
  ],
  [
    "TRAMA-008",
    "Recuperación de archivos compartidos",
    "alta",
    "Infraestructura y Seguridad",
    "Resuelta",
    "Lucía Torres",
  ],
  [
    "TRAMA-009",
    "Ajuste de permisos internos",
    "media",
    "Infraestructura y Seguridad",
    "Resuelta",
    "Marcos Vidal",
  ],
  [
    "TRAMA-010",
    "Corrección visual en sitio web",
    "baja",
    "Desarrollo",
    "Resuelta",
    "Sofía Ríos",
  ],
  [
    "TRAMA-011",
    "Alta de cuenta institucional",
    "media",
    "Mesa de Entrada",
    "Cerrada",
    "Marcos Vidal",
  ],
  [
    "TRAMA-012",
    "Falla de conectividad en sala",
    "alta",
    "Soporte Técnico",
    "Cerrada",
    "Lucía Torres",
  ],
];
const orgs = [
  "Trama Soluciones Digitales",
  "Fundación Horizonte",
  "Cooperativa Norte",
  "Estudio Andén",
];
export function seedTickets(): Ticket[] {
  const now = Date.now();
  return specs.map((s, i) => {
    const created = new Date(now - (i + 2) * 86400000);
    const [id, title, priority, area, status, technician] = s;
    const history = [
      {
        id: `h-${i}-1`,
        at: created.toISOString(),
        actor: "Mesa de Entrada",
        type: "Creación",
        detail: "Solicitud ficticia registrada para la demostración.",
      },
    ];
    if (technician)
      history.push({
        id: `h-${i}-2`,
        at: new Date(+created + 3600000).toISOString(),
        actor: "Mesa de Entrada",
        type: "Asignación",
        detail: `Técnico principal: ${technician}.`,
      });
    if (status !== "Pendiente")
      history.push({
        id: `h-${i}-3`,
        at: new Date(+created + 7200000).toISOString(),
        actor: technician || "Mesa de Entrada",
        type: "Estado",
        detail: "Trabajo iniciado: Pendiente → En proceso.",
      });
    if (["Resuelta", "Cerrada"].includes(status))
      history.push(
        {
          id: `h-${i}-4`,
          at: new Date(+created + 172800000).toISOString(),
          actor: technician || "Técnico",
          type: "Intervención",
          detail:
            "Diagnóstico realizado, solución aplicada y funcionamiento verificado.",
        },
        {
          id: `h-${i}-5`,
          at: new Date(+created + 176400000).toISOString(),
          actor: technician || "Técnico",
          type: "Estado",
          detail: "En proceso → Resuelta.",
        },
      );
    if (status === "Cerrada")
      history.push({
        id: `h-${i}-6`,
        at: new Date(+created + 259200000).toISOString(),
        actor: "Coordinación",
        type: "Cierre",
        detail: "Resolución validada: Resuelta → Cerrada.",
      });
    if (i === 11)
      history.push(
        {
          id: "h-reopen",
          at: new Date(+created + 345600000).toISOString(),
          actor: "Mesa de Entrada",
          type: "Reapertura",
          detail: "Reapertura justificada por recurrencia de la falla.",
        },
        {
          id: "h-reclose",
          at: new Date(+created + 432000000).toISOString(),
          actor: "Coordinación",
          type: "Cierre",
          detail: "Nueva verificación completada; ticket cerrado.",
        },
      );
    return {
      id,
      createdAt: created.toISOString(),
      organization: orgs[i % 4],
      title,
      description:
        "Caso ficticio creado para demostrar el flujo de gestión y trazabilidad de NEXO.",
      category: ["Accesos", "Hardware", "Software", "Redes"][i % 4],
      priority,
      area,
      status,
      technician,
      collaborators: i === 5 ? ["Sofía Ríos"] : [],
      history,
      diagnosis: ["Resuelta", "Cerrada"].includes(status)
        ? "Se identificó la causa del incidente."
        : undefined,
      solution: ["Resuelta", "Cerrada"].includes(status)
        ? "Se aplicó el procedimiento correctivo correspondiente."
        : undefined,
      verification: ["Resuelta", "Cerrada"].includes(status)
        ? "Prueba funcional satisfactoria."
        : undefined,
      resolvedAt: ["Resuelta", "Cerrada"].includes(status)
        ? new Date(+created + 176400000).toISOString()
        : undefined,
      reopenCount: i === 11 ? 1 : 0,
      fictitious: true,
    };
  });
}
