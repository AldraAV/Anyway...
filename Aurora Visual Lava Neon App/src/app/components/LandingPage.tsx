import { useNavigate } from "react-router";
import svgPaths from "../../imports/LandingPage/svg-648pxyb7nv";

const LAVA_GRADIENT = "linear-gradient(135deg, #ff2200 0%, #ff6600 50%, #ffaa00 100%)";
const LAVA_GLOW = "0 10px 40px rgba(255,102,0,0.3)";

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen w-full overflow-x-hidden"
      style={{ background: "#0c0400", fontFamily: "'Inter', sans-serif" }}
    >
      {/* Aurora Background Elements */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        <div
          className="absolute rounded-full blur-[80px]"
          style={{
            width: 700,
            height: 700,
            top: -200,
            left: -200,
            background: "radial-gradient(circle, rgba(255,34,0,0.12) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute rounded-full blur-[80px]"
          style={{
            width: 600,
            height: 600,
            top: "40%",
            right: -150,
            background: "radial-gradient(circle, rgba(255,102,0,0.10) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute rounded-full blur-[80px]"
          style={{
            width: 500,
            height: 500,
            bottom: -100,
            left: "30%",
            background: "radial-gradient(circle, rgba(255,170,0,0.08) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Top Navigation */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4"
        style={{
          background: "rgba(12, 4, 0, 0.8)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,102,0,0.1)",
        }}
      >
        <div className="flex items-center gap-8">
          <span
            className="text-[22px] font-bold"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              background: LAVA_GRADIENT,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Anyway...
          </span>
          <div className="hidden md:flex items-center gap-6">
            {["Features", "Pricing", "Enterprise"].map((item) => (
              <span
                key={item}
                className="text-[15px] font-semibold cursor-pointer hover:opacity-80 transition-opacity"
                style={{ color: "#9a6040", fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            className="px-5 py-2 rounded-full text-[15px] font-semibold transition-all"
            style={{
              color: "#fff5ee",
              border: "1px solid rgba(255,102,0,0.25)",
              background: "transparent",
              fontFamily: "'Space Grotesk', sans-serif",
            }}
            onClick={() => navigate("/app")}
          >
            Login
          </button>
          <button
            className="px-5 py-2 rounded-full text-[15px] font-semibold transition-all hover:opacity-90"
            style={{
              background: LAVA_GRADIENT,
              color: "#2a0800",
              boxShadow: LAVA_GLOW,
              fontFamily: "'Space Grotesk', sans-serif",
            }}
            onClick={() => navigate("/app")}
          >
            Comenzar
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-16 px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Hero Text */}
          <div className="lg:col-span-7">
            {/* Powered by badge */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-8"
              style={{
                background: "#1c0800",
                border: "1px solid rgba(255,102,0,0.2)",
              }}
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{ background: "#ff5500", boxShadow: "0 0 8px #ff5500" }}
              />
              <span className="text-[11px] font-bold uppercase tracking-[1px]" style={{ color: "#c8956c" }}>
                Powered by Whisper AI
              </span>
            </div>

            <h1
              className="mb-6"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(48px, 7vw, 88px)",
                fontWeight: 700,
                lineHeight: 1.05,
                letterSpacing: "-3px",
                color: "#fff5ee",
              }}
            >
              Transcribe con
              <br />
              IA.
              <br />
              <span
                style={{
                  background: LAVA_GRADIENT,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Entiende mejor.
              </span>
            </h1>

            <p
              className="text-[18px] mb-8 max-w-lg"
              style={{ color: "#9a6040", lineHeight: 1.7 }}
            >
              Transforma tus audios en conocimiento accionable utilizando la potencia de Whisper AI
              y la inteligencia semántica de GPT-4. Precisión quirúrgica para mentes creativas.
            </p>

            <div className="flex items-center gap-4 flex-wrap">
              <button
                className="px-9 py-5 rounded-full text-[18px] font-bold transition-all hover:opacity-90 active:scale-95"
                style={{
                  background: LAVA_GRADIENT,
                  color: "#1a0400",
                  boxShadow: LAVA_GLOW,
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
                onClick={() => navigate("/app")}
              >
                Comenzar Ahora
              </button>
              <button
                className="flex items-center gap-3 px-7 py-5 rounded-full text-[16px] font-semibold transition-all hover:opacity-80"
                style={{
                  color: "#fff5ee",
                  border: "1px solid rgba(255,102,0,0.25)",
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d={svgPaths.p19e3b6c0} fill="#fff5ee" />
                </svg>
                Ver demo
              </button>
            </div>
          </div>

          {/* Right: UI Preview Card */}
          <div className="lg:col-span-5">
            <div
              className="relative rounded-2xl p-8"
              style={{
                background: "rgba(28,10,0,0.8)",
                border: "1px solid rgba(255,102,0,0.15)",
                backdropFilter: "blur(12px)",
              }}
            >
              {/* Ambient glow behind */}
              <div
                className="absolute inset-0 rounded-2xl blur-[50px] -z-10"
                style={{
                  background: "linear-gradient(135deg, rgba(255,34,0,0.15), rgba(255,102,0,0.15), rgba(255,170,0,0.10))",
                  margin: "-40px",
                }}
              />

              {/* Window Controls */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ background: "#ff2200" }} />
                  <div className="w-3 h-3 rounded-full" style={{ background: "#ff6600" }} />
                  <div className="w-3 h-3 rounded-full" style={{ background: "#ffaa00" }} />
                </div>
                <span
                  className="text-[12px]"
                  style={{ color: "#7a4a28", fontFamily: "'JetBrains Mono', monospace" }}
                >
                  Recording_042.wav
                </span>
              </div>

              {/* Waveform Lines */}
              <div className="flex flex-col gap-3 mb-5">
                <div className="h-2 rounded-full" style={{ background: "#250d00", width: "80%" }} />
                <div className="h-2 rounded-full" style={{ background: "#250d00", width: "100%" }} />
                <div
                  className="h-2 rounded-full"
                  style={{
                    background: "linear-gradient(90deg, rgba(255,34,0,0.6), rgba(255,102,0,0))",
                    width: "70%",
                  }}
                />
                <div className="h-2 rounded-full" style={{ background: "#250d00", width: "100%" }} />
                <div className="h-2 rounded-full" style={{ background: "#250d00", width: "60%" }} />
              </div>

              {/* Quote */}
              <div
                className="rounded-xl p-4"
                style={{
                  background: "rgba(40,12,0,0.6)",
                  border: "1px solid rgba(255,102,0,0.2)",
                }}
              >
                <p
                  className="text-[13px] italic"
                  style={{
                    color: "#ff6600",
                    fontFamily: "'Syne', sans-serif",
                    lineHeight: 1.6,
                  }}
                >
                  "La IA no solo transcribe, sintetiza la esencia del mensaje en tiempo real..."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-24 px-8 max-w-7xl mx-auto">
        <div className="mb-16">
          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(32px, 4vw, 48px)",
              fontWeight: 600,
              color: "#fff5ee",
            }}
          >
            Potencia tu flujo
          </h2>
          <p className="mt-3 text-[16px]" style={{ color: "#9a6040" }}>
            Diseñado para profesionales que no tienen tiempo que perder con herramientas genéricas.
          </p>
          <div
            className="mt-4 h-px"
            style={{ background: "linear-gradient(90deg, rgba(255,102,0,0.4), transparent)" }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Feature Card 1 */}
          <FeatureCard
            icon={<svg width="21" height="28.5" viewBox="0 0 21 28.5" fill="none"><path d={svgPaths.p17d1b080} fill="#ff4400" /></svg>}
            title="Transcripción Automática"
            desc="Motor Whisper optimizado para 99 lenguajes con reconocimiento de hablantes y marcas de tiempo precisas."
            accentColor="#ff2200"
          />
          {/* Feature Card 2 */}
          <FeatureCard
            icon={<svg width="31.5" height="31.5" viewBox="0 0 31.5 31.5" fill="none"><path d={svgPaths.p11397280} fill="#ff6600" /></svg>}
            title="Asistente IA"
            desc="Chatea con tus grabaciones. Resume, extrae puntos clave o genera borradores de correos basados en la reunión."
            accentColor="#ff6600"
          />
          {/* Feature Card 3 */}
          <FeatureCard
            icon={<svg width="31.275" height="27" viewBox="0 0 31.275 27" fill="none"><path d={svgPaths.p2ee3f980} fill="#ffaa00" /></svg>}
            title="Gestión Personal"
            desc="Bóveda cifrada para tus grabaciones con organización inteligente por carpetas y búsqueda semántica profunda."
            accentColor="#ffaa00"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-32 px-8">
        <div className="max-w-3xl mx-auto text-center relative">
          {/* Ambient glow */}
          <div
            className="absolute inset-0 -z-10 rounded-full blur-[80px]"
            style={{
              background: "rgba(255,102,0,0.08)",
              transform: "scaleX(2)",
            }}
          />
          <h2
            className="mb-8"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(36px, 5vw, 56px)",
              fontWeight: 700,
              color: "#fff5ee",
              letterSpacing: "-2px",
            }}
          >
            ¿Listo para el siguiente nivel?
          </h2>
          <button
            className="px-12 py-6 rounded-full text-[22px] font-bold transition-all hover:opacity-90 active:scale-95"
            style={{
              background: LAVA_GRADIENT,
              color: "#1a0400",
              boxShadow: "0 10px 40px rgba(255,102,0,0.4)",
              fontFamily: "'Space Grotesk', sans-serif",
            }}
            onClick={() => navigate("/app")}
          >
            Comenzar Gratis
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="relative z-10 py-12 px-8"
        style={{ borderTop: "1px solid rgba(255,102,0,0.1)" }}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-8">
          <div className="max-w-xs">
            <span
              className="text-[22px] font-bold block mb-3"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                background: LAVA_GRADIENT,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Anyway...
            </span>
            <p className="text-[13px]" style={{ color: "#7a4a28" }}>
              La plataforma de inteligencia auditiva definitiva para el profesional moderno.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-12">
            <div>
              <h4
                className="text-[13px] font-bold mb-4 uppercase tracking-wider"
                style={{ color: "#c8956c" }}
              >
                Plataforma
              </h4>
              {["Características", "Seguridad", "API"].map((item) => (
                <p key={item} className="text-[13px] mb-2 cursor-pointer hover:opacity-80" style={{ color: "#7a4a28" }}>
                  {item}
                </p>
              ))}
            </div>
            <div>
              <h4
                className="text-[13px] font-bold mb-4 uppercase tracking-wider"
                style={{ color: "#c8956c" }}
              >
                Legal
              </h4>
              {["Privacidad", "Términos", "Cookies"].map((item) => (
                <p key={item} className="text-[13px] mb-2 cursor-pointer hover:opacity-80" style={{ color: "#7a4a28" }}>
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div
          className="max-w-7xl mx-auto mt-8 pt-6 flex items-center justify-between"
          style={{ borderTop: "1px solid rgba(255,102,0,0.08)" }}
        >
          <p className="text-[11px]" style={{ color: "#5a3010" }}>
            © 2024 Anyway... Inc. Todos los derechos reservados.
          </p>
          <p className="text-[11px] font-bold uppercase tracking-widest" style={{ color: "#5a3010" }}>
            Octavo Hermano del Aldraverse
          </p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  desc,
  accentColor,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  accentColor: string;
}) {
  return (
    <div
      className="relative rounded-xl p-8 group overflow-hidden"
      style={{
        background: "#180800",
        border: `1px solid rgba(255,102,0,0.12)`,
        borderTop: `2px solid ${accentColor}`,
      }}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `linear-gradient(180deg, ${accentColor}08 0%, transparent 100%)`,
        }}
      />
      <div className="relative">
        <div className="mb-4">{icon}</div>
        <h3
          className="text-[20px] font-bold mb-3"
          style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#fff5ee" }}
        >
          {title}
        </h3>
        <p className="text-[14px] leading-relaxed" style={{ color: "#9a6040" }}>
          {desc}
        </p>
      </div>
    </div>
  );
}
