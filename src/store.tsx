import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { seedTickets } from "./data";
import type { NewTicket, Role, Ticket } from "./types";
type Mode = "operational" | "tour";
interface Store {
  tickets: Ticket[];
  role: Role;
  setRole: (r: Role) => void;
  mode: Mode;
  tourStep: number;
  tourActive: boolean;
  startTour: (fresh?: boolean) => void;
  leaveTour: () => void;
  advanceTour: () => void;
  addTicket: (x: NewTicket) => Ticket;
  updateTicket: (id: string, fn: (t: Ticket) => Ticket) => void;
  reset: () => void;
}
const C = createContext<Store | null>(null);
const KEY = "nexo:v1:tickets",
  TKEY = "nexo:v1:tour";
const read = (k: string) => {
  try {
    const x = localStorage.getItem(k);
    return x ? JSON.parse(x) : null;
  } catch {
    return null;
  }
};
export function StoreProvider({ children }: { children: ReactNode }) {
  const [normal, setNormal] = useState<Ticket[]>(
    () => read(KEY) || seedTickets(),
  );
  const [tour, setTour] = useState<{
    tickets: Ticket[];
    step: number;
    active: boolean;
  }>(() => read(TKEY) || { tickets: seedTickets(), step: 0, active: false });
  const [role, setRole] = useState<Role>("Coordinación");
  const mode: Mode = tour.active ? "tour" : "operational";
  useEffect(() => localStorage.setItem(KEY, JSON.stringify(normal)), [normal]);
  useEffect(() => localStorage.setItem(TKEY, JSON.stringify(tour)), [tour]);
  const tickets = mode === "tour" ? tour.tickets : normal;
  const setTickets = useCallback(
    (fn: (x: Ticket[]) => Ticket[]) =>
      mode === "tour"
        ? setTour((x) => ({ ...x, tickets: fn(x.tickets) }))
        : setNormal(fn),
    [mode],
  );
  const value = useMemo<Store>(
    () => ({
      tickets,
      role,
      setRole,
      mode,
      tourStep: tour.step,
      tourActive: tour.active,
      startTour: (fresh = false) =>
        setTour((x) => ({
          tickets: fresh ? seedTickets() : x.tickets,
          step: fresh ? 0 : x.step,
          active: true,
        })),
      leaveTour: () => setTour((x) => ({ ...x, active: false })),
      advanceTour: () =>
        setTour((x) => ({ ...x, step: Math.min(6, x.step + 1) })),
      addTicket: (n) => {
        const id = `NEXO-${Date.now().toString().slice(-6)}`;
        const t: Ticket = {
          ...n,
          id,
          createdAt: new Date().toISOString(),
          collaborators: [],
          status: "Pendiente",
          reopenCount: 0,
          fictitious: true,
          history: [
            {
              id: crypto.randomUUID(),
              at: new Date().toISOString(),
              actor: role,
              type: "Creación",
              detail: "Solicitud registrada.",
            },
          ],
        };
        setTickets((x) => [t, ...x]);
        return t;
      },
      updateTicket: (id, fn) =>
        setTickets((x) => x.map((t) => (t.id === id ? fn(t) : t))),
      reset: () => {
        if (mode === "tour")
          setTour({ tickets: seedTickets(), step: 0, active: true });
        else setNormal(seedTickets());
      },
    }),
    [tickets, role, mode, tour, setTickets],
  );
  return <C.Provider value={value}>{children}</C.Provider>;
}
export const useStore = () => {
  const x = useContext(C);
  if (!x) throw new Error("StoreProvider faltante");
  return x;
};
export const event = (actor: string, type: string, detail: string) => ({
  id: crypto.randomUUID(),
  at: new Date().toISOString(),
  actor,
  type,
  detail,
});
