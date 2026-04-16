import { useState } from "react";
import svgConfig from "../../imports/Configuracion/svg-l2vox49j1t";
import imgProfile from "figma:asset/d340b628f8ac3f5a88c3eee669c37c56adaf97bb.png";
import imgAvatarAlt from "figma:asset/a5b486f1ef0296c3ddfa7320b5aba15480064ac0.png";

const LAVA_GRADIENT = "linear-gradient(135deg, #ff2200 0%, #ff6600 50%, #ffaa00 100%)";

export function SettingsPage() {
  const [name, setName] = useState("Aurora Ethereal");
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState({ transcription: true, automation: false, security: true });

  return (
    <div className="min-h-full p-12" style={{ color: "#fff5ee" }}>
      {/* Header */}
      <div className="mb-10">
        <h1
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 48,
            fontWeight: 700,
            color: "#fff5ee",
            letterSpacing: "-1.2px",
          }}
        >
          Settings
        </h1>
        <p className="mt-2 text-[16px]" style={{ color: "#9a6040" }}>
          Gestiona tu espacio cósmico, preferencias personales y estado de suscripción.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Profile Card */}
          <div
            className="rounded-2xl p-8"
            style={{ background: "#180900", border: "1px solid rgba(255,102,0,0.12)" }}
          >
            <div className="flex items-start justify-between mb-8">
              <div>
                <h2
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: 22,
                    fontWeight: 600,
                    color: "#fff5ee",
                  }}
                >
                  Profile
                </h2>
                <p className="text-[14px] mt-1" style={{ color: "#9a6040" }}>
                  Actualiza tu identidad pública
                </p>
              </div>

              {/* Avatar */}
              <div className="relative">
                <div
                  className="w-16 h-16 rounded-full overflow-hidden"
                  style={{
                    border: "2px solid transparent",
                    background: `linear-gradient(#180900, #180900) padding-box, ${LAVA_GRADIENT} border-box`,
                  }}
                >
                  <img src={imgProfile} alt="Profile" className="w-full h-full object-cover" />
                </div>
                {/* Use alternate avatar as small badge */}
                <div
                  className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full overflow-hidden"
                  style={{ border: "2px solid #120600" }}
                >
                  <img src={imgAvatarAlt} alt="alt" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>

            {/* Name Field */}
            <div className="mb-5">
              <label
                className="block text-[12px] font-bold uppercase tracking-widest mb-2"
                style={{ color: "#7a4a28" }}
              >
                Nombre
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl text-[15px] outline-none"
                style={{
                  background: "#0c0400",
                  border: "1px solid rgba(255,102,0,0.15)",
                  color: "#fff5ee",
                  fontFamily: "'Inter', sans-serif",
                }}
              />
            </div>

            {/* Email Field */}
            <div className="mb-8">
              <label
                className="block text-[12px] font-bold uppercase tracking-widest mb-2"
                style={{ color: "#7a4a28" }}
              >
                Email
              </label>
              <div
                className="w-full px-4 py-3.5 rounded-xl flex items-center justify-between"
                style={{
                  background: "#0c0400",
                  border: "1px solid rgba(255,102,0,0.1)",
                }}
              >
                <span className="text-[15px]" style={{ color: "#9a6040" }}>
                  aurora@nebula.io
                </span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="11" width="18" height="11" rx="2" stroke="#5a3010" strokeWidth="2" />
                  <path d="M7 11V7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7V11" stroke="#5a3010" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            {/* Save Button */}
            <button
              className="w-full py-3.5 rounded-full font-bold text-[16px] transition-all hover:opacity-90 active:scale-95"
              style={{
                background: LAVA_GRADIENT,
                color: "#1a0400",
                boxShadow: "0 8px 24px rgba(255,102,0,0.3)",
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              Guardar
            </button>
          </div>

          {/* Storage Card */}
          <div
            className="rounded-2xl p-8"
            style={{ background: "#180900", border: "1px solid rgba(255,102,0,0.12)" }}
          >
            <div className="flex items-center gap-3 mb-5">
              <svg width="22" height="22" viewBox="0 0 22 16" fill="none">
                <path d={svgConfig.pebcf900} fill="#ff6600" />
              </svg>
              <h2
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: 22,
                  fontWeight: 600,
                  color: "#fff5ee",
                }}
              >
                Almacenamiento
              </h2>
            </div>

            <div className="flex items-end justify-between mb-3">
              <div>
                <span
                  className="text-[36px] font-bold"
                  style={{ fontFamily: "'Inter', sans-serif", color: "#fff5ee" }}
                >
                  3.5
                </span>
                <span className="text-[14px] ml-1" style={{ color: "#9a6040" }}>GB USADO</span>
              </div>
              <span className="text-[14px]" style={{ color: "#7a4a28" }}>de 10 GB</span>
            </div>

            {/* Storage Bar */}
            <div
              className="w-full h-2.5 rounded-full mb-3"
              style={{ background: "#0c0400" }}
            >
              <div
                className="h-full rounded-full"
                style={{
                  width: "35%",
                  background: LAVA_GRADIENT,
                }}
              />
            </div>

            <p className="text-[13px] mt-4" style={{ color: "#7a4a28" }}>
              ¿Necesitas más espacio para grabaciones de alta fidelidad?{" "}
              <button
                className="font-bold transition-opacity hover:opacity-70"
                style={{ color: "#ff6600" }}
              >
                Actualizar Plan
              </button>
            </p>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Preferences Card */}
          <div
            className="rounded-2xl p-8"
            style={{ background: "#180900", border: "1px solid rgba(255,102,0,0.12)" }}
          >
            <h2
              className="mb-6"
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 22,
                fontWeight: 600,
                color: "#fff5ee",
              }}
            >
              Preferencias
            </h2>

            {/* Language */}
            <div className="mb-6">
              <label
                className="block text-[12px] font-bold uppercase tracking-widest mb-3"
                style={{ color: "#7a4a28" }}
              >
                Idioma
              </label>
              <div className="relative">
                <select
                  className="w-full px-4 py-3.5 rounded-xl text-[15px] outline-none appearance-none"
                  style={{
                    background: "#0c0400",
                    border: "1px solid rgba(255,102,0,0.15)",
                    color: "#fff5ee",
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  <option>Español (Universal)</option>
                  <option>English (Universal)</option>
                  <option>Français</option>
                  <option>Deutsch</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                    <path d="M1 1L6 6L11 1" stroke="#7a4a28" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Dark Mode Toggle */}
            <div
              className="flex items-center justify-between py-4"
              style={{ borderTop: "1px solid rgba(255,102,0,0.08)", borderBottom: "1px solid rgba(255,102,0,0.08)" }}
            >
              <div>
                <p className="font-bold text-[15px]" style={{ color: "#fff5ee" }}>Modo Oscuro</p>
                <p className="text-[13px] mt-0.5" style={{ color: "#7a4a28" }}>
                  Tema observatorio atmosférico
                </p>
              </div>
              <button
                className="relative w-12 h-6 rounded-full transition-all"
                style={{ background: darkMode ? LAVA_GRADIENT : "#2a0d00" }}
                onClick={() => setDarkMode(!darkMode)}
              >
                <div
                  className="absolute top-0.5 w-5 h-5 rounded-full transition-all"
                  style={{
                    left: darkMode ? "calc(100% - 22px)" : "2px",
                    background: "#fff5ee",
                  }}
                />
              </button>
            </div>

            {/* Notifications */}
            <div className="mt-6">
              <label
                className="block text-[12px] font-bold uppercase tracking-widest mb-4"
                style={{ color: "#7a4a28" }}
              >
                Notificaciones
              </label>
              <div className="space-y-4">
                {[
                  { key: "transcription" as const, label: "Transcripción completada", svgPath: svgConfig.p32002f80 },
                  { key: "automation" as const, label: "Reportes de automatización", svgPath: svgConfig.pb589888 },
                  { key: "security" as const, label: "Alertas de seguridad", svgPath: svgConfig.p27c49100 },
                ].map(({ key, label }) => (
                  <div key={key} className="flex items-center gap-3 cursor-pointer" onClick={() => setNotifications(n => ({ ...n, [key]: !n[key] }))}>
                    <div
                      className="w-5 h-5 rounded-md flex items-center justify-center transition-all"
                      style={{
                        background: notifications[key] ? LAVA_GRADIENT : "transparent",
                        border: notifications[key] ? "none" : "2px solid rgba(255,102,0,0.25)",
                      }}
                    >
                      {notifications[key] && (
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                          <path d="M1 4L3.5 6.5L9 1" stroke="#1a0400" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                      )}
                    </div>
                    <span className="text-[14px]" style={{ color: "#c8956c" }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* System Info Card */}
          <div
            className="rounded-2xl p-6"
            style={{
              background: "rgba(255,102,0,0.05)",
              border: "1px solid rgba(255,102,0,0.15)",
            }}
          >
            <div className="flex items-start gap-3">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                style={{ background: "rgba(255,102,0,0.15)", border: "1px solid rgba(255,102,0,0.3)" }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="9" stroke="#ff6600" strokeWidth="2" />
                  <path d="M12 8V12M12 16H12.01" stroke="#ff6600" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <p className="text-[13px] font-medium" style={{ color: "#ff6600" }}>
                  El sistema está corriendo en Node-Delta (Ultra Latency).
                </p>
                <p className="text-[12px] mt-1" style={{ color: "#7a4a28" }}>
                  Todos los servicios operando con normalidad.
                </p>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div
            className="rounded-2xl p-6"
            style={{ background: "#180900", border: "1px solid rgba(255,34,0,0.12)" }}
          >
            <h3 className="text-[16px] font-bold mb-3" style={{ color: "#ff2200", fontFamily: "'Syne', sans-serif" }}>
              Zona Peligrosa
            </h3>
            <p className="text-[13px] mb-4" style={{ color: "#7a4a28" }}>
              Estas acciones son irreversibles. Procede con precaución.
            </p>
            <button
              className="px-5 py-2.5 rounded-lg text-[13px] font-semibold transition-all hover:opacity-80"
              style={{
                background: "rgba(255,34,0,0.08)",
                color: "#ff2200",
                border: "1px solid rgba(255,34,0,0.2)",
              }}
            >
              Eliminar Cuenta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}