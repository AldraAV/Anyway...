import { useState } from "react";
import { useNavigate } from "react-router";
import svgPaths from "../../imports/Dashboard/svg-aftu5lrtal";
import svgModal from "../../imports/NuevaTranscripcionModal/svg-5rif7vj3se";
import imgUserAvatar from "figma:asset/f467e72e6d682407662a517744d81bc5cea09bc5.png";

const LAVA_GRADIENT = "linear-gradient(135deg, #ff2200 0%, #ff6600 50%, #ffaa00 100%)";
const LAVA_GLOW = "0 10px 40px rgba(255,102,0,0.25)";

const TRANSCRIPTIONS = [
  { id: "1", title: "Entrevista de Diseño UX/UI", source: "YOUTUBE", date: "12 May 2024", lang: "Español", color: "#ff2200" },
  { id: "2", title: "Daily Standup 15-05", source: "GMETRIX", date: "15 May 2024", lang: "Inglés", color: "#ff6600" },
  { id: "3", title: "Webinar: IA en el Workflow", source: "YOUTUBE", date: "18 May 2024", lang: "Español", color: "#ff8800" },
  { id: "4", title: "Podcast: El futuro de la música", source: "GMETRIX", date: "20 May 2024", lang: "Español", color: "#7a4a28" },
];

export function Dashboard() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState<"url" | "archivo">("url");
  const [urlValue, setUrlValue] = useState("");
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="min-h-full p-12" style={{ color: "#fff5ee" }}>
      {/* Header */}
      <div className="flex items-start justify-between mb-12">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div
              className="w-8 h-8 rounded-full overflow-hidden"
              style={{ border: "1px solid rgba(255,102,0,0.3)" }}
            >
              <img src={imgUserAvatar} alt="user" className="w-full h-full object-cover" />
            </div>
            <span className="text-[13px]" style={{ color: "#7a4a28" }}>Bienvenido, Julián Rivera</span>
          </div>
          <h1
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 36,
              fontWeight: 700,
              color: "#fff5ee",
              letterSpacing: "-0.9px",
            }}
          >
            Dashboard
          </h1>
          <p className="mt-1 text-[16px]" style={{ color: "#9a6040" }}>
            Gestiona tus transcripciones y automatizaciones
          </p>
        </div>

        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d={svgPaths.p8a35e00} fill="#7a4a28" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Buscar transcripciones..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="pl-11 pr-6 py-3.5 rounded-full text-[14px] outline-none w-64 transition-all"
              style={{
                background: "#1a0900",
                border: "1px solid rgba(255,102,0,0.15)",
                color: "#c8956c",
                fontFamily: "'Inter', sans-serif",
              }}
            />
          </div>

          {/* Nueva Transcripción Button */}
          <button
            className="flex items-center gap-3 px-6 py-3.5 rounded-full font-bold text-[15px] transition-all hover:opacity-90 active:scale-95"
            style={{
              background: LAVA_GRADIENT,
              color: "#1a0400",
              boxShadow: LAVA_GLOW,
              fontFamily: "'Inter', sans-serif",
            }}
            onClick={() => setShowModal(true)}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d={svgPaths.p2d8e4cc0} fill="#1a0400" />
            </svg>
            <span>Nueva<br />Transcripción</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-6 mb-12">
        <StatCard
          label="Total Horas"
          value="124.5"
          icon={
            <svg width="42" height="45" viewBox="0 0 42 45" fill="none">
              <rect fill="rgba(255,34,0,0.1)" height="45" rx="8" width="42" />
              <path d={svgPaths.p2d6026c0} fill="#ff2200" />
            </svg>
          }
        />
        <StatCard
          label="Precisión Promedio"
          value="98.2%"
          icon={
            <svg width="42" height="42" viewBox="0 0 42 42" fill="none">
              <rect fill="rgba(255,102,0,0.1)" height="42" rx="8" width="42" />
              <path d={svgPaths.p189b7500} fill="#ff6600" />
            </svg>
          }
        />
        <StatCard
          label="Proyectos Activos"
          value="12"
          icon={
            <svg width="44" height="44" viewBox="0 0 44.0467 44.0706" fill="none">
              <rect fill="rgba(255,170,0,0.1)" height="44.0706" rx="8" width="44.0467" />
              <path d={svgPaths.p14bd700} fill="#ffaa00" />
            </svg>
          }
        />
      </div>

      {/* Recent Transcriptions */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 20,
              fontWeight: 600,
              color: "#fff5ee",
            }}
          >
            Recientes
          </h2>
          <button className="flex items-center gap-1 text-[14px] font-bold transition-opacity hover:opacity-70" style={{ color: "#ff6600" }}>
            Ver todas
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
              <path d={svgPaths.p20314340} fill="#ff6600" />
            </svg>
          </button>
        </div>

        {/* Table */}
        <div
          className="rounded-xl overflow-hidden"
          style={{ background: "#180900", border: "1px solid rgba(255,102,0,0.1)" }}
        >
          {/* Table Header */}
          <div
            className="flex items-center px-6 py-4"
            style={{
              background: "rgba(255,102,0,0.04)",
              borderBottom: "1px solid rgba(255,102,0,0.08)",
            }}
          >
            <div className="flex-1 text-[12px] font-bold uppercase tracking-[1.2px]" style={{ color: "#5a3010" }}>Título</div>
            <div className="w-36 text-[12px] font-bold uppercase tracking-[1.2px]" style={{ color: "#5a3010" }}>Fuente</div>
            <div className="w-36 text-[12px] font-bold uppercase tracking-[1.2px]" style={{ color: "#5a3010" }}>Fecha</div>
            <div className="w-28 text-[12px] font-bold uppercase tracking-[1.2px]" style={{ color: "#5a3010" }}>Idioma</div>
            <div className="w-24 text-[12px] font-bold uppercase tracking-[1.2px] text-right" style={{ color: "#5a3010" }}>Acciones</div>
          </div>

          {/* Table Rows */}
          {TRANSCRIPTIONS.filter(t =>
            searchValue === "" || t.title.toLowerCase().includes(searchValue.toLowerCase())
          ).map((t) => (
            <div
              key={t.id}
              className="flex items-center px-6 py-5 cursor-pointer transition-all hover:bg-[rgba(255,102,0,0.04)] group"
              style={{ borderBottom: "1px solid rgba(255,102,0,0.05)" }}
              onClick={() => navigate(`/app/transcription/${t.id}`)}
            >
              <div className="flex-1 flex items-center gap-3">
                <div
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ background: t.color, boxShadow: `0 0 6px ${t.color}` }}
                />
                <span className="text-[15px] font-medium" style={{ color: "#fff5ee" }}>
                  {t.title}
                </span>
              </div>
              <div className="w-36">
                <SourceBadge source={t.source} />
              </div>
              <div className="w-36">
                <span
                  className="text-[14px]"
                  style={{ color: "#9a6040", fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {t.date}
                </span>
              </div>
              <div className="w-28">
                <span className="text-[14px]" style={{ color: "#c8956c" }}>
                  {t.lang}
                </span>
              </div>
              <div className="w-24 flex justify-end">
                <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg width="4" height="16" viewBox="0 0 4 16" fill="none">
                    <path d={svgPaths.p3caf0c80} fill="#7a4a28" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* New Transcription Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(8,2,0,0.85)", backdropFilter: "blur(4px)" }}
          onClick={(e) => { if (e.target === e.currentTarget) setShowModal(false); }}
        >
          {/* Background blur decoration */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute rounded-full blur-[60px]" style={{ width: 600, height: 600, top: -100, left: -130, background: "rgba(255,34,0,0.06)" }} />
            <div className="absolute rounded-full blur-[60px]" style={{ width: 500, height: 500, bottom: -100, right: -60, background: "rgba(255,102,0,0.06)" }} />
            <div className="absolute rounded-full blur-[60px]" style={{ width: 700, height: 700, bottom: -100, left: 250, background: "rgba(255,170,0,0.04)" }} />
          </div>

          <div
            className="relative w-full max-w-xl rounded-3xl overflow-hidden"
            style={{
              background: "#1a0900",
              border: "1px solid rgba(255,102,0,0.2)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
            }}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between px-8 pt-8 pb-4">
              <div>
                <h2
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 28,
                    fontWeight: 700,
                    color: "#fff5ee",
                  }}
                >
                  Nueva Transcripción
                </h2>
                <p className="text-[14px] mt-1" style={{ color: "#9a6040" }}>
                  Convierte audio y video en texto preciso en segundos.
                </p>
              </div>
              <button
                className="p-2 rounded-full hover:bg-[rgba(255,102,0,0.1)] transition-colors"
                onClick={() => setShowModal(false)}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d={svgModal.p15494480} fill="#9a6040" />
                </svg>
              </button>
            </div>

            {/* Tabs */}
            <div
              className="flex gap-8 px-8 border-b"
              style={{ borderColor: "rgba(255,102,0,0.12)" }}
            >
              {(["url", "archivo"] as const).map((tab) => (
                <button
                  key={tab}
                  className="py-4 text-[16px] font-bold relative transition-colors"
                  style={{ color: activeTab === tab ? "#ff4400" : "#7a4a28" }}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab === "url" ? "URL" : "Archivo"}
                  {activeTab === tab && (
                    <div
                      className="absolute bottom-0 left-0 right-0 h-[3px] rounded-t-full"
                      style={{ background: LAVA_GRADIENT }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Modal Content */}
            <div className="px-8 py-8 flex flex-col gap-8">
              {activeTab === "url" ? (
                <>
                  {/* URL Input */}
                  <div>
                    <label
                      className="text-[14px] font-medium block mb-2"
                      style={{ color: "rgba(255,200,150,0.8)" }}
                    >
                      YouTube, Vimeo o GMetrix URL
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={urlValue}
                        onChange={(e) => setUrlValue(e.target.value)}
                        placeholder="https://www.youtube.com/watch?v=..."
                        className="w-full px-4 py-4 rounded-xl text-[15px] outline-none pr-12"
                        style={{
                          background: "#0c0400",
                          border: "1px solid rgba(255,102,0,0.2)",
                          color: "#fff5ee",
                          fontFamily: "'Inter', sans-serif",
                        }}
                      />
                      {urlValue && (
                        <div className="absolute right-4 top-1/2 -translate-y-1/2">
                          <svg width="21.7" height="21.7" viewBox="0 0 21.7 21.7" fill="none">
                            <path d={svgModal.p50356c0} fill="#ff5500" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <p className="text-[11px] mt-2" style={{ color: "#7a4a28" }}>
                      Se admiten enlaces públicos y privados con acceso compartido.
                    </p>
                  </div>

                  {/* Options Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div
                      className="p-4 rounded-xl"
                      style={{ background: "#0e0500", border: "1px solid rgba(255,102,0,0.1)" }}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <path d={svgModal.p237be000} fill="#ff6600" />
                        </svg>
                        <span className="text-[14px] font-bold" style={{ color: "#fff5ee" }}>Idioma</span>
                      </div>
                      <p className="text-[12px]" style={{ color: "#7a4a28" }}>
                        Auto-detección habilitada (ES, EN, FR, DE)
                      </p>
                    </div>
                    <div
                      className="p-4 rounded-xl"
                      style={{ background: "#0e0500", border: "1px solid rgba(255,102,0,0.1)" }}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
                          <path d={svgModal.pc679c40} fill="#ffaa00" />
                        </svg>
                        <span className="text-[14px] font-bold" style={{ color: "#fff5ee" }}>Resumen AI</span>
                      </div>
                      <p className="text-[12px]" style={{ color: "#7a4a28" }}>
                        Generar puntos clave automáticamente
                      </p>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex flex-col items-center gap-4">
                    <button
                      className="w-full py-4 rounded-full font-bold text-[16px] flex items-center justify-center gap-3 transition-all hover:opacity-90 active:scale-95"
                      style={{
                        background: LAVA_GRADIENT,
                        color: "#1a0400",
                        boxShadow: "0 10px 30px rgba(255,102,0,0.3)",
                        fontFamily: "'Space Grotesk', sans-serif",
                      }}
                      onClick={() => { setShowModal(false); navigate("/app/transcription/1"); }}
                    >
                      <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
                        <path d={svgModal.p9899234} fill="#1a0400" />
                      </svg>
                      Transcribir Ahora
                    </button>
                    <p
                      className="text-[10px] font-medium uppercase tracking-[1px]"
                      style={{ color: "#5a3010" }}
                    >
                      Consumo estimado: 12 Créditos Nebula
                    </p>
                  </div>
                </>
              ) : (
                <div
                  className="flex flex-col items-center justify-center py-12 rounded-xl border-2 border-dashed"
                  style={{ borderColor: "rgba(255,102,0,0.2)" }}
                >
                  <svg width="21" height="28.5" viewBox="0 0 21 28.5" fill="none">
                    <path d={svgPaths.p2d6026c0} fill="#ff4400" />
                  </svg>
                  <p className="mt-4 text-[15px] font-medium" style={{ color: "#9a6040" }}>
                    Arrastra tu archivo aquí
                  </p>
                  <p className="text-[13px] mt-1" style={{ color: "#5a3010" }}>
                    MP3, WAV, WebM hasta 25MB
                  </p>
                  <button
                    className="mt-6 px-6 py-3 rounded-full text-[14px] font-semibold"
                    style={{ background: "rgba(255,102,0,0.1)", color: "#ff6600", border: "1px solid rgba(255,102,0,0.2)" }}
                  >
                    Seleccionar Archivo
                  </button>
                </div>
              )}
            </div>

            {/* Bottom flare */}
            <div
              className="absolute bottom-[-40px] right-[-40px] w-32 h-32 rounded-full blur-[12px] opacity-5"
              style={{ background: LAVA_GRADIENT }}
            />
          </div>
        </div>
      )}

      {/* Floating + Button */}
      <button
        className="fixed bottom-8 right-8 w-14 h-14 rounded-full flex items-center justify-center transition-all hover:opacity-90 active:scale-95 z-40"
        style={{ background: LAVA_GRADIENT, boxShadow: "0 8px 24px rgba(255,102,0,0.4)" }}
        onClick={() => setShowModal(true)}
      >
        <svg width="22" height="22" viewBox="0 0 22.4414 22.4414" fill="none">
          <path d={svgPaths.p3ef27000} fill="#1a0400" />
        </svg>
      </button>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div
      className="flex items-center justify-between p-6 rounded-xl"
      style={{
        background: "rgba(28,10,0,0.7)",
        border: "1px solid rgba(255,102,0,0.12)",
        backdropFilter: "blur(12px)",
      }}
    >
      <div>
        <p
          className="text-[13px] font-normal uppercase tracking-[1.4px] mb-2"
          style={{ color: "#9a6040", fontFamily: "'Inter', sans-serif" }}
        >
          {label}
        </p>
        <p
          className="text-[30px] font-bold"
          style={{ color: "#fff5ee", fontFamily: "'Inter', sans-serif" }}
        >
          {value}
        </p>
      </div>
      {icon}
    </div>
  );
}

function SourceBadge({ source }: { source: string }) {
  const isYoutube = source === "YOUTUBE";
  return (
    <span
      className="inline-block px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-[-0.25px]"
      style={{
        background: isYoutube ? "rgba(255,85,0,0.12)" : "rgba(255,34,0,0.1)",
        color: isYoutube ? "#ff5500" : "#ff2200",
        border: `1px solid ${isYoutube ? "rgba(255,85,0,0.25)" : "rgba(255,34,0,0.2)"}`,
      }}
    >
      {source}
    </span>
  );
}