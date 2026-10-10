import { useEffect, useRef, useState, type ReactNode } from "react";
import { members, type Member } from "./data/members";
import { inventory } from "./data/inventory";
import { photos, type Photo } from "./data/photos";
import { Gallery } from "./Gallery";
import { SuspectFile, SuspectList } from "./SuspectFile";
import {
  BloodSplatter,
  PoliceTape,
  SceneProps,
  WantedLevel,
} from "./CrimeScene";

type Section = {
  id: string;
  number: string;
  label: string;
  title: string;
  description: string;
  plan: string[];
};

const sections: Section[] = [
  {
    id: "sospechosos",
    number: "01",
    label: "Los sospechosos",
    title: "CUATRO FICHAS. CERO COARTADAS.",
    description:
      "Retratos como fichas policiales ficticias, nombres tachados y anotaciones de los colegas.",
    plan: [
      "Kili (Il Mafias), Coco, Jowi y Luizao (Gitano). Kili se casa.",
      "Retratos asignados por el orden confirmado por Sergi en LC-043.",
      "Apodos adicionales, cargos absurdos e historias: los aportáis vosotros.",
    ],
  },
  {
    id: "pruebas",
    number: "02",
    label: "Pruebas fotográficas",
    title: "LA MEMORIA TIENE PRUEBAS.",
    description:
      "Una mesa de pruebas: fotos sin pulir, etiquetas de expediente y una ampliación que deja respirar el recuerdo.",
    plan: [
      `${inventory.imageCount} archivos de imagen disponibles. Hay escenas repetidas en distintas capturas.`,
      "Filtros por persona y episodio cuando estén confirmados.",
      "Ampliación, contexto real y descarga del original. La censura se aplica sobre la interfaz.",
    ],
  },
  {
    id: "cintas",
    number: "03",
    label: "Cintas intervenidas",
    title: "ESTO NO PASÓ EL CORTE.",
    description:
      "Dos cintas, estética VHS y reproducción bajo demanda. Ningún vídeo empieza a gritar al entrar.",
    plan: [
      "IMG_0272: 48,35 segundos. IMG_0357: 57,98 segundos.",
      "Ambos son verticales, H.264 con audio AAC. Se corregirá la rotación en las copias.",
      "MP4 locales, carátulas propias y controles accesibles. Sin YouTube ni reproductores externos.",
    ],
  },
  {
    id: "cronologia",
    number: "04",
    label: "Historial de liadas",
    title: "LOS HECHOS, SEGÚN VOSOTROS.",
    description:
      "La cronología se cuenta como una sucesión de expedientes abiertos. Cada liada necesita su testimonio.",
    plan: [
      "Las fechas de las capturas son de 2026; no son fechas de las aventuras.",
      "Los metadatos de los vídeos indican 2013. Pendiente de confirmación humana.",
      "Cada episodio se enlaza a sus pruebas. Años desconocidos visibles como «fecha por confirmar».",
    ],
  },
  {
    id: "especial",
    number: "05",
    label: "Kili se casa",
    title: "IL MAFIAS CAMBIA DE ESTADO.",
    description:
      "El expediente especial de Kili. Arranca con mala leche y acaba con algo que no se esperaba.",
    plan: [
      "Novio confirmado: Kili (Il Mafias). Fecha de boda pendiente.",
      "Un último interrogatorio de Coco, Jowi y Luizao. Bromas reales, aportadas por vosotros.",
      "Tras el último sello, baja el ruido: vídeo o carta de los amigos. El contenido lo escribís vosotros.",
    ],
  },
  {
    id: "secretos",
    number: "06",
    label: "Zona sellada",
    title: "SI HAS LLEGADO AQUÍ, YA SABES.",
    description:
      "Sellos que se pueden levantar, una combinación interna y un pequeño trastero de material secreto.",
    plan: [
      "Los secretos se desbloquearán mediante pistas comprensibles para el grupo.",
      "También tendrán alternativa táctil y de teclado; no dependerán de hover.",
      "Estas sorpresas son parte del juego. La privacidad online se resuelve aparte.",
    ],
  },
  {
    id: "descarga",
    number: "07",
    label: "Extraer el archivo",
    title: "ESTO SE QUEDA CONTIGO.",
    description:
      "La web será el regalo. La copia offline será lo que permita volver dentro de muchos años.",
    plan: [
      "Paquete final: web offline, todas las fotos y vídeos originales, copias compatibles y catálogo.",
      "Abrir index.html con doble clic. Sin cuentas, CDN, servidor ni instalación.",
      "La copia actual incluye las 41 imágenes, sus originales y el tema musical. Los vídeos quedan para la siguiente fase.",
    ],
  },
];

const samples = [
  "LC-001",
  "LC-008",
  "LC-022",
  "LC-019",
  "LC-023",
  "LC-026",
  "LC-043",
].map((id) => photos.find((photo) => photo.id === id)!);

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span aria-hidden="true">{diagonal ? "↗" : "→"}</span>;
}

function PigMark() {
  return (
    <svg
      className="pig-mark"
      viewBox="0 0 50 50"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="m9 21-3-13 15 6M41 21l3-13-15 6"
        stroke="currentColor"
        strokeWidth="3"
      />
      <path
        d="M7 28c0-12 9-17 18-17s18 5 18 17-7 17-18 17S7 40 7 28Z"
        stroke="currentColor"
        strokeWidth="3"
      />
      <ellipse
        cx="25"
        cy="32"
        rx="10"
        ry="7"
        stroke="currentColor"
        strokeWidth="3"
      />
      <path
        d="M21 30v4m8-4v4M16 22h3m12 0h3"
        stroke="currentColor"
        strokeWidth="3"
      />
    </svg>
  );
}

function MusicToggle({
  playing,
  failed,
  onToggle,
}: {
  playing: boolean;
  failed: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      className={`music-toggle ${playing ? "is-playing" : ""}`}
      onClick={onToggle}
      aria-label={playing ? "Silenciar música" : "Activar música"}
      aria-pressed={playing}
      title="Soviet Connection · Michael Hunter"
    >
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M4 9h4l5-4v14l-5-4H4Z"
          stroke="currentColor"
          strokeWidth="1.7"
        />
        {playing ? (
          <path
            d="M16 8c3 2 3 6 0 8m3-11c5 4 5 10 0 14"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        ) : (
          <path d="m17 9 5 6m0-6-5 6" stroke="currentColor" strokeWidth="1.7" />
        )}
      </svg>
      <span>SONIDO: {failed ? "REINTENTAR" : playing ? "ON" : "OFF"}</span>
    </button>
  );
}

function Dialog({
  title,
  children,
  onClose,
  className = "",
}: {
  title: string;
  children: ReactNode;
  onClose: () => void;
  className?: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  useEffect(() => {
    const dialog = ref.current!;
    const oldOverflow = document.body.style.overflow;
    dialog.showModal();
    if (window.matchMedia("(max-width: 850px)").matches) {
      dialog.querySelector("button")?.focus({ preventScroll: true });
    }
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = oldOverflow;
    };
  }, []);
  return (
    <dialog
      ref={ref}
      aria-label={title}
      className={`dialog ${className}`}
      onCancel={(e) => {
        e.preventDefault();
        closeRef.current();
      }}
      onKeyDown={(event) => {
        if (
          event.key !== "Tab" ||
          !window.matchMedia("(max-width: 850px)").matches
        )
          return;
        const targets = [
          ...event.currentTarget.querySelectorAll<HTMLElement>(
            "button, a[href], input, select, textarea, [tabindex]",
          ),
        ].filter(
          (target) =>
            !target.matches(":disabled") &&
            target.tabIndex >= 0 &&
            target.getClientRects().length > 0,
        );
        if (!targets.length) return;
        event.preventDefault();
        const index = targets.indexOf(document.activeElement as HTMLElement);
        const next =
          index < 0
            ? event.shiftKey
              ? targets.length - 1
              : 0
            : (index + (event.shiftKey ? -1 : 1) + targets.length) %
              targets.length;
        targets[next].focus();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) closeRef.current();
      }}
    >
      <button
        type="button"
        className="close-dialog"
        aria-label="Cerrar"
        onClick={onClose}
      >
        ×
      </button>
      {children}
    </dialog>
  );
}

export function App() {
  const [entered, setEntered] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    if (!menuOpen) return;
    const media = window.matchMedia("(max-width: 850px)");
    const closeOnDesktop = () => {
      if (!media.matches) setMenuOpen(false);
    };
    closeOnDesktop();
    media.addEventListener("change", closeOnDesktop);
    return () => media.removeEventListener("change", closeOnDesktop);
  }, [menuOpen]);
  const [section, setSection] = useState<Section | null>(null);
  const [photo, setPhoto] = useState<Photo | null>(null);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [suspectsOpen, setSuspectsOpen] = useState(false);
  const [suspect, setSuspect] = useState<Member | null>(null);
  const photoIndex = photo
    ? photos.findIndex((item) => item.id === photo.id)
    : -1;
  const stepPhoto = (direction: number) =>
    setPhoto((current) =>
      current
        ? photos[
            (photos.findIndex((item) => item.id === current.id) +
              direction +
              photos.length) %
              photos.length
          ]
        : null,
    );
  useEffect(() => {
    if (!photo) return;
    const navigatePhoto = (event: KeyboardEvent) => {
      if (event.altKey || event.ctrlKey || event.metaKey) return;
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
        stepPhoto(event.key === "ArrowLeft" ? -1 : 1);
      }
    };
    window.addEventListener("keydown", navigatePhoto);
    return () => window.removeEventListener("keydown", navigatePhoto);
  }, [photo]);
  const [effects, setEffects] = useState(true);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [audioFailed, setAudioFailed] = useState(false);
  const audio = useRef<HTMLAudioElement>(null);
  const musicTouched = useRef(false);
  useEffect(() => {
    if (audio.current) audio.current.volume = 0.28;
    const pauseForVideo = (event: Event) => {
      if (event.target instanceof HTMLVideoElement) audio.current?.pause();
    };
    document.addEventListener("play", pauseForVideo, true);
    return () => document.removeEventListener("play", pauseForVideo, true);
  }, []);
  const playMusic = () => {
    setAudioFailed(false);
    audio.current?.play().catch(() => setAudioFailed(true));
  };
  const toggleMusic = () => {
    musicTouched.current = true;
    if (audio.current?.paused) playMusic();
    else audio.current?.pause();
  };
  const enterArchive = () => {
    if (!musicTouched.current) playMusic();
    setEntered(true);
  };
  const isLocal = window.location.protocol === "file:";
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (entered) {
      window.scrollTo(0, 0);
      heading.current?.focus();
    }
  }, [entered]);
  const openSection = (item: Section) => {
    if (item.id === "pruebas") setGalleryOpen(true);
    else if (item.id === "sospechosos") setSuspectsOpen(true);
    else setSection(item);
    setMenuOpen(false);
  };
  return (
    <div className={`experience ${effects ? "" : "effects-off"}`}>
      <audio
        ref={audio}
        src="./media/soviet-connection.mp3"
        preload="none"
        loop
        onPlaying={() => {
          setMusicPlaying(true);
          setAudioFailed(false);
        }}
        onPause={() => setMusicPlaying(false)}
        onError={() => {
          setMusicPlaying(false);
          setAudioFailed(true);
        }}
      />
      {audioFailed && (
        <p className="audio-status mono" role="status">
          El tema no ha podido arrancar. Puedes reintentarlo con el botón de
          sonido.
        </p>
      )}
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      {!entered ? (
        <div className="gate">
          <header className="gate-header">
            <a href="#" className="brand" aria-label="Los Cerdas, inicio">
              <PigMark />
              <span>
                LOS
                <br />
                CERDAS<span className="brand-dot">®</span>
              </span>
            </a>
            <span className="mono">
              ARCHIVO PERSONAL
              <br />
              ACCESO BAJO TU RESPONSABILIDAD
            </span>
            <div className="header-tools">
              <WantedLevel />
              <MusicToggle
                playing={musicPlaying}
                failed={audioFailed}
                onToggle={toggleMusic}
              />
            </div>
          </header>
          <main id="contenido" className="gate-main">
            <SceneProps variant="gate" />
            <div className="gate-copy">
              <p className="eyebrow">
                <span className="red-dot" /> EXPEDIENTE LC / CLASIFICADO
              </p>
              <h1 aria-label="El archivo que nadie debió abrir.">
                EL ARCHIVO
                <br />
                QUE NADIE
                <br />
                <span className="red-text glitch-text" data-text="DEBIÓ ABRIR.">
                  DEBIÓ ABRIR.
                </span>
              </h1>
              <p className="gate-description">
                Cuatro amigos. Demasiadas pruebas.
                <br />Y uno que ha decidido casarse.
              </p>
              <button
                type="button"
                className="primary-button"
                onClick={enterArchive}
              >
                ABRIR EL PUTO ARCHIVO <Arrow diagonal />
              </button>
              <p className="small mono">
                EXPEDIENTE FICTICIO. COLEGAS MUY REALES.
              </p>
            </div>
            <div className="gate-evidence" aria-hidden="true">
              <div className="cordon-wrap">
                <PoliceTape className="photo-cordon" />
              </div>
              <div className="evidence-cross cross-one">+</div>
              <div className="evidence-cross cross-two">+</div>
              <div className="gate-photo">
                <BloodSplatter className="photo-blood" />
                <div className="photo-tab mono">
                  PRUEBA LC-001 / NO DESTRUIR
                </div>
                <img src="./media/LC-001.jpg" alt="" width="640" height="426" />
                <div className="censor-bar">INFORMACIÓN COMPROMETEDORA</div>
                <div className="photo-bottom mono">
                  <span>{inventory.imageCount} IMÁGENES · 02 VÍDEOS</span>
                  <span>ORIGINALES A SALVO</span>
                </div>
              </div>
              <div className="stamp gate-stamp">CLASIFICADO</div>
              <span className="hand-note">
                Hay pruebas.
                <br />
                Lo sentimos.
              </span>
              <div className="gate-index mono">
                LC — 000
                <br />
                COPIA PARA LOS IMPLICADOS
              </div>
            </div>
          </main>
          <div className="gate-perimeter">
            <PoliceTape />
          </div>
          <footer className="gate-footer mono">
            <span>LA MEMORIA NO TIENE DERECHO AL OLVIDO.</span>
            <button
              type="button"
              className="text-button"
              onClick={() => setEffects(!effects)}
              aria-pressed={effects}
            >
              {effects ? "EFECTOS: ON" : "EFECTOS: OFF"}
            </button>
            <span>SOVIET CONNECTION / MICHAEL HUNTER</span>
          </footer>
        </div>
      ) : (
        <div className="archive">
          <aside className="sidebar">
            <a
              href="#"
              className="brand"
              aria-label="Volver al acceso"
              onClick={(e) => {
                e.preventDefault();
                setEntered(false);
              }}
            >
              <PigMark />
              <span>
                LOS
                <br />
                CERDAS<span className="brand-dot">®</span>
              </span>
            </a>
            <p className="sidebar-caption mono">
              UNIDAD DE ASUNTOS CERDAS
              <br />
              EXPEDIENTE FICTICIO
            </p>
            <div className="sidebar-rule" />
            <p className="nav-label mono">ÍNDICE DEL EXPEDIENTE</p>
            <nav aria-label="Archivo">
              <button
                className="nav-item active"
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: "auto" })}
              >
                <span>00</span>El archivo
                <Arrow />
              </button>
              {sections.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`nav-item ${item.id === "especial" ? "nav-special" : ""}`}
                  onClick={() => openSection(item)}
                >
                  <span>{item.number}</span>
                  {item.label}
                  {item.id === "especial" && <span className="special-dot" />}
                </button>
              ))}
            </nav>
            <div className="sidebar-bottom">
              <div className="stamp">
                SOLO
                <br />
                IMPLICADOS
              </div>
              <span className="mono">
                CUATRO CERDAS.
                <br />
                UN MISMO EXPEDIENTE.
              </span>
              <button
                type="button"
                className="text-button mono"
                aria-pressed={effects}
                onClick={() => setEffects(!effects)}
              >
                {effects ? "EFECTOS: ON" : "EFECTOS: OFF"}
              </button>
            </div>
          </aside>
          <div className="archive-body">
            <header className="topbar">
              <span className="mono">
                <span className="red-dot" /> ARCHIVO / LOS CERDAS
              </span>
              <div className="header-tools">
                <WantedLevel />
                <MusicToggle
                  playing={musicPlaying}
                  failed={audioFailed}
                  onToggle={toggleMusic}
                />
              </div>
              <button
                type="button"
                className="menu-button"
                aria-expanded={menuOpen}
                aria-controls="mobile-nav"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? "CERRAR ×" : "ÍNDICE ☰"}
              </button>
            </header>
            {menuOpen && (
              <Dialog
                title="Índice del expediente"
                className="mobile-menu-dialog"
                onClose={() => setMenuOpen(false)}
              >
                <div className="mobile-menu-heading">
                  <p className="eyebrow">LOS CERDAS / ARCHIVO CLASIFICADO</p>
                  <h2>EL EXPEDIENTE.</h2>
                </div>
                <nav
                  id="mobile-nav"
                  className="mobile-nav"
                  aria-label="Índice móvil"
                >
                  <button
                    type="button"
                    onClick={() => {
                      setEntered(false);
                      setMenuOpen(false);
                    }}
                  >
                    00 / Volver al acceso
                  </button>
                  {sections.map((item) => (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => openSection(item)}
                    >
                      {item.number} / {item.label}
                      <Arrow />
                    </button>
                  ))}
                  <button
                    type="button"
                    aria-pressed={effects}
                    onClick={() => setEffects(!effects)}
                  >
                    {effects ? "Efectos: ON" : "Efectos: OFF"}
                  </button>
                </nav>
              </Dialog>
            )}
            <main id="contenido" className="archive-main">
              <section className="archive-hero">
                <SceneProps variant="archive" />
                <div className="hero-copy">
                  <p className="eyebrow">EXPEDIENTE 00 / VISTA GENERAL</p>
                  <h1
                    ref={heading}
                    tabIndex={-1}
                    aria-label="CUATRO CERDAS. UN EXPEDIENTE."
                  >
                    CUATRO
                    <br />
                    <span className="red-text glitch-text" data-text="CERDAS.">
                      CERDAS.
                    </span>
                    <br />
                    UN EXPEDIENTE.
                  </h1>
                  <p>
                    El pasado no se borra.
                    <br />
                    Se archiva con muy mala leche.
                  </p>
                  <button
                    type="button"
                    className="outline-button"
                    onClick={() => openSection(sections[1])}
                  >
                    VER LAS 41 FOTOS <Arrow />
                  </button>
                </div>
                <div className="hero-evidence-wrap">
                  <div className="cordon-wrap">
                    <PoliceTape className="photo-cordon" />
                  </div>
                  <button
                    type="button"
                    className="hero-evidence"
                    onClick={() => setPhoto(samples[0])}
                    aria-label="Ampliar prueba LC-001"
                  >
                    <BloodSplatter className="photo-blood" />
                    <span className="photo-tab mono">
                      PRUEBA LC-001 / FOTOGRAFÍA DE GRUPO
                    </span>
                    <img
                      src="./media/LC-001.jpg"
                      alt={samples[0].text}
                      width="640"
                      height="426"
                    />
                    <span className="photo-caption mono">
                      FECHA POR CONFIRMAR <Arrow diagonal />
                    </span>
                    <span className="stamp hero-stamp">
                      SIN
                      <br />
                      CENSURA
                    </span>
                  </button>
                </div>
              </section>
              <div className="red-ticker perimeter-ticker mono">
                <span>CUATRO SOSPECHOSOS.</span>
                <span>POLICE LINE · NO CRUZAR.</span>
                <span aria-hidden="true">✳</span>
              </div>
              <section
                className="inventory-strip"
                aria-label="Inventario auditado"
              >
                <div>
                  <strong>{inventory.imageCount}</strong>
                  <span>
                    IMÁGENES
                    <br />
                    <small>{inventory.pngCount} PNG + 1 JPG</small>
                  </span>
                </div>
                <div>
                  <strong>02</strong>
                  <span>
                    CINTAS
                    <br />
                    <small>01 MIN 46 S</small>
                  </span>
                </div>
                <div>
                  <strong>
                    {Math.round(inventory.originalBytes / 1e6)}
                    <span>MB</span>
                  </strong>
                  <span>
                    DE PRUEBAS
                    <br />
                    <small>ORIGINALES CONSERVADOS</small>
                  </span>
                </div>
              </section>
              <section className="proof-section">
                <div className="section-heading">
                  <div>
                    <p className="eyebrow">02 / EVIDENCIAS VISUALES</p>
                    <h2>EL CUERPO DEL DELITO.</h2>
                  </div>
                  <button
                    type="button"
                    className="text-button mono"
                    onClick={() => openSection(sections[1])}
                  >
                    VER LAS 41 PRUEBAS <Arrow />
                  </button>
                </div>
                <div className="proof-grid">
                  {samples.slice(1, 4).map((sample, i) => (
                    <button
                      type="button"
                      className={`proof-card proof-${i}`}
                      key={sample.id}
                      onClick={() => setPhoto(sample)}
                    >
                      <div className="proof-image">
                        <img
                          src={`./media/${sample.id}.jpg`}
                          alt={sample.text}
                          loading="lazy"
                        />
                        <span className="proof-zoom" aria-hidden="true">
                          ↗
                        </span>
                      </div>
                      <span className="proof-meta mono">
                        <span>{sample.id}</span>
                        <span>FECHA SIN CONFIRMAR</span>
                      </span>
                      <strong>{sample.label}</strong>
                    </button>
                  ))}
                </div>
                <p className="proof-note mono">
                  FOTOS REALES. CONTEXTO PENDIENTE DE VUESTROS TESTIMONIOS.
                </p>
              </section>
              <section className="suspects-section">
                <div className="section-heading">
                  <div>
                    <p className="eyebrow">01 / IDENTIDADES CONFIRMADAS</p>
                    <h2>LOS DE SIEMPRE.</h2>
                  </div>
                  <span className="mono small">
                    4 MIEMBROS / UN SOLO EXPEDIENTE
                  </span>
                </div>
                <div className="suspects-grid">
                  {members.map((member, n) => (
                    <button
                      type="button"
                      className={`suspect ${member.groom ? "suspect-groom" : ""}`}
                      key={member.id}
                      onClick={() => setSuspect(member)}
                    >
                      <span className="mono small">FICHA / 0{n + 1}</span>
                      <div className="suspect-portrait">
                        <img
                          src={`./media/portrait-${member.id}.jpg`}
                          alt={`Retrato de ${member.name}, identificado por Sergi en la fotografía LC-043`}
                          loading="lazy"
                        />
                        {member.groom && (
                          <span className="groom-label mono">SE CASA</span>
                        )}
                      </div>
                      <strong className="suspect-name">{member.name}</strong>
                      <span className="suspect-alias mono">
                        {member.alias || "LOS CERDAS"}
                      </span>
                      <span className="mono small">
                        ABRIR FICHA <Arrow />
                      </span>
                    </button>
                  ))}
                </div>
              </section>
              <section className="wedding-file">
                <div className="file-label mono">
                  05 / EXPEDIENTE ESPECIAL<span>ESTADO: COMPROMETIDO</span>
                </div>
                <div className="wedding-content">
                  <div>
                    <h2 aria-label="Kili se casa. El archivo no prescribe.">
                      KILI SE CASA.
                      <br />
                      EL ARCHIVO
                      <br />
                      <span>NO PRESCRIBE.</span>
                    </h2>
                    <p>
                      Los colegas vienen incluidos.
                      <br />
                      Sin posibilidad de devolución.
                    </p>
                  </div>
                  <button
                    type="button"
                    className="dark-button"
                    onClick={() => openSection(sections[4])}
                  >
                    ABRIR EL CASO <Arrow diagonal />
                  </button>
                </div>
                <span className="wedding-mark" aria-hidden="true">
                  ✳
                </span>
              </section>
              <section className="archive-exit">
                <div>
                  <p className="eyebrow">07 / COPIA DE CONSERVACIÓN</p>
                  <h2>NI LA NUBE ES PARA SIEMPRE.</h2>
                  <p>
                    Las 41 imágenes, sus originales y esta web.
                    <br />
                    Guarda la copia y vuelve sin Internet.
                  </p>
                </div>
                {isLocal ? (
                  <span className="local-copy mono">
                    ✓ ESTÁS EN LA COPIA LOCAL
                  </span>
                ) : (
                  <a
                    className="outline-button"
                    href="./downloads/los-cerdas-maqueta-offline.zip"
                    download
                  >
                    GUARDAR MAQUETA <span aria-hidden="true">↓</span>
                  </a>
                )}
              </section>
            </main>
            <footer className="archive-footer mono">
              <span>LOS CERDAS / EL ARCHIVO CLASIFICADO</span>
              <span>41 IMÁGENES · ORIGINALES EN LA COPIA OFFLINE</span>
              <button
                type="button"
                className="text-button"
                onClick={() => {
                  setEntered(false);
                  setMenuOpen(false);
                }}
              >
                CERRAR EXPEDIENTE ↗
              </button>
            </footer>
          </div>
        </div>
      )}
      {section && (
        <Dialog title={section.label} onClose={() => setSection(null)}>
          <div className="concept-content">
            <p className="eyebrow">
              {section.number} / {section.label.toUpperCase()}
            </p>
            <span className="concept-tag mono">SECCIÓN EN DISEÑO</span>
            <h2>{section.title}</h2>
            <p className="concept-intro">{section.description}</p>
            <ul>
              {section.plan.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
            {section.id === "pruebas" && (
              <div className="sample-grid">
                {samples.map((sample) => (
                  <button
                    type="button"
                    key={sample.id}
                    onClick={() => {
                      setSection(null);
                      setPhoto(sample);
                    }}
                    aria-label={`Ampliar ${sample.id}`}
                  >
                    <img
                      src={`./media/${sample.id}.jpg`}
                      alt={sample.text}
                      loading="lazy"
                    />
                    <span className="mono">{sample.id} ↗</span>
                  </button>
                ))}
              </div>
            )}
            {section.id === "descarga" &&
              (isLocal ? (
                <p className="mono small">YA ESTÁS EN LA MAQUETA OFFLINE.</p>
              ) : (
                <a
                  href="./downloads/los-cerdas-maqueta-offline.zip"
                  className="primary-button"
                  download
                >
                  DESCARGAR MAQUETA OFFLINE <span aria-hidden="true">↓</span>
                </a>
              ))}
            <p className="concept-foot mono">
              DIRECCIÓN APROBADA / SECCIÓN EN DESARROLLO
            </p>
          </div>
        </Dialog>
      )}
      {galleryOpen && (
        <Dialog
          title="Galería de pruebas"
          className="gallery-dialog"
          onClose={() => setGalleryOpen(false)}
        >
          <Gallery onSelect={setPhoto} />
        </Dialog>
      )}
      {suspectsOpen && (
        <Dialog
          title="Los sospechosos"
          className="suspect-dialog"
          onClose={() => setSuspectsOpen(false)}
        >
          <SuspectList onSelect={setSuspect} />
        </Dialog>
      )}
      {suspect && (
        <Dialog
          title={`Ficha de ${suspect.name}`}
          className="suspect-dialog"
          onClose={() => setSuspect(null)}
        >
          <SuspectFile member={suspect} />
        </Dialog>
      )}
      {photo && (
        <Dialog
          title={`Prueba ${photo.id}`}
          className="photo-dialog"
          onClose={() => setPhoto(null)}
        >
          <img
            src={photo.src}
            alt={photo.text}
            width={photo.width}
            height={photo.height}
          />
          <div className="photo-dialog-caption">
            <span className="mono">
              {photo.id} / {photo.label}
            </span>
            <p>
              Fecha y contexto por confirmar. El original se conserva intacto en
              la descarga offline.
            </p>
            <div className="photo-pagination">
              <button
                type="button"
                aria-label="Fotografía anterior"
                onClick={() => stepPhoto(-1)}
              >
                ←
              </button>
              <span className="mono" aria-live="polite">
                {photoIndex + 1} / {photos.length}
              </span>
              <button
                type="button"
                aria-label="Fotografía siguiente"
                onClick={() => stepPhoto(1)}
              >
                →
              </button>
            </div>
            {isLocal && (
              <a
                className="save-original"
                href={`./originales/${encodeURIComponent(photo.originalFile)}`}
                target="_blank"
                rel="noopener"
              >
                ABRIR ORIGINAL ↗
              </a>
            )}
          </div>
        </Dialog>
      )}
    </div>
  );
}
