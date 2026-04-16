import { ArrowLeft, Share2, Download, MoreVertical, PlayCircle, Volume2, FastForward, CheckCircle2, Zap } from 'lucide-react';

interface TranscriptionDetailProps {
  onBack: () => void;
}

export function TranscriptionDetail({ onBack }: TranscriptionDetailProps) {
  return (
    <div className="flex flex-col h-full -m-8 lg:-m-12">
      {/* Header */}
      <header className="h-20 px-8 flex items-center justify-between z-10 border-b border-outline-variant/10 bg-surface-container-low/50 backdrop-blur-md">
        <div className="flex items-center gap-6">
          <button onClick={onBack} className="text-on-surface-variant hover:text-white transition-colors p-2 rounded-full hover:bg-surface-container-high">
            <ArrowLeft size={24} />
          </button>
          <div className="flex flex-col">
            <h1 className="font-editorial text-2xl font-bold tracking-tight text-white leading-none">Quarterly Product Strategy Deep Dive</h1>
            <span className="text-xs font-mono text-primary uppercase tracking-[0.2em] mt-1">ID: TR-8829-AS</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-surface-container-high rounded-full p-1 border border-outline-variant/20">
            <button className="p-2 text-on-surface-variant hover:text-white hover:bg-surface-bright rounded-full transition-all">
              <Share2 size={18} />
            </button>
            <button className="p-2 text-on-surface-variant hover:text-white hover:bg-surface-bright rounded-full transition-all">
              <Download size={18} />
            </button>
            <button className="p-2 text-on-surface-variant hover:text-white hover:bg-surface-bright rounded-full transition-all">
              <MoreVertical size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Metadata Bar */}
      <div className="bg-surface-container px-10 py-4 flex items-center gap-12 border-b border-outline-variant/10">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-secondary shadow-[0_0_10px_rgba(210,119,255,0.8)]"></div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold text-outline tracking-widest">Source</span>
            <span className="text-sm font-medium text-on-surface">Zoom Meeting (Live)</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold text-outline tracking-widest">Date</span>
            <span className="text-sm font-medium text-on-surface">Oct 24, 2023</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold text-outline tracking-widest">Duration</span>
            <span className="text-sm font-medium text-on-surface">48m 12s</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold text-outline tracking-widest">Speakers</span>
            <span className="text-sm font-medium text-on-surface">4 Identified</span>
          </div>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* Transcription Area */}
        <section className="w-3/5 p-10 overflow-y-auto custom-scrollbar bg-surface-dim relative">
          <div className="max-w-3xl mx-auto space-y-12 pb-24">
            
            <div className="group relative">
              <div className="absolute -left-16 top-0 font-mono text-xs text-primary/40 group-hover:text-primary transition-colors">[00:00:00]</div>
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-bold text-secondary uppercase tracking-widest">Speaker A (Moderator)</span>
                <p className="font-mono text-lg text-white leading-relaxed">
                  Alright, welcome everyone to the Q4 Product Strategy session. Today we're focusing on the "Aurora" integration and how we can scale our transcription models to handle high-fidelity audio streams.
                </p>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute -left-16 top-0 font-mono text-xs text-primary/40 group-hover:text-primary transition-colors">[00:00:15]</div>
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-bold text-tertiary uppercase tracking-widest">Speaker B (Engineering)</span>
                <p className="font-mono text-lg text-white leading-relaxed">
                  The primary challenge we're seeing is the latency in the diarization layer. When we have more than three speakers, the accuracy drops by about 12% in the first minute while the model builds the acoustic profile.
                </p>
              </div>
            </div>

            <div className="group relative p-6 bg-surface-container/30 rounded-2xl border-l-4 border-primary">
              <div className="absolute -left-16 top-6 font-mono text-xs text-primary">[00:02:45]</div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Speaker D (Product)</span>
                  <span className="flex items-center gap-1 text-[10px] font-mono text-secondary">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span> SPEAKING
                  </span>
                </div>
                <p className="font-mono text-lg text-white leading-relaxed">
                  Let's look at the roadmap for the next sprint. We need to prioritize the "Aurora Visual" implementation. The lava-neon aesthetic isn't just for looks; it's meant to highlight key conversational triggers.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* AI Side Panel */}
        <aside className="w-2/5 bg-surface-container-high border-l border-outline-variant/10 flex flex-col">
          {/* AI Tabs */}
          <div className="flex p-4 gap-2 border-b border-outline-variant/10">
            <button className="flex-1 py-3 px-2 rounded-xl bg-surface-bright text-primary font-bold text-xs font-headline tracking-wide border border-primary/20">
              RESUMEN
            </button>
            <button className="flex-1 py-3 px-2 rounded-xl text-slate-400 hover:text-white hover:bg-surface-container transition-colors text-xs font-headline tracking-wide">
              PUNTOS CLAVE
            </button>
            <button className="flex-1 py-3 px-2 rounded-xl text-slate-400 hover:text-white hover:bg-surface-container transition-colors text-xs font-headline tracking-wide">
              TRADUCIR
            </button>
          </div>

          {/* AI Content */}
          <div className="flex-1 p-8 overflow-y-auto custom-scrollbar flex flex-col gap-8">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-editorial text-xl font-bold text-white">Resumen Inteligente</h3>
                <span className="px-2 py-1 bg-secondary-container/20 text-secondary text-[10px] font-bold rounded-md border border-secondary/20">GPT-4 PRO</span>
              </div>
              <div className="bg-surface-container/50 p-6 rounded-2xl border border-outline-variant/10 space-y-4">
                <p className="text-sm text-on-surface-variant leading-relaxed font-sans">
                  La reunión se centró en la integración del sistema <span className="text-white font-bold">"Aurora"</span> y los desafíos técnicos asociados con la latencia en la diarización de múltiples hablantes. 
                </p>
                <p className="text-sm text-on-surface-variant leading-relaxed font-sans">
                  El equipo de ingeniería reportó una caída del 12% en la precisión inicial, la cual diseño ha mitigado mediante una interfaz de <span className="text-secondary">"shadow text"</span>. La prioridad actual es el despliegue de la estética "Aurora Visual".
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-[10px] uppercase font-bold text-outline tracking-widest">Siguientes Pasos</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm group cursor-pointer">
                  <CheckCircle2 className="text-primary mt-0.5 group-hover:scale-110 transition-transform" size={18} />
                  <span className="text-on-surface group-hover:text-white transition-colors">Optimizar capa de diarización para +3 hablantes.</span>
                </li>
                <li className="flex items-start gap-3 text-sm group cursor-pointer">
                  <CheckCircle2 className="text-primary mt-0.5 group-hover:scale-110 transition-transform" size={18} />
                  <span className="text-on-surface group-hover:text-white transition-colors">Finalizar roadmap de "Aurora Visual".</span>
                </li>
              </ul>
            </div>

            <div className="relative h-48 rounded-3xl overflow-hidden group mt-4">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDI_2OeWXBgODv50RvsYkFKUYiWSadJyrra_xUTaJ58RmOsGoh-iz0-uGTFtd6WtddyJtKAYMGUA8cuYBFhfipNLR9Ns7YpHTN02M3EhFXXSXcFynOIDHmVsiO7Ayc-lIaLy6NfPSvx4BNVlFVFYEXsBkc3-cfZd7IGFX2WgQrNkNuLFBP3CTghJppKfgJSp88E8bMBRwmW7HIuQyNU4Wjk-jGK60OjGBOb9a4gXYqPtWfypLMaUym1NqRUqSS6ddeqaRvvUNw6gmJw" 
                alt="AI Analysis" 
                className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-high to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-[#00f5ff] animate-pulse"></span>
                  <span className="text-[10px] font-bold text-[#00f5ff] uppercase tracking-widest">Análisis en Vivo</span>
                </div>
                <p className="text-xs text-white/80 font-sans">Detectando patrones de sentimiento y temas clave...</p>
              </div>
            </div>

            <div className="mt-auto pt-8">
              <button className="w-full lava-gradient h-14 rounded-2xl flex items-center justify-center gap-3 text-on-primary font-bold shadow-[0_10px_40px_rgba(255,138,163,0.15)] hover:scale-[1.02] active:scale-95 transition-all">
                <Zap size={20} className="fill-current" />
                Generar Nuevo Resumen
              </button>
            </div>
          </div>
        </aside>
      </div>

      {/* Audio Player Overlay */}
      <footer className="h-20 bg-surface-container px-8 flex items-center justify-between border-t border-outline-variant/10 z-20">
        <div className="flex items-center gap-4 w-1/4">
          <button className="p-2 text-white hover:bg-surface-bright rounded-full transition-colors">
            <PlayCircle size={32} />
          </button>
          <span className="text-xs font-mono text-white">02:45 / 48:12</span>
        </div>
        
        <div className="flex-1 max-w-2xl px-8">
          <div className="relative h-1.5 bg-surface-container-highest rounded-full overflow-hidden cursor-pointer">
            <div className="absolute top-0 left-0 h-full w-[15%] lava-gradient"></div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-6 w-1/4">
          <div className="flex items-center gap-2">
            <Volume2 className="text-on-surface-variant" size={20} />
            <div className="w-20 h-1 bg-surface-container-highest rounded-full overflow-hidden">
              <div className="h-full w-3/4 bg-on-surface-variant"></div>
            </div>
          </div>
          <button className="flex items-center gap-2 bg-surface-bright px-3 py-1.5 rounded-lg text-xs font-bold text-white border border-outline-variant/20 hover:border-primary/50 transition-colors">
            <FastForward size={14} />
            1.25x
          </button>
        </div>
      </footer>
    </div>
  );
}
