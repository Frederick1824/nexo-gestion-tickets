import {
  Download,
  Maximize2,
  Minus,
  Plus,
  RotateCcw,
  X,
} from "lucide-react";
import { useEffect, useRef, useState, type WheelEvent } from "react";

const posters = [
  {
    title: "Póster académico original",
    src: "/posters/comunicacionales-poster-original.jpeg",
    download: "nexo-comunicacionales-poster-original.jpeg",
  },
  {
    title: "Póster NEXO · Versión visual mejorada",
    src: "/posters/comunicacionales-poster-visual.png",
    download: "nexo-comunicacionales-poster-visual.png",
  },
];

type Poster = (typeof posters)[number];

export function AcademicPosters() {
  const [selected, setSelected] = useState<Poster | null>(null);
  const [zoom, setZoom] = useState(1);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const closeViewer = () => setSelected(null);
  const updateZoom = (next: number) => setZoom(Math.min(4, Math.max(1, next)));

  useEffect(() => {
    if (!selected) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeViewer();
      if (event.key === "+" || event.key === "=") {
        setZoom((current) => Math.min(4, current + 0.25));
      }
      if (event.key === "-") {
        setZoom((current) => Math.max(1, current - 0.25));
      }
      if (event.key === "0") updateZoom(1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selected]);

  useEffect(() => {
    if (zoom === 1 && canvasRef.current) {
      canvasRef.current.scrollTo({ top: 0, left: 0 });
    }
  }, [zoom]);

  const openViewer = (poster: Poster) => {
    setZoom(1);
    setSelected(poster);
  };

  const onWheel = (event: WheelEvent<HTMLDivElement>) => {
    event.preventDefault();
    updateZoom(zoom + (event.deltaY < 0 ? 0.2 : -0.2));
  };

  return (
    <>
      <section className="academic-posters" aria-labelledby="posters-title">
        <div className="academic-posters-heading">
          <small>MATERIALES VISUALES</small>
          <h2 id="posters-title">Pósteres del proyecto</h2>
          <p>Consultá las dos versiones completas o descargá los archivos originales.</p>
        </div>
        <div className="academic-posters-grid">
          {posters.map((poster) => (
            <article className="academic-poster-card" key={poster.src}>
              <button
                type="button"
                className="academic-poster-preview"
                onClick={() => openViewer(poster)}
                aria-label={`Ampliar ${poster.title}`}
              >
                <img
                  src={poster.src}
                  alt={poster.title}
                  loading="lazy"
                  decoding="async"
                />
              </button>
              <div className="academic-poster-info">
                <h3>{poster.title}</h3>
                <div>
                  <button type="button" onClick={() => openViewer(poster)}>
                    <Maximize2 aria-hidden="true" /> Ampliar
                  </button>
                  <a href={poster.src} download={poster.download}>
                    <Download aria-hidden="true" /> Descargar
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {selected && (
        <div
          className="academic-poster-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="poster-viewer-title"
        >
          <div className="academic-poster-toolbar">
            <b id="poster-viewer-title">{selected.title}</b>
            <div className="poster-zoom-controls" aria-label="Controles de zoom">
              <button type="button" onClick={() => updateZoom(zoom - 0.25)} disabled={zoom <= 1} aria-label="Alejar">
                <Minus />
              </button>
              <output aria-live="polite">{Math.round(zoom * 100)}%</output>
              <button type="button" onClick={() => updateZoom(zoom + 0.25)} disabled={zoom >= 4} aria-label="Acercar">
                <Plus />
              </button>
              <button type="button" onClick={() => updateZoom(1)} aria-label="Restablecer zoom">
                <RotateCcw />
              </button>
            </div>
            <a href={selected.src} download={selected.download}>
              <Download /> <span>Descargar</span>
            </a>
            <button ref={closeButtonRef} type="button" onClick={closeViewer} aria-label="Cerrar visor">
              <X />
            </button>
          </div>
          <div className="academic-poster-canvas" ref={canvasRef} onWheel={onWheel}>
            <div className="academic-poster-zoom" style={{ width: `${zoom * 100}%` }}>
              <img src={selected.src} alt={selected.title} draggable="false" />
            </div>
          </div>
          <p className="poster-viewer-hint">Rueda o trackpad para ampliar · Arrastrá las barras para recorrer · Escape para cerrar</p>
        </div>
      )}
    </>
  );
}
