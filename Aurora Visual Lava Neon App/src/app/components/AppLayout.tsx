import { Outlet, NavLink, useNavigate } from "react-router";
import imgAvatar from "figma:asset/f08a19e52d18c617a7c0318de703c624cf3c4c08.png";
import svgDashboard from "../../imports/Dashboard/svg-aftu5lrtal";

export function AppLayout() {
  const navigate = useNavigate();

  return (
    <div
      className="flex h-screen w-screen overflow-hidden"
      style={{ background: "#0c0400", fontFamily: "'Inter', sans-serif" }}
    >
      {/* Aurora Background Glows */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        <div
          className="absolute rounded-full blur-[120px] opacity-10"
          style={{
            width: 600,
            height: 600,
            top: -100,
            left: -150,
            background: "radial-gradient(circle, #ff2200 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute rounded-full blur-[100px] opacity-8"
          style={{
            width: 500,
            height: 500,
            bottom: 0,
            right: -100,
            background: "radial-gradient(circle, #ff6600 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Sidebar */}
      <aside
        className="relative z-10 flex flex-col w-[220px] shrink-0 h-full"
        style={{
          background: "#120600",
          borderRight: "1px solid rgba(255,102,0,0.12)",
        }}
      >
        {/* Brand Logo */}
        <div className="px-8 py-10">
          <span
            className="text-[20px] font-bold"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              background: "linear-gradient(135deg, #ff2200, #ff6600, #ffaa00)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Anyway...
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-1 px-2 flex-1">
          <NavLink
            to="/app"
            end
            children={({ isActive }) => (
              <div
                className="flex items-center gap-4 px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 relative"
                style={{
                  background: isActive
                    ? "linear-gradient(90deg, rgba(255,34,0,0.18) 0%, rgba(255,102,0,0.06) 100%)"
                    : "transparent",
                  borderLeft: isActive ? "3px solid #ff2200" : "3px solid transparent",
                }}
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d={svgDashboard.p191dcc80} fill={isActive ? "#ff4400" : "#7a4a28"} />
                </svg>
                <span
                  className="text-[14px] font-medium"
                  style={{ color: isActive ? "#ff4400" : "#9a6040" }}
                >
                  Dashboard
                </span>
              </div>
            )}
          />

          <NavLink
            to="/app"
            onClick={(e) => e.preventDefault()}
            children={() => (
              <div
                className="flex items-center gap-4 px-4 py-3 rounded-lg cursor-pointer transition-all duration-200"
                style={{ borderLeft: "3px solid transparent" }}
              >
                <svg width="22" height="16" viewBox="0 0 21.5 16" fill="none">
                  <path d={svgDashboard.p34cd900} fill="#7a4a28" />
                </svg>
                <span className="text-[14px] font-medium" style={{ color: "#9a6040" }}>
                  Transcripciones
                </span>
              </div>
            )}
          />

          <NavLink
            to="/app/settings"
            children={({ isActive }) => (
              <div
                className="flex items-center gap-4 px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 relative"
                style={{
                  background: isActive
                    ? "linear-gradient(90deg, rgba(255,34,0,0.18) 0%, rgba(255,102,0,0.06) 100%)"
                    : "transparent",
                  borderLeft: isActive ? "3px solid #ff2200" : "3px solid transparent",
                }}
              >
                <svg width="20" height="20" viewBox="0 0 20.1 20" fill="none">
                  <path d={svgDashboard.p3cdadd00} fill={isActive ? "#ff4400" : "#7a4a28"} />
                </svg>
                <span
                  className="text-[14px] font-medium"
                  style={{ color: isActive ? "#ff4400" : "#9a6040" }}
                >
                  Configuración
                </span>
              </div>
            )}
          />
        </nav>

        {/* User Profile */}
        <div
          className="mx-4 mb-6 p-3 rounded-xl flex items-center gap-3"
          style={{ background: "rgba(255,102,0,0.06)", border: "1px solid rgba(255,102,0,0.12)" }}
        >
          <div
            className="w-9 h-9 rounded-full overflow-hidden shrink-0"
            style={{ border: "2px solid #ff4400" }}
          >
            <img src={imgAvatar} alt="avatar" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <p
              className="text-[13px] font-semibold truncate"
              style={{ color: "#fff5ee", fontFamily: "'Inter', sans-serif" }}
            >
              Aurora Ethereal
            </p>
            <p className="text-[11px]" style={{ color: "#7a4a28" }}>
              Pro Plan
            </p>
          </div>
          <button
            onClick={() => navigate("/")}
            className="shrink-0 opacity-60 hover:opacity-100 transition-opacity"
          >
            <svg width="14" height="14" viewBox="0 0 13.5 13.5" fill="none">
              <path d={svgDashboard.p33af4a10} fill="#c8956c" />
            </svg>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="relative z-10 flex-1 overflow-y-auto h-full">
        <Outlet />
      </main>
    </div>
  );
}