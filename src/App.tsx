import {
  useEffect,
  useMemo,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import {
  Link,
  NavLink,
  Route,
  Routes,
  useNavigate,
  useParams,
} from "react-router-dom";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  BarChart3,
  BookOpen,
  CheckCircle2,
  ClipboardList,
  Clock3,
  Download,
  Eye,
  GitBranch,
  LayoutDashboard,
  Menu,
  Minus,
  Plus,
  RotateCcw,
  Search,
  ShieldCheck,
  Users,
  X,
  ZoomIn,
} from "lucide-react";
import { areas, priorities, statuses, technicians } from "./data";
import { event, useStore } from "./store";
import { TechNetwork } from "./components/TechNetwork";
import { CommunicationsLanding } from "./CommunicationsLanding";
import { ThemeToggle } from "./theme";
import type { Area, NewTicket, Priority, Ticket } from "./types";
const fmt = (x: string) =>
  new Intl.DateTimeFormat("es-AR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(x));
const pRank: Record<Priority, number> = {
  baja: 0,
  media: 1,
  alta: 2,
  crítica: 3,
};
function Welcome() {
  return (
    <main className="welcome-screen">
      <TechNetwork intensity="hero" />
      <ThemeToggle className="welcome-theme-toggle" />
      <div className="welcome-glow" aria-hidden="true" />
      <section className="welcome-content">
        <div className="welcome-mark" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="welcome-kicker">NEXO · DIGITAL NETWORK</div>
        <h1>
          NE<span>X</span>O
        </h1>
        <p>
          Plataforma de gestión y trazabilidad de solicitudes de soporte
          tecnológico
        </p>
        <div className="welcome-projects">
          <Link className="welcome-project" to="/proyecto">
            <small>01 · ENFOQUE ORGANIZACIONAL</small>
            <h2>Sistemas y Organizaciones</h2>
            <p>Cómo se organizan los procesos</p>
            <span>
              Ingresar al proyecto <ArrowRight />
            </span>
          </Link>
          <Link className="welcome-project" to="/comunicacionales">
            <small>02 · ENFOQUE COMUNICACIONAL</small>
            <h2>Competencias Comunicacionales II</h2>
            <p>Cómo se conectan las personas</p>
            <span>
              Ingresar al proyecto <ArrowRight />
            </span>
          </Link>
        </div>
        <div className="welcome-institution">
          ISPC <i /> Ctrl+Estudio <i /> Comisión A <i /> 2026
        </div>
      </section>
      <div className="welcome-orbit orbit-one" aria-hidden="true" />
      <div className="welcome-orbit orbit-two" aria-hidden="true" />
    </main>
  );
}
function Landing() {
  const [poster, setPoster] = useState<{ src: string; title: string } | null>(
    null,
  );
  const [zoom, setZoom] = useState(1);
  useEffect(() => {
    if (!poster) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPoster(null);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [poster]);
  const openPoster = (src: string, title: string) => {
    setZoom(1);
    setPoster({ src, title });
  };
  return (
    <div className="landing">
      <TechNetwork
        intensity="hero"
        variant="adaptive"
        className="landing-network"
      />
      <header className="land-nav">
        <Link to="/" className="brand" aria-label="Volver a la portada NEXO">
          <span>N</span>NEXO
        </Link>
        <img
          className="nav-ispc-logo"
          src="/logos/ispc-logo.png"
          alt="Instituto Superior Politécnico Córdoba"
        />
        <nav>
          <a href="#problema">Problemática</a>
          <a href="#solucion">Solución</a>
          <a href="#coso">Control interno</a>
          <a href="#equipo">Equipo</a>
          <a href="#material">Material</a>
          <Link to="/" className="cover-link">
            Portada
          </Link>
        </nav>
        <ThemeToggle />
        <Link className="subject-switch" to="/comunicacionales">
          <span>Comunicacionales II</span>
          <ArrowRight />
        </Link>
        <Link className="btn primary" to="/demo">
          Explorar simulador <ArrowRight size={17} />
        </Link>
      </header>
      <main>
        <section className="hero">
          <div>
            <div className="eyebrow">ISPC · Proyecto académico 2026</div>
            <h1>
              Del pedido disperso a una gestión <em>conectada.</em>
            </h1>
            <p>
              NEXO centraliza, organiza y hace visible el recorrido completo de
              cada solicitud de soporte de Trama Soluciones Digitales.
            </p>
            <div className="actions">
              <Link className="btn primary big" to="/demo">
                Explorar simulador <ArrowRight />
              </Link>
              <a className="btn ghost big" href="#problema">
                Conocer el caso
              </a>
            </div>
          </div>
          <div className="hero-card">
            <div className="signal">
              <Activity />
              <span>Control operativo</span>
              <b>EN LÍNEA</b>
            </div>
            <div className="mock-stat">
              <small>Solicitud</small>
              <strong>TRAMA-006</strong>
              <span className="pill critical">Crítica</span>
            </div>
            <div className="flow">
              <i className="done" />
              Registrada
              <i className="done" />
              Asignada
              <i className="current" />
              En proceso
              <i />
              Validación
            </div>
            <div className="trace">
              <GitBranch />
              <div>
                <b>Trazabilidad completa</b>
                <span>Cada decisión conserva responsable, fecha y motivo.</span>
              </div>
            </div>
          </div>
        </section>
        <section id="problema" className="section">
          <div className="section-tag">01 · El desafío</div>
          <h2>Muchos canales. Una visión fragmentada.</h2>
          <p className="lead">
            Trama recibe solicitudes por correo, WhatsApp, teléfono, atención
            presencial y formulario web. Sin un registro único, aparecen
            duplicaciones, pérdida de información y dificultades para conocer el
            estado real de cada caso.
          </p>
          <div className="channel-grid">
            {[
              "Correo",
              "WhatsApp",
              "Teléfono",
              "Presencial",
              "Formulario web",
            ].map((x, i) => (
              <div key={x}>
                <span>0{i + 1}</span>
                <b>{x}</b>
                <small>Información aislada</small>
              </div>
            ))}
          </div>
        </section>
        <section id="solucion" className="section dark">
          <div className="section-tag">02 · La propuesta</div>
          <h2>Un punto de encuentro para todo el proceso.</h2>
          <div className="features">
            {[
              [
                ClipboardList,
                "Registro único",
                "Cada solicitud nace con datos consistentes y un identificador.",
              ],
              [
                Users,
                "Responsabilidad clara",
                "Área, técnico principal y colaboradores con funciones diferenciadas.",
              ],
              [
                GitBranch,
                "Historia verificable",
                "Estados, asignaciones e intervenciones quedan documentados.",
              ],
              [
                BarChart3,
                "Información para decidir",
                "Indicadores operativos calculados sobre el escenario simulado.",
              ],
            ].map(([I, t, d]) => {
              const Icon = I as typeof Activity;
              return (
                <article key={String(t)}>
                  <Icon />
                  <h3>{String(t)}</h3>
                  <p>{String(d)}</p>
                </article>
              );
            })}
          </div>
        </section>
        <section className="section">
          <div className="section-tag">03 · Antes / después</div>
          <div className="compare">
            <div>
              <small>ANTES</small>
              <h3>Gestión reactiva y dispersa</h3>
              <ul>
                <li>Pedidos repartidos entre canales</li>
                <li>Seguimiento dependiente de personas</li>
                <li>Cierres sin evidencia uniforme</li>
              </ul>
            </div>
            <div className="after">
              <small>CON NEXO</small>
              <h3>Proceso visible y controlado</h3>
              <ul>
                <li>Cola centralizada y priorizada</li>
                <li>Roles y responsables explícitos</li>
                <li>Validación e historial cronológico</li>
              </ul>
            </div>
          </div>
        </section>
        <section id="coso" className="section coso">
          <div>
            <div className="section-tag">04 · Control interno</div>
            <h2>Controles que acompañan el trabajo.</h2>
            <p>
              NEXO traduce principios del marco COSO en prácticas observables:
              separación de funciones, autorización, evidencia, seguimiento y
              comunicación de información relevante.
            </p>
          </div>
          <div className="coso-list">
            {[
              "Ambiente de control",
              "Evaluación de riesgos",
              "Actividades de control",
              "Información y comunicación",
              "Supervisión",
            ].map((x, i) => (
              <div key={x}>
                <b>{String(i + 1).padStart(2, "0")}</b>
                <span>{x}</span>
              </div>
            ))}
          </div>
        </section>
        <section className="academic">
          <img
            src="/logos/ispc-logo.png"
            alt="Instituto Superior Politécnico Córdoba"
          />
          <div>
            <small>PROYECTO ACADÉMICO</small>
            <h2>Sistemas y Organizaciones · Cohorte 2026</h2>
            <p>Instituto Superior Politécnico Córdoba (ISPC)</p>
            <p>Tecnicatura Superior en Desarrollo de Software</p>
            <p>Comisión A · Equipo Ctrl+Estudio</p>
            <p>Docente: Laura Anahí Zavia</p>
          </div>
          <Link className="btn light" to="/demo">
            Ingresar al simulador <ArrowRight />
          </Link>
        </section>
        <section id="equipo" className="section team-section">
          <div className="section-tag">05 · LAS PERSONAS DETRÁS DE NEXO</div>
          <h2>Nuestro equipo | Ctrl+Estudio</h2>
          <p className="lead">
            Seis estudiantes, una mirada compartida sobre procesos, tecnología y
            control organizacional.
          </p>
          <div className="team-grid">
            {[
              "Alcaraz, Josefina",
              "Castillo, Fiorella",
              "Gillio, Emmanuel",
              "Guzmán, Emilio",
              "Montoro, Federico",
              "Raspo, Marcelo",
            ].map((name, index) => (
              <article key={name}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div className="member-node" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </div>
                <h3>{name}</h3>
                <small>Ctrl+Estudio · Comisión A</small>
              </article>
            ))}
          </div>
        </section>
        <section id="material" className="section materials-section">
          <div className="section-tag">06 · RECURSOS DEL PROYECTO</div>
          <h2>Material académico</h2>
          <p className="lead">
            Explorá los pósteres del proyecto y consultá el trabajo académico
            completo en su formato original.
          </p>
          <div className="materials-grid">
            {[
              {
                title: "Póster original",
                src: "/posters/nexo-poster-original.jpeg",
                description: "Lámina inicial del proyecto de investigación.",
              },
              {
                title: "Póster NEXO",
                src: "/posters/nexo-poster-principal.png",
                description: "Síntesis visual principal de la propuesta NEXO.",
              },
            ].map((resource) => (
              <article className="resource-card" key={resource.src}>
                <button
                  className="poster-preview"
                  onClick={() => openPoster(resource.src, resource.title)}
                  aria-label={`Ampliar ${resource.title}`}
                >
                  <img src={resource.src} alt={resource.title} />
                  <span>
                    <ZoomIn /> Ampliar
                  </span>
                </button>
                <div>
                  <small>PÓSTER</small>
                  <h3>{resource.title}</h3>
                  <p>{resource.description}</p>
                  <div className="resource-actions">
                    <button
                      className="btn ghost"
                      onClick={() => openPoster(resource.src, resource.title)}
                    >
                      <Eye /> Visualizar
                    </button>
                    <a className="btn ghost" href={resource.src} download>
                      <Download /> Descargar
                    </a>
                  </div>
                </div>
              </article>
            ))}
            <article className="resource-card pdf-card">
              <div className="pdf-preview">
                <iframe
                  src="/documentos/proyecto-nexo-abp.pdf#view=FitH"
                  title="Vista previa del trabajo completo de NEXO"
                />
              </div>
              <div>
                <small>DOCUMENTO · PDF</small>
                <h3>Trabajo completo</h3>
                <p>Proyecto NEXO - Sistemas y Organizaciones, 9 páginas.</p>
                <div className="resource-actions">
                  <a
                    className="btn ghost"
                    href="/documentos/proyecto-nexo-abp.pdf"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Eye /> Abrir y ampliar
                  </a>
                  <a
                    className="btn ghost"
                    href="/documentos/proyecto-nexo-abp.pdf"
                    download
                  >
                    <Download /> Descargar
                  </a>
                </div>
              </div>
            </article>
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <div>
          <b>NEXO</b>
          <span>Gestión y trazabilidad</span>
        </div>
        <div>
          <b>ISPC</b>
          <span>Sistemas y Organizaciones</span>
        </div>
        <div>
          <b>Ctrl+Estudio</b>
          <span>Comisión A · 2026</span>
        </div>
        <div className="ftk-credit">
          <span>Desarrollado por</span>
          <b>FTK Lab</b>
        </div>
      </footer>
      {poster && (
        <div className="poster-modal" role="dialog" aria-modal="true">
          <div className="poster-toolbar">
            <b>{poster.title}</b>
            <div>
              <button
                onClick={() => setZoom((value) => Math.max(0.5, value - 0.25))}
                aria-label="Reducir zoom"
              >
                <Minus />
              </button>
              <span>{Math.round(zoom * 100)}%</span>
              <button
                onClick={() => setZoom((value) => Math.min(3, value + 0.25))}
                aria-label="Aumentar zoom"
              >
                <ZoomIn />
              </button>
              <a
                href={poster.src}
                download
                aria-label="Descargar archivo original"
              >
                <Download />
              </a>
              <button onClick={() => setPoster(null)} aria-label="Cerrar visor">
                <X />
              </button>
            </div>
          </div>
          <div className="poster-canvas" onClick={() => setPoster(null)}>
            <img
              src={poster.src}
              alt={poster.title}
              style={{ transform: `scale(${zoom})` }}
              onClick={(event) => event.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
}

const nav = [
  ["/demo", LayoutDashboard, "Panel general"],
  ["/demo/nueva", Plus, "Nueva solicitud"],
  ["/demo/solicitudes", ClipboardList, "Solicitudes"],
  ["/demo/trazabilidad", GitBranch, "Trazabilidad"],
  ["/demo/areas", Users, "Áreas y responsables"],
  ["/demo/reportes", BarChart3, "Reportes"],
] as const;
function Shell({ children }: { children: ReactNode }) {
  const { role, setRole, mode, tourStep, startTour, leaveTour, advanceTour } =
    useStore();
  const [open, setOpen] = useState(false);
  return (
    <div className="app">
      <aside className={open ? "open" : ""}>
        <div className="app-brand">
          <span>N</span>
          <div>
            <b>NEXO</b>
            <small>Gestión de soporte</small>
          </div>
          <button onClick={() => setOpen(false)}>
            <X />
          </button>
        </div>
        <nav>
          {nav.map(([to, I, label]) => (
            <NavLink
              key={to}
              end={to === "/demo"}
              to={to}
              onClick={() => setOpen(false)}
            >
              <I />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="side-note">
          <ShieldCheck />
          <div>
            <b>Entorno simulado</b>
            <span>Datos ficticios · sin autenticación real</span>
          </div>
        </div>
        <div className="side-links">
          <Link to="/proyecto" className="back primary-back">
            ← Volver al proyecto
          </Link>
          <Link to="/" className="back cover-back">
            Ir a la portada
          </Link>
        </div>
      </aside>
      <div className="app-main">
        <header>
          <button className="menu" onClick={() => setOpen(true)}>
            <Menu />
          </button>
          <Link className="project-return" to="/proyecto">
            <ArrowLeft /> <span>Volver al proyecto</span>
          </Link>
          <div>
            <small>SIMULADOR OPERATIVO</small>
            <b>
              {mode === "tour" ? "Recorrido guiado" : "Escenario principal"}
            </b>
          </div>
          <ThemeToggle className="demo-theme-toggle" />
          <label>
            Rol simulado
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as typeof role)}
            >
              <option>Coordinación</option>
              <option>Mesa de Entrada</option>
              <option>Técnico</option>
            </select>
          </label>
        </header>
        {mode === "tour" && (
          <div className="tourbar">
            <div>
              <b>Recorrido guiado · Paso {Math.min(tourStep + 1, 6)} de 6</b>
              <span>
                {tourStep >= 6
                  ? "Resumen: se practicaron registro, asignación, intervención, resolución, cierre, reapertura y trazabilidad; controles demostrados: autorización, separación de funciones y evidencia."
                  : [
                      "Detectá un problema en el panel",
                      "Registrá una solicitud",
                      "Asigná un responsable",
                      "Registrá una intervención",
                      "Resolvé y cerrá",
                      "Reabrí y verificá la trazabilidad",
                      "Recorrido completado",
                    ][tourStep]}
              </span>
            </div>
            <button
              className="btn ghost"
              onClick={tourStep >= 6 ? leaveTour : advanceTour}
            >
              {tourStep >= 6 ? "Finalizar recorrido" : "Marcar etapa"}
            </button>
            <button
              className="iconbtn"
              title="Salir sin afectar datos normales"
              onClick={leaveTour}
            >
              <X />
            </button>
          </div>
        )}
        <main>{children}</main>
      </div>
      {mode === "operational" && (
        <button className="tour-fab" onClick={() => startTour(false)}>
          <BookOpen /> Iniciar recorrido guiado
        </button>
      )}
    </div>
  );
}
function Stat({
  label,
  value,
  icon: I,
  tone = "blue",
}: {
  label: string;
  value: string | number;
  icon: typeof Activity;
  tone?: string;
}) {
  return (
    <div className={`stat ${tone}`}>
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
      <I />
    </div>
  );
}
function Dashboard() {
  const { tickets, startTour, reset } = useStore();
  const active = tickets.filter((t) => t.status !== "Cerrada");
  const reopened = tickets.reduce((a, t) => a + t.reopenCount, 0);
  const resetNow = () => {
    if (
      confirm(
        "¿Restablecer el escenario? Se perderán los cambios realizados en este escenario.",
      )
    )
      reset();
  };
  return (
    <>
      <Title
        eyebrow="VISIÓN GENERAL"
        title="Panel general"
        text="Estado operativo calculado sobre datos ficticios del simulador."
      >
        <button className="btn ghost" onClick={resetNow}>
          <RotateCcw /> Restablecer escenario
        </button>
      </Title>
      <div className="notice">
        Indicadores operativos · datos simulados, no representan estadísticas
        históricas de Trama.
      </div>
      <div className="stats">
        <Stat
          label="Solicitudes activas"
          value={active.length}
          icon={Activity}
        />
        <Stat
          label="Solicitudes cerradas"
          value={tickets.filter((t) => t.status === "Cerrada").length}
          icon={CheckCircle2}
          tone="green"
        />
        <Stat
          label="Sin técnico"
          value={
            tickets.filter((t) => t.status !== "Cerrada" && !t.technician)
              .length
          }
          icon={Users}
          tone="orange"
        />
        <Stat
          label="Tickets reabiertos"
          value={reopened}
          icon={RotateCcw}
          tone="purple"
        />
      </div>
      <div className="dash-grid">
        <section className="panel">
          <div className="panel-head">
            <div>
              <small>COLA ACTIVA</small>
              <h3>Prioridades que requieren atención</h3>
            </div>
            <Link to="/demo/solicitudes">Ver todas →</Link>
          </div>
          <TicketTable
            tickets={[...active]
              .sort(
                (a, b) =>
                  pRank[b.priority] - pRank[a.priority] ||
                  +new Date(a.createdAt) - +new Date(b.createdAt),
              )
              .slice(0, 6)}
          />
        </section>
        <section className="panel distribution">
          <div className="panel-head">
            <div>
              <small>DISTRIBUCIÓN</small>
              <h3>Por prioridad</h3>
            </div>
          </div>
          {priorities
            .slice()
            .reverse()
            .map((p) => {
              const n = tickets.filter((t) => t.priority === p).length;
              return (
                <div className="barrow" key={p}>
                  <span className={`dot ${p}`} />
                  <b>{p}</b>
                  <div>
                    <i style={{ width: `${(n / tickets.length) * 100}%` }} />
                  </div>
                  <strong>{n}</strong>
                </div>
              );
            })}
        </section>
      </div>
      <section className="diagnosis">
        <div>
          <small>DIAGNÓSTICO HISTÓRICO · CASO ACADÉMICO</small>
          <h3>La información fragmentada debilita el control.</h3>
        </div>
        <p>
          Los pedidos por múltiples canales dificultan consolidar antecedentes,
          asignar responsabilidades y verificar cierres. Este diagnóstico es
          cualitativo y no incorpora cifras históricas.
        </p>
        <button className="btn light" onClick={() => startTour(true)}>
          Practicar el circuito <ArrowRight />
        </button>
      </section>
    </>
  );
}
function Title({
  eyebrow,
  title,
  text,
  children,
}: {
  eyebrow: string;
  title: string;
  text: string;
  children?: ReactNode;
}) {
  return (
    <div className="page-title">
      <div>
        <small>{eyebrow}</small>
        <h1>{title}</h1>
        <p>{text}</p>
      </div>
      {children}
    </div>
  );
}
function TicketTable({ tickets }: { tickets: Ticket[] }) {
  return (
    <div className="tablewrap">
      <table>
        <thead>
          <tr>
            <th>Solicitud</th>
            <th>Prioridad</th>
            <th>Estado</th>
            <th>Área</th>
            <th>Responsable</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {tickets.map((t) => (
            <tr key={t.id}>
              <td>
                <b>{t.id}</b>
                <span>{t.title}</span>
              </td>
              <td>
                <span className={`pill ${t.priority}`}>{t.priority}</span>
              </td>
              <td>
                <span className="status">{t.status}</span>
              </td>
              <td>{t.area}</td>
              <td>{t.technician || <em>Sin asignar</em>}</td>
              <td>
                <Link to={`/demo/solicitudes/${t.id}`}>Ver →</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!tickets.length && (
        <div className="empty">
          No hay solicitudes que coincidan con los filtros.
        </div>
      )}
    </div>
  );
}
function NewRequest() {
  const { tickets, addTicket, advanceTour, mode } = useStore();
  const navTo = useNavigate();
  const [error, setError] = useState("");
  const [data, setData] = useState<NewTicket>({
    organization: "",
    title: "",
    description: "",
    category: "",
    priority: "media",
    area: "Soporte Técnico",
    technician: "",
  });
  const dup = tickets
    .filter(
      (t) =>
        data.title.length > 4 &&
        t.title.toLowerCase().includes(data.title.toLowerCase()),
    )
    .slice(0, 3);
  function submit(e: FormEvent) {
    e.preventDefault();
    if (
      !data.organization.trim() ||
      !data.title.trim() ||
      !data.description.trim() ||
      !data.category.trim() ||
      !data.area
    ) {
      setError("Completá todos los campos obligatorios.");
      return;
    }
    const t = addTicket({ ...data, technician: data.technician || undefined });
    if (mode === "tour") advanceTour();
    navTo(`/demo/solicitudes/${t.id}`);
  }
  return (
    <>
      <Title
        eyebrow="ALTA DE SOLICITUD"
        title="Nueva solicitud"
        text="Registrá la información inicial. La fecha, hora e ID se generan automáticamente."
      />
      <form className="form panel" onSubmit={submit}>
        <div className="form-section">
          <h3>Información del pedido</h3>
          <p>Campos obligatorios marcados con *</p>
        </div>
        <label>
          Organización solicitante *
          <input
            value={data.organization}
            onChange={(e) => setData({ ...data, organization: e.target.value })}
            placeholder="Ej. Trama Soluciones Digitales"
          />
        </label>
        <label>
          Título *
          <input
            value={data.title}
            onChange={(e) => setData({ ...data, title: e.target.value })}
            placeholder="Resumen breve del problema"
          />
        </label>
        {dup.length > 0 && (
          <div className="warning">
            <b>Posibles duplicados</b>
            {dup.map((t) => (
              <Link key={t.id} to={`/demo/solicitudes/${t.id}`}>
                {t.id} · {t.title}
              </Link>
            ))}
            <span>Podés continuar si se trata de un caso diferente.</span>
          </div>
        )}
        <label className="wide">
          Descripción *
          <textarea
            rows={5}
            value={data.description}
            onChange={(e) => setData({ ...data, description: e.target.value })}
            placeholder="Describí el contexto, impacto y síntomas observados."
          />
        </label>
        <label>
          Categoría *
          <input
            value={data.category}
            onChange={(e) => setData({ ...data, category: e.target.value })}
            placeholder="Ej. Redes, accesos, software"
          />
        </label>
        <label>
          Prioridad *
          <select
            value={data.priority}
            onChange={(e) =>
              setData({ ...data, priority: e.target.value as Priority })
            }
          >
            {priorities.map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
        </label>
        <label>
          Área responsable *
          <select
            value={data.area}
            onChange={(e) => setData({ ...data, area: e.target.value as Area })}
          >
            {areas.map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
        </label>
        <label>
          Técnico principal{" "}
          <select
            value={data.technician}
            onChange={(e) => setData({ ...data, technician: e.target.value })}
          >
            <option value="">Asignar más adelante</option>
            {technicians.map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
        </label>
        {error && <div className="error wide">{error}</div>}
        <div className="form-actions wide">
          <Link className="btn ghost" to="/demo/solicitudes">
            Cancelar
          </Link>
          <button className="btn primary" type="submit">
            Crear solicitud <ArrowRight />
          </button>
        </div>
      </form>
    </>
  );
}
function Requests({ trace = false }: { trace?: boolean }) {
  const { tickets } = useStore();
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("Activas");
  const [priority, setPriority] = useState("");
  const [area, setArea] = useState("");
  const [tech, setTech] = useState("");
  const filtered = useMemo(
    () =>
      tickets
        .filter(
          (t) =>
            (!q ||
              `${t.id} ${t.title} ${t.organization}`
                .toLowerCase()
                .includes(q.toLowerCase())) &&
            (status === "Todas" ||
              (status === "Activas" && t.status !== "Cerrada") ||
              t.status === status) &&
            (!priority || t.priority === priority) &&
            (!area || t.area === area) &&
            (!tech || t.technician === tech),
        )
        .sort(
          (a, b) =>
            pRank[b.priority] - pRank[a.priority] ||
            +new Date(a.createdAt) - +new Date(b.createdAt),
        ),
    [tickets, q, status, priority, area, tech],
  );
  return (
    <>
      <Title
        eyebrow={trace ? "AUDITORÍA DEL PROCESO" : "GESTIÓN DE TICKETS"}
        title={trace ? "Trazabilidad" : "Solicitudes"}
        text={
          trace
            ? "Consultá el historial completo y la evidencia de cada solicitud."
            : "Buscá, filtrá y accedé al detalle de las solicitudes."
        }
      >
        {!trace && (
          <Link className="btn primary" to="/demo/nueva">
            <Plus /> Nueva solicitud
          </Link>
        )}
      </Title>
      <div className="filters panel">
        <label className="search">
          <Search />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar por ID, título u organización"
          />
        </label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option>Activas</option>
          <option>Todas</option>
          {statuses.map((x) => (
            <option key={x}>{x}</option>
          ))}
        </select>
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="">Toda prioridad</option>
          {priorities.map((x) => (
            <option key={x}>{x}</option>
          ))}
        </select>
        <select value={area} onChange={(e) => setArea(e.target.value)}>
          <option value="">Todas las áreas</option>
          {areas.map((x) => (
            <option key={x}>{x}</option>
          ))}
        </select>
        <select value={tech} onChange={(e) => setTech(e.target.value)}>
          <option value="">Todo responsable</option>
          {technicians.map((x) => (
            <option key={x}>{x}</option>
          ))}
        </select>
      </div>
      <div className="result-count">
        {filtered.length} resultado{filtered.length !== 1 ? "s" : ""} ·
        prioridad descendente, antigüedad ascendente
      </div>
      <section className="panel">
        <TicketTable tickets={filtered} />
      </section>
    </>
  );
}
function Detail() {
  const { id } = useParams();
  const { tickets, role, updateTicket, advanceTour, mode } = useStore();
  const t = tickets.find((x) => x.id === id);
  const [message, setMessage] = useState("");
  const [docs, setDocs] = useState({
    diagnosis: t?.diagnosis || "",
    solution: t?.solution || "",
    verification: t?.verification || "",
  });
  if (!t)
    return (
      <div className="empty">
        Solicitud no encontrada. <Link to="/demo/solicitudes">Volver</Link>
      </div>
    );
  const allowed = (action: string) => {
    if (action === "resolve") return role === "Técnico";
    if (["close", "reopen"].includes(action)) return role !== "Técnico";
    return true;
  };
  const mutate = (fn: (x: Ticket) => Ticket, success: string) => {
    updateTicket(t.id, fn);
    setMessage(success);
    if (mode === "tour") advanceTour();
  };
  const assign = (name: string) =>
    mutate(
      (x) => ({
        ...x,
        technician: name,
        history: [
          ...x.history,
          event(role, "Asignación", `Técnico principal: ${name}.`),
        ],
      }),
      "Responsable actualizado.",
    );
  const start = () => {
    if (!t.technician) {
      setMessage("No se puede iniciar sin técnico principal asignado.");
      return;
    }
    mutate(
      (x) => ({
        ...x,
        status: "En proceso",
        history: [
          ...x.history,
          event(role, "Estado", "Pendiente → En proceso. Trabajo iniciado."),
        ],
      }),
      "Trabajo iniciado.",
    );
  };
  const intervene = () => {
    const text = prompt("Describí la intervención realizada:");
    if (text?.trim())
      mutate(
        (x) => ({
          ...x,
          history: [...x.history, event(role, "Intervención", text.trim())],
        }),
        "Intervención registrada.",
      );
  };
  const resolve = () => {
    if (
      !docs.diagnosis.trim() ||
      !docs.solution.trim() ||
      !docs.verification.trim()
    ) {
      setMessage(
        "Completá diagnóstico, solución y verificación antes de resolver.",
      );
      return;
    }
    mutate(
      (x) => ({
        ...x,
        ...docs,
        status: "Resuelta",
        resolvedAt: new Date().toISOString(),
        history: [
          ...x.history,
          event(
            role,
            "Resolución",
            "Diagnóstico, solución y verificación documentados. En proceso → Resuelta.",
          ),
        ],
      }),
      "Solicitud resuelta.",
    );
  };
  const close = () =>
    mutate(
      (x) => ({
        ...x,
        status: "Cerrada",
        history: [
          ...x.history,
          event(role, "Cierre", "Resolución validada. Resuelta → Cerrada."),
        ],
      }),
      "Cierre validado.",
    );
  const reopen = () => {
    const why = prompt("Justificación obligatoria de la reapertura:");
    if (why?.trim())
      mutate(
        (x) => ({
          ...x,
          status: "En proceso",
          reopenCount: x.reopenCount + 1,
          history: [...x.history, event(role, "Reapertura", why.trim())],
        }),
        "Solicitud reabierta.",
      );
  };
  return (
    <>
      <div className="detail-head">
        <Link to="/demo/solicitudes">← Volver a solicitudes</Link>
        <div>
          <span className={`pill ${t.priority}`}>{t.priority}</span>
          <span className="status">{t.status}</span>
        </div>
      </div>
      <Title
        eyebrow={t.id}
        title={t.title}
        text={`${t.organization} · Creada ${fmt(t.createdAt)}`}
      />
      {message && <div className="notice action-msg">{message}</div>}
      <div className="detail-grid">
        <div>
          <section className="panel detail-card">
            <h3>Información de la solicitud</h3>
            <dl>
              <div>
                <dt>Descripción</dt>
                <dd>{t.description}</dd>
              </div>
              <div>
                <dt>Categoría</dt>
                <dd>{t.category}</dd>
              </div>
              <div>
                <dt>Área responsable</dt>
                <dd>{t.area}</dd>
              </div>
              <div>
                <dt>Técnico principal</dt>
                <dd>{t.technician || "Sin asignar"}</dd>
              </div>
              <div>
                <dt>Colaboradores</dt>
                <dd>{t.collaborators.join(", ") || "Sin colaboradores"}</dd>
              </div>
            </dl>
          </section>
          {t.status === "En proceso" && (
            <section className="panel docs">
              <h3>Documentación de resolución</h3>
              <label>
                Diagnóstico
                <textarea
                  value={docs.diagnosis}
                  onChange={(e) =>
                    setDocs({ ...docs, diagnosis: e.target.value })
                  }
                />
              </label>
              <label>
                Solución aplicada
                <textarea
                  value={docs.solution}
                  onChange={(e) =>
                    setDocs({ ...docs, solution: e.target.value })
                  }
                />
              </label>
              <label>
                Verificación
                <textarea
                  value={docs.verification}
                  onChange={(e) =>
                    setDocs({ ...docs, verification: e.target.value })
                  }
                />
              </label>
            </section>
          )}
          <section className="panel">
            <div className="panel-head">
              <div>
                <small>HISTORIAL CRONOLÓGICO</small>
                <h3>Trazabilidad completa</h3>
              </div>
            </div>
            <div className="timeline">
              {[...t.history]
                .sort((a, b) => +new Date(b.at) - +new Date(a.at))
                .map((h) => (
                  <div key={h.id}>
                    <i />
                    <section>
                      <small>
                        {fmt(h.at)} · {h.actor}
                      </small>
                      <b>{h.type}</b>
                      <p>{h.detail}</p>
                    </section>
                  </div>
                ))}
            </div>
          </section>
        </div>
        <aside className="panel actions-panel">
          <h3>Acciones disponibles</h3>
          <label>
            Técnico principal
            <select
              value={t.technician || ""}
              onChange={(e) => e.target.value && assign(e.target.value)}
            >
              <option value="">Sin asignar</option>
              {technicians.map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
          </label>
          {t.status === "Pendiente" && (
            <button className="btn primary" onClick={start}>
              Iniciar trabajo
            </button>
          )}
          {t.status === "En proceso" && (
            <>
              <button className="btn ghost" onClick={intervene}>
                Registrar intervención
              </button>
              <button
                className="btn primary"
                disabled={!allowed("resolve")}
                title={!allowed("resolve") ? "Acción del rol Técnico" : ""}
                onClick={resolve}
              >
                Marcar como resuelta
              </button>
            </>
          )}
          {t.status === "Resuelta" && (
            <button
              className="btn primary"
              disabled={!allowed("close")}
              onClick={close}
            >
              Validar cierre
            </button>
          )}
          {t.status === "Cerrada" && (
            <button
              className="btn ghost"
              disabled={!allowed("reopen")}
              onClick={reopen}
            >
              Reabrir solicitud
            </button>
          )}
          <div className="role-hint">
            <ShieldCheck />
            <span>
              Acciones según rol simulado: <b>{role}</b>. Esto demuestra
              separación de funciones; no es seguridad real.
            </span>
          </div>
        </aside>
      </div>
    </>
  );
}
function Areas() {
  const { tickets } = useStore();
  return (
    <>
      <Title
        eyebrow="ESTRUCTURA ORGANIZACIONAL"
        title="Áreas y responsables"
        text="Las áreas organizacionales no equivalen a roles de usuario."
      />
      <div className="area-grid">
        {areas.map((a, i) => (
          <article className="panel" key={a}>
            <div className="area-icon">{String(i + 1).padStart(2, "0")}</div>
            <h3>{a}</h3>
            <p>
              {
                [
                  "Recepción, clasificación y derivación inicial.",
                  "Atención de hardware, software y soporte a usuarios.",
                  "Conectividad, accesos y protección de la infraestructura.",
                  "Mantenimiento y evolución de soluciones internas.",
                ][i]
              }
            </p>
            <div>
              <b>
                {
                  tickets.filter((t) => t.area === a && t.status !== "Cerrada")
                    .length
                }
              </b>
              <span> solicitudes activas</span>
            </div>
          </article>
        ))}
      </div>
      <section className="panel people">
        <h3>Responsables disponibles en la simulación</h3>
        <div>
          {technicians.map((t, i) => (
            <span key={t}>
              <i>
                {t
                  .split(" ")
                  .map((x) => x[0])
                  .join("")}
              </i>
              <b>{t}</b>
              <small>{areas[(i + 1) % areas.length]}</small>
            </span>
          ))}
        </div>
      </section>
    </>
  );
}
function Reports() {
  const { tickets } = useStore();
  const resolved = tickets.filter((t) => t.resolvedAt);
  const avg = resolved.length
    ? resolved.reduce(
        (a, t) => a + (+new Date(t.resolvedAt!) - +new Date(t.createdAt)),
        0,
      ) /
      resolved.length /
      3600000
    : 0;
  return (
    <>
      <Title
        eyebrow="INDICADORES Y CONTROL"
        title="Reportes"
        text="Resultados calculados en tiempo real a partir del escenario simulado."
      />
      <div className="notice">
        Indicadores operativos · no son estadísticas históricas de Trama
        Soluciones Digitales.
      </div>
      <div className="stats">
        <Stat
          label="Tiempo medio de resolución"
          value={`${avg.toFixed(1)} h`}
          icon={Clock3}
        />
        <Stat
          label="Intervenciones registradas"
          value={
            tickets
              .flatMap((t) => t.history)
              .filter((h) => h.type === "Intervención").length
          }
          icon={GitBranch}
          tone="green"
        />
        <Stat
          label="Reaperturas"
          value={tickets.reduce((a, t) => a + t.reopenCount, 0)}
          icon={RotateCcw}
          tone="orange"
        />
      </div>
      <div className="report-grid">
        <section className="panel distribution">
          <div className="panel-head">
            <div>
              <small>ACTIVIDAD</small>
              <h3>Intervenciones por área</h3>
            </div>
          </div>
          {areas.map((a) => {
            const n = tickets
              .filter((t) => t.area === a)
              .flatMap((t) => t.history)
              .filter((h) => h.type === "Intervención").length;
            return (
              <div className="barrow" key={a}>
                <b>{a}</b>
                <div>
                  <i style={{ width: `${Math.max(5, n * 15)}%` }} />
                </div>
                <strong>{n}</strong>
              </div>
            );
          })}
        </section>
        <section className="panel controls">
          <small>RELACIÓN CON COSO</small>
          <h3>Controles demostrados</h3>
          {[
            [
              "Separación de funciones",
              "El técnico resuelve; Mesa de Entrada o Coordinación validan el cierre.",
            ],
            [
              "Autorización",
              "Las transiciones dependen del rol simulado y del estado.",
            ],
            [
              "Evidencia",
              "Diagnóstico, solución y verificación preceden a la resolución.",
            ],
            [
              "Supervisión",
              "El panel expone pendientes, prioridades y excepciones.",
            ],
            [
              "Información y comunicación",
              "El historial mantiene contexto y responsabilidad.",
            ],
          ].map(([a, b]) => (
            <div key={a}>
              <CheckCircle2 />
              <p>
                <b>{a}</b>
                <span>{b}</span>
              </p>
            </div>
          ))}
        </section>
      </div>
      <section className="diagnosis">
        <div>
          <small>DIAGNÓSTICO HISTÓRICO · CUALITATIVO</small>
          <h3>El problema no es la falta de canales, sino su desconexión.</h3>
        </div>
        <p>
          Correo, WhatsApp, teléfono, atención presencial y formulario web
          generan registros heterogéneos. NEXO propone una base común para
          documentar, derivar, controlar y aprender del proceso.
        </p>
      </section>
    </>
  );
}
function Demo() {
  return (
    <Shell>
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path="nueva" element={<NewRequest />} />
        <Route path="solicitudes" element={<Requests />} />
        <Route path="solicitudes/:id" element={<Detail />} />
        <Route path="trazabilidad" element={<Requests trace />} />
        <Route path="areas" element={<Areas />} />
        <Route path="reportes" element={<Reports />} />
      </Routes>
    </Shell>
  );
}
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/proyecto" element={<Landing />} />
      <Route path="/comunicacionales" element={<CommunicationsLanding />} />
      <Route path="/demo/*" element={<Demo />} />
      <Route path="*" element={<Welcome />} />
    </Routes>
  );
}
