import {
  ArrowLeft,
  ArrowRight,
  Bot,
  Building2,
  ClipboardList,
  FileText,
  GraduationCap,
  Mail,
  Maximize2,
  MessageCircle,
  Minimize2,
  Network,
  Phone,
  Presentation,
  Route,
  SearchCheck,
  Users,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const pages = [
  { name: "Josefina Alcaraz", topic: "Contexto" },
  { name: "Fiorella Castillo", topic: "Problemática" },
  { name: "Emmanuel Gillio", topic: "Objetivos" },
  { name: "Emilio Guzmán", topic: "Planificación" },
  { name: "Marcelo Raspo", topic: "Productos comunicacionales" },
  { name: "Federico Montoro", topic: "Conclusión" },
];

function PageArtwork({ page }: { page: number }) {
  if (page === 0) {
    const channels = [
      [MessageCircle, "WhatsApp"],
      [Mail, "Correo"],
      [Phone, "Teléfono"],
      [Users, "Atención presencial"],
      [FileText, "Formulario web"],
    ] as const;
    return (
      <div className="notebook-context">
        <div className="channel-sketches">
          {channels.map(([Icon, label], index) => (
            <div className={`sketch-box sketch-${index + 1}`} key={label}>
              <Icon aria-hidden="true" />
              <span>{label}</span>
            </div>
          ))}
          <div className="unfinished-center">?</div>
        </div>
        <div className="sticky-note sticky-yellow">
          Cinco canales,
          <br /> información dispersa
        </div>
        <span className="pencil-note note-context">cada canal va por su lado…</span>
      </div>
    );
  }

  if (page === 1) {
    return (
      <div className="notebook-problem">
        <div className="number-note sticky-pink">
          <strong>96</strong><span>solicitudes duplicadas</span>
        </div>
        <div className="number-note sticky-yellow">
          <strong>74</strong><span>casos sin responsable</span>
        </div>
        <div className="number-note sticky-blue">
          <strong>51</strong><span>cambios de prioridad sin registro</span>
        </div>
        <div className="confusion-lines" aria-hidden="true"><i /><i /><i /><i /></div>
        <span className="pencil-note note-confusion">¿quién responde?</span>
        <span className="marker-circle" aria-hidden="true" />
      </div>
    );
  }

  if (page === 2) {
    const steps = [
      [MessageCircle, "Solicitud"],
      [ClipboardList, "Registro único"],
      [Users, "Responsable"],
      [SearchCheck, "Seguimiento"],
    ] as const;
    return (
      <div className="notebook-objectives">
        <div className="flow-sketch">
          {steps.map(([Icon, label], index) => (
            <div className="flow-step" key={label}>
              <Icon aria-hidden="true" /><b>{label}</b>
              {index < steps.length - 1 && <span className="hand-arrow">→</span>}
            </div>
          ))}
        </div>
        <div className="sticky-note sticky-blue pilot-note">10 organizaciones piloto</div>
        <div className="objective-doodles">
          <span><Network /> Centralización</span>
          <span><Route /> Trazabilidad</span>
          <span><GraduationCap /> Capacitación</span>
        </div>
      </div>
    );
  }

  if (page === 3) {
    return (
      <div className="notebook-planning">
        <div className="timeline-sketch">
          {Array.from({ length: 12 }, (_, index) => (
            <div className={index < 4 ? "initial-week" : "future-week"} key={index}>
              <i />
              <span>{index + 1}</span>
            </div>
          ))}
        </div>
        <div className="timeline-labels"><b>Etapa inicial detallada</b><span>Continuidad prevista</span></div>
        <div className="planning-notes">
          <span className="sticky-pink">Preparación</span>
          <span className="sticky-yellow">Criterios de prioridad</span>
          <span className="sticky-blue">Capacitación</span>
        </div>
        <span className="pencil-note twelve-weeks">12 semanas de trabajo</span>
      </div>
    );
  }

  if (page === 4) {
    return (
      <div className="notebook-products">
        <div className="paper-cut product-protocol"><ClipboardList /><b>Protocolo</b><small>gestión de incidencias</small></div>
        <div className="paper-cut product-guide"><Presentation /><b>Guía visual</b><div className="priority-swatches"><i /><i /><i /><i /></div><small>prioridades</small></div>
        <div className="paper-cut product-bot"><Bot /><b>Bot de WhatsApp</b><small>propuesta conversacional</small></div>
        <div className="proposal-stamp">PRODUCTOS PROPUESTOS</div>
      </div>
    );
  }

  return (
    <div className="notebook-conclusion">
      <div className="conclusion-map">
        <div className="subject-note"><Building2 /><b>Sistemas y Organizaciones</b><span>Procesos y responsabilidades</span></div>
        <div className="converge-lines" aria-hidden="true" />
        <div className="nexo-badge">NE<span>X</span>O</div>
        <div className="subject-note"><MessageCircle /><b>Competencias Comunicacionales II</b><span>Personas e información</span></div>
      </div>
      <blockquote>NEXO conecta procesos.<br />La comunicación conecta personas.</blockquote>
      <div className="thanks-note">Muchas gracias</div>
    </div>
  );
}

export function NotebookPresentation() {
  const notebookRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<number | null>(null);
  const [activePage, setActivePage] = useState(0);
  const [transition, setTransition] = useState<{
    from: number;
    to: number;
    direction: "next" | "previous";
  } | null>(null);
  const [fullscreen, setFullscreen] = useState(false);

  const changePage = useCallback(
    (direction: "next" | "previous") => {
      if (transition) return;
      const nextPage = activePage + (direction === "next" ? 1 : -1);
      if (nextPage < 0 || nextPage >= pages.length) return;
      setTransition({ from: activePage, to: nextPage, direction });
      timerRef.current = window.setTimeout(() => {
        setActivePage(nextPage);
        setTransition(null);
      }, 720);
    },
    [activePage, transition],
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") changePage("next");
      if (event.key === "ArrowLeft") changePage("previous");
      if (event.key === "Escape" && document.fullscreenElement) {
        void document.exitFullscreen();
      }
    };
    const onFullscreenChange = () => setFullscreen(Boolean(document.fullscreenElement));
    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("fullscreenchange", onFullscreenChange);
    };
  }, [changePage]);

  useEffect(
    () => () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    },
    [],
  );

  const toggleFullscreen = async () => {
    if (document.fullscreenElement) await document.exitFullscreen();
    else await notebookRef.current?.requestFullscreen();
  };

  const visiblePage = transition?.from ?? activePage;
  const incomingPage = transition?.to;

  return (
    <div className="notebook-stage" ref={notebookRef}>
      <div className="notebook-toolbar">
        <span><Presentation aria-hidden="true" /> Cuaderno de investigación</span>
        <button type="button" onClick={toggleFullscreen} aria-label={fullscreen ? "Salir de pantalla completa" : "Ver en pantalla completa"}>
          {fullscreen ? <Minimize2 /> : <Maximize2 />}
          <span>{fullscreen ? "Salir" : "Ampliar"}</span>
        </button>
      </div>

      <div className={`notebook${transition ? ` is-turning turn-${transition.direction}` : ""}`} aria-live="polite">
        <div className="notebook-binding" aria-hidden="true">{Array.from({ length: 10 }, (_, index) => <i key={index} />)}</div>
        {incomingPage !== undefined && (
          <article className="notebook-sheet incoming" aria-hidden="true">
            <header><span>{String(incomingPage + 1).padStart(2, "0")}</span><h3>{pages[incomingPage].name}</h3><b>{pages[incomingPage].topic}</b></header>
            <PageArtwork page={incomingPage} />
          </article>
        )}
        <article className="notebook-sheet current" key={visiblePage}>
          <header>
            <span>{String(visiblePage + 1).padStart(2, "0")}</span>
            <h3>{pages[visiblePage].name}</h3>
            <b>{pages[visiblePage].topic}</b>
          </header>
          <PageArtwork page={visiblePage} />
          <footer>NEXO · Competencias Comunicacionales II</footer>
        </article>
      </div>

      <div className="notebook-controls">
        <button type="button" onClick={() => changePage("previous")} disabled={activePage === 0 || Boolean(transition)} aria-label="Página anterior"><ArrowLeft /></button>
        <div>
          <strong>{String(activePage + 1).padStart(2, "0")}</strong>
          <span>/ {String(pages.length).padStart(2, "0")} · {pages[activePage].name}</span>
        </div>
        <button type="button" onClick={() => changePage("next")} disabled={activePage === pages.length - 1 || Boolean(transition)} aria-label="Página siguiente"><ArrowRight /></button>
      </div>
      <p className="notebook-hint">Usá las flechas del teclado para navegar · Escape para salir de pantalla completa</p>
    </div>
  );
}
