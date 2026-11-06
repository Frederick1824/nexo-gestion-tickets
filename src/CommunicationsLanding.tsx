import {
  ArrowRight,
  BookOpen,
  Bot,
  CalendarRange,
  CheckCircle2,
  Check,
  ChevronDown,
  ClipboardCheck,
  Copy,
  FileText,
  GraduationCap,
  History,
  Mail,
  MessageCircle,
  Mic2,
  Network,
  Phone,
  Presentation,
  Target,
  Users,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { TechNetwork } from "./components/TechNetwork";
import { presentationSpeeches } from "./presentationSpeeches";
import { ThemeToggle } from "./theme";

const academicDocument =
  "https://docs.google.com/document/d/1LcVn3_bg8quJmHDD0_5xlOt8ze6oZ4mPBTILwbK8zoY/edit?tab=t.0";

const team = [
  "Alcaraz, Josefina",
  "Castillo, Fiorella",
  "Gillio, Emmanuel",
  "Guzmán, Emilio",
  "Montoro, Federico",
  "Raspo, Marcelo",
];

export function CommunicationsLanding() {
  const [expandedSpeech, setExpandedSpeech] = useState<string | null>(null);
  const [copiedSpeech, setCopiedSpeech] = useState<string | null>(null);

  const copySpeech = async (number: string, speech: string) => {
    await navigator.clipboard.writeText(speech);
    setCopiedSpeech(number);
    window.setTimeout(
      () => setCopiedSpeech((current) => (current === number ? null : current)),
      1800,
    );
  };

  return (
    <div className="landing communications">
      <TechNetwork
        intensity="hero"
        variant="adaptive"
        className="landing-network"
      />
      <header className="land-nav communications-nav">
        <Link to="/" className="brand" aria-label="Volver a la portada NEXO">
          <span>N</span>NEXO
        </Link>
        <img
          className="nav-ispc-logo"
          src="/logos/ispc-logo.png"
          alt="Instituto Superior Politécnico Córdoba"
        />
        <nav aria-label="Secciones de Competencias Comunicacionales II">
          <a href="#problematica">Problemática</a>
          <a href="#diagnostico">Diagnóstico</a>
          <a href="#estrategia">Estrategia</a>
          <a href="#productos">Productos</a>
          <a href="#planificacion">Planificación</a>
          <a href="#presentacion">Presentación</a>
        </nav>
        <ThemeToggle />
        <Link className="subject-switch" to="/proyecto">
          <span>Sistemas y Organizaciones</span>
          <ArrowRight />
        </Link>
      </header>

      <main>
        <section className="comms-hero">
          <div className="comms-hero-copy">
            <div className="eyebrow">
              Competencias Comunicacionales II · 2026
            </div>
            <h1>
              NEXO: conectar personas también es parte de la <em>solución.</em>
            </h1>
            <p>
              Una plataforma organiza la información. Una estrategia de
              comunicación hace posible que las personas comprendan los
              criterios, coordinen su trabajo y adopten una nueva forma de
              gestionar el soporte.
            </p>
            <div className="actions">
              <a className="btn primary big" href="#problematica">
                Conocer el enfoque <ArrowRight />
              </a>
              <Link className="btn ghost big" to="/">
                Volver a la portada
              </Link>
            </div>
          </div>
          <div
            className="communication-map"
            role="img"
            aria-label="Flujo de comunicación propuesto"
          >
            <div className="map-title">
              <Network />
              <span>Red de comunicación</span>
              <b>COORDINADA</b>
            </div>
            <div className="map-core">
              <span>Personas</span>
              <strong>NEXO</strong>
              <span>Información</span>
            </div>
            <div className="map-flow">
              {["Canal común", "Criterios compartidos", "Acompañamiento"].map(
                (item) => (
                  <div key={item}>
                    <i />
                    <span>{item}</span>
                    <CheckCircle2 />
                  </div>
                ),
              )}
            </div>
          </div>
        </section>

        <section id="problematica" className="section comms-problem">
          <div className="section-tag">01 · Problemática comunicacional</div>
          <h2>Cinco canales. Cinco versiones de una misma situación.</h2>
          <p className="lead">
            WhatsApp, correo electrónico, llamadas, contacto directo y
            formularios web funcionan sin integración. La información se
            fragmenta, cambia según quién la recibe y pierde continuidad entre
            áreas, responsables y organizaciones clientes.
          </p>
          <div className="comms-channel-grid">
            {[
              [MessageCircle, "WhatsApp"],
              [Mail, "Correo"],
              [Phone, "Llamadas"],
              [Users, "Contacto directo"],
              [FileText, "Formularios web"],
            ].map(([Icon, label], index) => {
              const ChannelIcon = Icon as typeof MessageCircle;
              return (
                <article key={String(label)}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <ChannelIcon />
                  <b>{String(label)}</b>
                  <small>Información aislada</small>
                </article>
              );
            })}
          </div>
          <div className="problem-consequences">
            <span>Asimetría de información</span>
            <span>Duplicaciones</span>
            <span>Falta de trazabilidad</span>
          </div>
        </section>

        <section id="diagnostico" className="section dark comms-diagnosis">
          <div>
            <div className="section-tag">02 · Diagnóstico · marzo 2026</div>
            <h2>
              Cuando la información no deja huella, coordinar se vuelve difícil.
            </h2>
            <p>
              El caso académico de Trama Soluciones Digitales permite medir el
              impacto de una comunicación dispersa sobre el trabajo cotidiano.
            </p>
          </div>
          <div className="diagnosis-numbers">
            {[
              ["96", "solicitudes duplicadas", "entre canales"],
              ["74", "casos sin responsable", "asignado"],
              ["51", "cambios de prioridad", "sin registro"],
            ].map(([value, label, detail]) => (
              <article key={value}>
                <strong>{value}</strong>
                <b>{label}</b>
                <span>{detail}</span>
              </article>
            ))}
          </div>
        </section>

        <section id="objetivos" className="section comms-objectives">
          <div className="section-tag">03 · Objetivos</div>
          <h2>Una adopción basada en acuerdos, no sólo en tecnología.</h2>
          <div className="objective-grid">
            {[
              [
                Target,
                "Canal principal",
                "Incorporar NEXO en diez organizaciones piloto.",
              ],
              [
                History,
                "Historial único",
                "Sostener un registro cronológico y verificable.",
              ],
              [
                ClipboardCheck,
                "Prioridad compartida",
                "Definir y validar un criterio común.",
              ],
              [
                GraduationCap,
                "Capacitación",
                "Preparar al personal y a las organizaciones.",
              ],
            ].map(([Icon, title, description], index) => {
              const ObjectiveIcon = Icon as typeof Target;
              return (
                <article key={String(title)}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <ObjectiveIcon />
                  <h3>{String(title)}</h3>
                  <p>{String(description)}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section id="estrategia" className="section dark comms-strategy">
          <div className="section-tag">04 · Estrategia comunicacional</div>
          <h2>
            Cinco movimientos para transformar información en coordinación.
          </h2>
          <div className="strategy-track">
            {[
              ["Centralización", "Un punto común para recibir y consultar."],
              ["Coordinación", "Responsables y pasos visibles para cada caso."],
              ["Claridad", "Criterios comprensibles y lenguaje compartido."],
              ["Capacitación", "Prácticas previas y materiales de apoyo."],
              ["Adopción", "Acompañamiento gradual para sostener el cambio."],
            ].map(([title, description], index) => (
              <article key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="productos" className="section comms-products">
          <div className="section-tag">05 · Productos propuestos</div>
          <div className="products-heading">
            <h2>Un paquete de acompañamiento para la transición a NEXO.</h2>
            <p>
              Estas piezas están definidas como propuestas académicas. En esta
              etapa todavía no constituyen materiales finales ni funcionalidades
              implementadas.
            </p>
          </div>
          <div className="product-grid">
            {[
              [
                ClipboardCheck,
                "Protocolo de gestión de incidencias",
                "Definirá cómo recibir, clasificar, asignar, escalar y cerrar una solicitud, incluyendo responsables y cambios de prioridad.",
              ],
              [
                Presentation,
                "Guía visual de prioridades",
                "Presentará las categorías baja, media, alta y crítica con ejemplos cotidianos y lenguaje accesible.",
              ],
              [
                Bot,
                "Propuesta de bot conversacional de WhatsApp",
                "Explorará un canal de transición que reciba pedidos y los derive al registro único de NEXO.",
              ],
            ].map(([Icon, title, description]) => {
              const ProductIcon = Icon as typeof Bot;
              return (
                <article key={String(title)}>
                  <div>
                    <ProductIcon />
                    <span>PROPUESTA</span>
                  </div>
                  <h3>{String(title)}</h3>
                  <p>{String(description)}</p>
                  <small>No implementado en esta etapa</small>
                </article>
              );
            })}
          </div>
        </section>

        <section id="planificacion" className="section comms-planning">
          <div className="planning-copy">
            <div className="section-tag">06 · Planificación</div>
            <h2>Doce semanas para preparar, acordar y acompañar.</h2>
            <p className="lead">
              Las primeras cuatro semanas constituyen la etapa inicial del plan.
              El ciclo completo continúa hasta la semana 12 con implementación,
              capacitación, piloto y evaluación.
            </p>
            <div className="duration-chip">
              <CalendarRange />
              <span>Duración total</span>
              <strong>12 semanas</strong>
            </div>
          </div>
          <div className="week-grid">
            {[
              [
                "Semana 1",
                "Preparar",
                "Diseño del registro y categorías de prioridad.",
              ],
              [
                "Semana 2",
                "Incorporar",
                "Organizaciones piloto e historial común.",
              ],
              [
                "Semana 3",
                "Implementar",
                "Registro, validación y capacitación inicial.",
              ],
              [
                "Semana 4",
                "Practicar",
                "Protocolos, ajustes y prácticas previas.",
              ],
            ].map(([week, title, description], index) => (
              <article key={week}>
                <span>{week}</span>
                <div className="week-marker">{index + 1}</div>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="presentacion" className="section presentation-section">
          <div className="section-tag">07 · Guion de exposición</div>
          <div className="presentation-heading">
            <div>
              <h2>Nuestra presentación</h2>
              <p className="lead">
                Seis integrantes, seis perspectivas para comprender cómo NEXO
                mejora la comunicación.
              </p>
            </div>
            <div className="presentation-duration">
              <Mic2 />
              <span>Hasta 1 minuto y medio por persona</span>
            </div>
          </div>
          <div className="speech-grid">
            {presentationSpeeches.map((item) => {
              const expanded = expandedSpeech === item.number;
              const copied = copiedSpeech === item.number;
              const speechId = `speech-${item.number}`;
              return (
                <article
                  className={`speech-card${expanded ? " expanded" : ""}`}
                  key={item.number}
                >
                  <div className="speech-card-head">
                    <span>{item.number}</span>
                    <Mic2 aria-hidden="true" />
                  </div>
                  <h3>{item.name}</h3>
                  <b>{item.topic}</b>
                  <p className="speech-summary">{item.summary}</p>
                  <div className="speech-actions">
                    <button
                      type="button"
                      className="speech-expand"
                      onClick={() =>
                        setExpandedSpeech(expanded ? null : item.number)
                      }
                      aria-expanded={expanded}
                      aria-controls={speechId}
                    >
                      Ver mi intervención
                      <ChevronDown aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      className="speech-copy"
                      onClick={() => copySpeech(item.number, item.speech)}
                      aria-label={`Copiar texto de ${item.name}`}
                    >
                      {copied ? (
                        <Check aria-hidden="true" />
                      ) : (
                        <Copy aria-hidden="true" />
                      )}
                      {copied ? "Copiado" : "Copiar texto"}
                    </button>
                  </div>
                  <div
                    id={speechId}
                    className="speech-full"
                    hidden={!expanded}
                  >
                    <div className="speech-label">INTERVENCIÓN COMPLETA</div>
                    <p>{item.speech}</p>
                  </div>
                </article>
              );
            })}
          </div>
          <div className="copy-status" aria-live="polite">
            {copiedSpeech ? "Intervención copiada al portapapeles." : ""}
          </div>
        </section>

        <section id="documentacion" className="comms-documentation">
          <BookOpen />
          <div>
            <small>DOCUMENTACIÓN ACADÉMICA ORIGINAL</small>
            <h2>Proyecto NEXO · Competencias Comunicacionales II</h2>
            <p>
              Consultá la formulación completa, los objetivos, el cronograma,
              las acciones y la bibliografía en el documento fuente.
            </p>
          </div>
          <a
            className="btn light"
            href={academicDocument}
            target="_blank"
            rel="noreferrer"
          >
            Abrir documento <ArrowRight />
          </a>
        </section>

        <section id="equipo" className="section comms-team">
          <div className="section-tag">08 · Equipo y créditos</div>
          <div className="team-intro">
            <div>
              <h2>Ctrl+Estudio</h2>
              <p>
                Instituto Superior Politécnico Córdoba · Tecnicatura Superior en
                Desarrollo de Software · Comisión A · Cohorte 2026.
              </p>
            </div>
            <img
              src="/logos/ispc-logo.png"
              alt="Instituto Superior Politécnico Córdoba"
            />
          </div>
          <div className="comms-team-grid">
            {team.map((name, index) => (
              <article key={name}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <b>{name}</b>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div>
          <b>NEXO</b>
          <span>Comunicación y adopción</span>
        </div>
        <div>
          <b>ISPC</b>
          <span>Competencias Comunicacionales II</span>
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
    </div>
  );
}
