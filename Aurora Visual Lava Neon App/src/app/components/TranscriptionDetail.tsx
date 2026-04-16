import { useState } from "react";
import { useNavigate } from "react-router";
import svgPaths from "../../imports/DetalleDeTranscripcion/svg-tkvpnrpnbv";
import imgAiViz from "figma:asset/8ee32192c3c2401bfd3b5545dc456359c55bc09d.png";

const LAVA_GRADIENT = "linear-gradient(135deg, #ff2200 0%, #ff6600 50%, #ffaa00 100%)";

const TRANSCRIPT = [
  {
    time: "00:00",
    speaker: "SPEAKER A (MODERADOR)",
    color: "#ff4400",
    text: `Alright, welcome everyone to the Q4 Product Strategy session. Today we're focusing on the "Aurora" integration and how we can scale our transcription models to handle high-fidelity audio streams.`,
  },
  {
    time: "01:12",
    speaker: "SPEAKER B (ENGINEERING)",
    color: "#ff6600",
    text: `The primary challenge we're seeing is the latency in the diarization layer. When we have more than three speakers, the accuracy drops by about 12% in the first minute while the model builds the acoustic profile.`,
  },
  {
    time: "01:06",
    speaker: "SPEAKER C (DESIGN)",
    color: "#ff8800",
    text: `From a UI perspective, the users aren't seeing that delay. We've implemented a "shadow text" ghosting effect that fills in as the profile strengthens. It seems to solve the cognitive load issues.`,
  },
  {
    time: "1:02:41",
    speaker: "SPEAKER D (PRODUCT)",
    color: "#ffaa00",
    isSpeaking: true,
    text: `Let's look at the roadmap for the next sprint. We need to prioritize the "Aurora Visual" implementation. The lava-neon aesthetic isn't just for looks; it's meant to highlight key conversational triggers.`,
  },
  {
    time: "",
    speaker: "SPEAKER A",
    color: "#ff4400",
    text: `Can we get a breakdown of the specific triggers we're talking about? Are we looking at keyword density or sentiment-based shifts in the UI glow?`,
  },
];

const AI_SUMMARY = `La reunión se centró en la integración del sistema "Aurora" y los desafíos técnicos asociados con la latencia en la diarización de múltiples hablantes.

El equipo de ingeniería reportó una caída del 12% en la precisión inicial, la cual el diseño ha mitigado mediante una interfaz de "shadow text". La prioridad actual es el despliegue de la estética Aurora Visual para mejorar la detección de disparadores conversacionales.`;

const KEY_POINTS = [
  "Optimizar capa de diarización para +3 hablantes",
  "Finalizar roadmap de \"Aurora Visual\"",
  "Implementar sistema de detección de triggers semánticos",
];

type TabType = "resumen" | "puntos" | "traducir";

export function TranscriptionDetail() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>("resumen");
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress] = useState(35);

  return (
    <div className="flex h-full" style={{ color: "#fff5ee" }}>
      {/* Main Transcript Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <div
          className="px-8 py-5 flex items-center gap-4"
          style={{ borderBottom: "1px solid rgba(255,102,0,0.1)" }}
        >
          <button
            className="p-2 rounded-lg hover:bg-[rgba(255,102,0,0.1)] transition-colors"
            onClick={() => navigate("/app")}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d={svgPaths.p21bb7900} fill="#9a6040" />
            </svg>
          </button>

          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h1
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 20,
                  fontWeight: 700,
                  color: "#fff5ee",
                }}
              >
                Quarterly Product Strategy Deep Dive
              </h1>
            </div>
            <p className="text-[12px] mt-0.5" style={{ color: "#5a3010", fontFamily: "'JetBrains Mono', monospace" }}>
              ID: TR-8829-A6
            </p>
          </div>

          <div className="flex items-center gap-2">
            <ActionButton icon={<ShareIcon />} />
            <ActionButton icon={<DownloadIcon />} />
            <ActionButton icon={<MoreIcon />} />
          </div>
        </div>

        {/* Meta Info */}
        <div
          className="px-8 py-4 flex items-center gap-8 flex-wrap"
          style={{ borderBottom: "1px solid rgba(255,102,0,0.08)" }}
        >
          <MetaItem
            icon={<div className="w-2 h-2 rounded-full" style={{ background: "#ff4400", boxShadow: "0 0 8px #ff4400" }} />}
            label="Source"
            value="Zoom Meeting (Live)"
          />
          <MetaItem
            icon={<CalendarIcon />}
            label="Date"
            value="Oct 24, 2023"
          />
          <MetaItem
            icon={<ClockIcon />}
            label="Duration"
            value="48m 12s"
          />
          <MetaItem
            icon={<UsersIcon />}
            label="Speakers"
            value="4 Identified"
          />
        </div>

        {/* Transcript */}
        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
          {TRANSCRIPT.map((item, idx) => (
            <div
              key={idx}
              className="flex gap-4"
            >
              {/* Time */}
              <div className="w-14 shrink-0 pt-1">
                {item.time && (
                  <span
                    className="text-[11px]"
                    style={{ color: "#5a3010", fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {item.time}
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span
                    className="text-[11px] font-bold uppercase tracking-wider"
                    style={{ color: item.color }}
                  >
                    {item.speaker}
                  </span>
                  {item.isSpeaking && (
                    <span
                      className="text-[10px] font-bold uppercase tracking-wider"
                      style={{ color: "#ff2200" }}
                    >
                      ● SPEAKING
                    </span>
                  )}
                </div>
                <div
                  className="p-4 rounded-xl"
                  style={{
                    background: item.isSpeaking
                      ? "rgba(255,34,0,0.06)"
                      : "transparent",
                    borderLeft: `3px solid ${item.isSpeaking ? item.color : "rgba(255,102,0,0.15)"}`,
                  }}
                >
                  <p
                    style={{
                      color: "#c8956c",
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 13,
                      lineHeight: 1.8,
                    }}
                  >
                    {item.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Audio Player */}
        <div
          className="px-8 py-4 flex items-center gap-6"
          style={{
            background: "#140700",
            borderTop: "1px solid rgba(255,102,0,0.1)",
          }}
        >
          <button
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:opacity-80"
            style={{ background: "rgba(255,102,0,0.15)", border: "1px solid rgba(255,102,0,0.3)" }}
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? (
              <PauseIcon />
            ) : (
              <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
                <path d="M0 0L12 7L0 14V0Z" fill="#ff6600" />
              </svg>
            )}
          </button>

          <span className="text-[13px] shrink-0" style={{ color: "#9a6040", fontFamily: "'JetBrains Mono', monospace" }}>
            02:45 / 48:12
          </span>

          {/* Progress Bar */}
          <div className="flex-1 relative h-1.5 rounded-full" style={{ background: "#2a0d00" }}>
            <div
              className="absolute left-0 top-0 h-full rounded-full"
              style={{
                width: `${progress}%`,
                background: LAVA_GRADIENT,
              }}
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
              style={{
                left: `${progress}%`,
                transform: `translateX(-50%) translateY(-50%)`,
                background: "#ff4400",
                boxShadow: "0 0 8px #ff4400",
              }}
            />
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <VolumeIcon />
            <div className="w-20 h-1 rounded-full" style={{ background: "#2a0d00" }}>
              <div className="w-3/4 h-full rounded-full" style={{ background: "#ff6600" }} />
            </div>
          </div>

          <button
            className="px-3 py-1.5 rounded-full text-[12px] font-bold"
            style={{ background: "rgba(255,102,0,0.12)", color: "#ff6600", border: "1px solid rgba(255,102,0,0.2)" }}
          >
            1.25x
          </button>
        </div>
      </div>

      {/* AI Panel */}
      <div
        className="w-80 shrink-0 flex flex-col overflow-hidden"
        style={{
          background: "#120600",
          borderLeft: "1px solid rgba(255,102,0,0.1)",
        }}
      >
        {/* Tabs */}
        <div
          className="flex gap-1 p-3"
          style={{ borderBottom: "1px solid rgba(255,102,0,0.1)" }}
        >
          {(["resumen", "puntos", "traducir"] as TabType[]).map((tab) => (
            <button
              key={tab}
              className="flex-1 py-2 rounded-lg text-[13px] font-bold capitalize transition-all"
              style={{
                background: activeTab === tab ? LAVA_GRADIENT : "transparent",
                color: activeTab === tab ? "#1a0400" : "#7a4a28",
              }}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "resumen" ? "Resumen" : tab === "puntos" ? "Puntos Clave" : "Traducir"}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* AI Model Badge */}
          <div className="flex items-center gap-3">
            <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 600, color: "#fff5ee" }}>
              Resumen Inteligente
            </h3>
            <span
              className="px-2 py-0.5 rounded text-[10px] font-bold uppercase"
              style={{ background: "rgba(255,102,0,0.15)", color: "#ff6600", border: "1px solid rgba(255,102,0,0.25)" }}
            >
              GPT-4 PRO
            </span>
          </div>

          {activeTab === "resumen" && (
            <div className="space-y-3">
              {AI_SUMMARY.split("\n\n").map((para, i) => (
                <p key={i} className="text-[13px] leading-relaxed" style={{ color: "#9a6040" }}>
                  {para}
                </p>
              ))}

              {/* Next Steps */}
              <div className="mt-4">
                <p className="text-[11px] font-bold uppercase tracking-wider mb-3" style={{ color: "#5a3010" }}>
                  Siguientes Pasos
                </p>
                <div className="space-y-2">
                  {KEY_POINTS.slice(0, 2).map((point, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: "rgba(255,102,0,0.15)", border: "1px solid #ff6600" }}>
                        <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                          <path d="M1 3L3 5L7 1" stroke="#ff6600" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                      </div>
                      <p className="text-[12px]" style={{ color: "#9a6040" }}>{point}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "puntos" && (
            <div className="space-y-3">
              {KEY_POINTS.map((point, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3 rounded-xl"
                  style={{ background: "rgba(255,102,0,0.05)", border: "1px solid rgba(255,102,0,0.1)" }}
                >
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-[11px] font-bold"
                    style={{ background: LAVA_GRADIENT, color: "#1a0400" }}
                  >
                    {i + 1}
                  </div>
                  <p className="text-[13px]" style={{ color: "#c8956c" }}>{point}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === "traducir" && (
            <div className="space-y-4">
              <select
                className="w-full p-3 rounded-xl text-[14px] outline-none"
                style={{
                  background: "#0e0400",
                  border: "1px solid rgba(255,102,0,0.2)",
                  color: "#c8956c",
                }}
              >
                <option>Español</option>
                <option>English</option>
                <option>Français</option>
                <option>Deutsch</option>
              </select>
              <button
                className="w-full py-3 rounded-xl text-[14px] font-bold"
                style={{ background: LAVA_GRADIENT, color: "#1a0400" }}
              >
                Traducir Transcripción
              </button>
            </div>
          )}
        </div>

        {/* AI Visualization */}
        <div
          className="m-4 rounded-xl overflow-hidden relative"
          style={{ border: "1px solid rgba(255,102,0,0.15)" }}
        >
          <img
            src={imgAiViz}
            alt="AI Analysis"
            className="w-full h-32 object-cover"
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(180deg, transparent 0%, rgba(12,4,0,0.7) 100%)" }}
          />
          <div className="absolute bottom-3 left-3 right-3">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#ff2200", boxShadow: "0 0 6px #ff2200" }} />
              <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "#ff4400" }}>
                Análisis en Vivo
              </span>
            </div>
            <p className="text-[11px]" style={{ color: "#c8956c" }}>
              Detectando patrones de sentimiento y temas clave...
            </p>
          </div>
        </div>

        {/* Generate Summary Button */}
        <div className="p-4 pt-0">
          <button
            className="w-full py-3.5 rounded-xl font-bold text-[15px] flex items-center justify-center gap-3 transition-all hover:opacity-90"
            style={{
              background: LAVA_GRADIENT,
              color: "#1a0400",
              boxShadow: "0 8px 24px rgba(255,102,0,0.3)",
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            <svg width="14" height="18" viewBox="0 0 14 18" fill="none">
              <path d="M5 18L7 11H2L9 0H11L9 8H14L6 18H5Z" fill="#1a0400" />
            </svg>
            Generar Nuevo Resumen
          </button>
        </div>
      </div>
    </div>
  );
}

function MetaItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2">
      <div style={{ color: "#7a4a28" }}>{icon}</div>
      <div>
        <p className="text-[10px] uppercase tracking-wider font-bold" style={{ color: "#5a3010" }}>{label}</p>
        <p className="text-[13px] font-medium" style={{ color: "#c8956c" }}>{value}</p>
      </div>
    </div>
  );
}

function ActionButton({ icon }: { icon: React.ReactNode }) {
  return (
    <button
      className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors hover:bg-[rgba(255,102,0,0.1)]"
    >
      {icon}
    </button>
  );
}

function ShareIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M18 8C19.6569 8 21 6.65685 21 5C21 3.34315 19.6569 2 18 2C16.3431 2 15 3.34315 15 5C15 6.65685 16.3431 8 18 8Z" stroke="#7a4a28" strokeWidth="2" />
      <path d="M6 15C7.65685 15 9 13.6569 9 12C9 10.3431 7.65685 9 6 9C4.34315 9 3 10.3431 3 12C3 13.6569 4.34315 15 6 15Z" stroke="#7a4a28" strokeWidth="2" />
      <path d="M18 22C19.6569 22 21 20.6569 21 19C21 17.3431 19.6569 16 18 16C16.3431 16 15 17.3431 15 19C15 20.6569 16.3431 22 18 22Z" stroke="#7a4a28" strokeWidth="2" />
      <path d="M8.59 13.51L15.42 17.49M15.41 6.51L8.59 10.49" stroke="#7a4a28" strokeWidth="2" />
    </svg>
  );
}
function DownloadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M21 15V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V15" stroke="#7a4a28" strokeWidth="2" strokeLinecap="round" />
      <path d="M7 10L12 15L17 10" stroke="#7a4a28" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 15V3" stroke="#7a4a28" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
function MoreIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="5" r="1.5" fill="#7a4a28" />
      <circle cx="12" cy="12" r="1.5" fill="#7a4a28" />
      <circle cx="12" cy="19" r="1.5" fill="#7a4a28" />
    </svg>
  );
}
function CalendarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="4" width="18" height="18" rx="2" stroke="#7a4a28" strokeWidth="2" />
      <path d="M3 9H21" stroke="#7a4a28" strokeWidth="2" />
      <path d="M8 2V6M16 2V6" stroke="#7a4a28" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
function ClockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="#7a4a28" strokeWidth="2" />
      <path d="M12 7V12L15 14" stroke="#7a4a28" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
function UsersIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M17 21V19C17 17.3431 15.6569 16 14 16H10C8.34315 16 7 17.3431 7 19V21" stroke="#7a4a28" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="8" r="4" stroke="#7a4a28" strokeWidth="2" />
    </svg>
  );
}
function PauseIcon() {
  return (
    <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
      <path d="M3 1V13M9 1V13" stroke="#ff6600" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
function VolumeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M11 5L6 9H2V15H6L11 19V5Z" stroke="#7a4a28" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M19.07 4.93C20.9447 6.80528 21.9979 9.34836 21.9979 12C21.9979 14.6516 20.9447 17.1947 19.07 19.07" stroke="#7a4a28" strokeWidth="2" strokeLinecap="round" />
      <path d="M15.54 8.46C16.4774 9.39764 17.004 10.6692 17.004 11.995C17.004 13.3208 16.4774 14.5924 15.54 15.53" stroke="#7a4a28" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}