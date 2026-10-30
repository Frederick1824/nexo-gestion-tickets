export type Priority = "baja" | "media" | "alta" | "crítica";
export type Status = "Pendiente" | "En proceso" | "Resuelta" | "Cerrada";
export type Area =
  | "Mesa de Entrada"
  | "Soporte Técnico"
  | "Infraestructura y Seguridad"
  | "Desarrollo";
export type Role = "Coordinación" | "Mesa de Entrada" | "Técnico";
export interface HistoryEvent {
  id: string;
  at: string;
  actor: string;
  type: string;
  detail: string;
}
export interface Ticket {
  id: string;
  createdAt: string;
  organization: string;
  title: string;
  description: string;
  category: string;
  priority: Priority;
  area: Area;
  technician?: string;
  collaborators: string[];
  status: Status;
  history: HistoryEvent[];
  diagnosis?: string;
  solution?: string;
  verification?: string;
  resolvedAt?: string;
  reopenCount: number;
  fictitious: boolean;
}
export interface NewTicket {
  organization: string;
  title: string;
  description: string;
  category: string;
  priority: Priority;
  area: Area;
  technician?: string;
}
