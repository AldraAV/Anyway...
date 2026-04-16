import { Search, PlusCircle, Timer, BarChart2, Rocket, MoreVertical, ArrowRight } from 'lucide-react';
import { Transcription } from '../types';

interface DashboardProps {
  onNewTranscription: () => void;
}

const recentTranscriptions: Transcription[] = [
  { id: '1', title: 'Entrevista de Diseño UX/UI', source: 'YouTube', date: '12 May 2024', language: 'Español', status: 'completed' },
  { id: '2', title: 'Daily Standup 15-05', source: 'GMetrix', date: '15 May 2024', language: 'Inglés', status: 'completed' },
  { id: '3', title: 'Webinar: IA en el Workflow', source: 'YouTube', date: '18 May 2024', language: 'Español', status: 'completed' },
  { id: '4', title: 'Podcast: El futuro de la música', source: 'GMetrix', date: '20 May 2024', language: 'Español', status: 'completed' },
];

export function Dashboard({ onNewTranscription }: DashboardProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-bold font-headline tracking-tight text-on-surface">Dashboard</h1>
          <p className="text-on-surface-variant font-sans mt-1">Gestiona tus transcripciones y automatizaciones</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-outline" size={20} />
            <input 
              type="text" 
              placeholder="Buscar transcripciones..." 
              className="bg-surface-container-high border-none rounded-full pl-12 pr-6 py-3 w-full md:w-64 text-on-surface focus:ring-1 focus:ring-primary/50 transition-all font-sans text-sm"
            />
          </div>
          <button 
            onClick={onNewTranscription}
            className="lava-gradient px-6 py-3 rounded-full text-on-primary font-bold flex items-center gap-2 hover:opacity-90 active:scale-95 transition-all neon-glow-primary"
          >
            <PlusCircle size={20} />
            <span>Nueva Transcripción</span>
          </button>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="glass-panel p-6 rounded-xl ghost-border flex items-start justify-between group hover:bg-surface-container-high transition-colors">
          <div>
            <p className="text-on-surface-variant text-sm font-sans uppercase tracking-widest font-bold">Total Horas</p>
            <h3 className="text-3xl font-bold font-headline mt-2 text-white group-hover:text-primary transition-colors">124.5</h3>
          </div>
          <div className="bg-primary/10 p-3 rounded-lg text-primary">
            <Timer size={24} />
          </div>
        </div>
        
        <div className="glass-panel p-6 rounded-xl ghost-border flex items-start justify-between group hover:bg-surface-container-high transition-colors">
          <div>
            <p className="text-on-surface-variant text-sm font-sans uppercase tracking-widest font-bold">Precisión Promedio</p>
            <h3 className="text-3xl font-bold font-headline mt-2 text-white group-hover:text-secondary transition-colors">98.2%</h3>
          </div>
          <div className="bg-secondary/10 p-3 rounded-lg text-secondary">
            <BarChart2 size={24} />
          </div>
        </div>

        <div className="glass-panel p-6 rounded-xl ghost-border flex items-start justify-between group hover:bg-surface-container-high transition-colors">
          <div>
            <p className="text-on-surface-variant text-sm font-sans uppercase tracking-widest font-bold">Proyectos Activos</p>
            <h3 className="text-3xl font-bold font-headline mt-2 text-white group-hover:text-tertiary transition-colors">12</h3>
          </div>
          <div className="bg-tertiary/10 p-3 rounded-lg text-tertiary">
            <Rocket size={24} />
          </div>
        </div>
      </div>

      {/* Recent Transcriptions */}
      <section className="flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold font-editorial text-on-surface">Recientes</h2>
          <button className="text-secondary text-sm font-bold flex items-center gap-1 hover:underline underline-offset-4">
            Ver todas <ArrowRight size={16} />
          </button>
        </div>
        
        <div className="bg-surface-container rounded-xl overflow-hidden ghost-border">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-surface-container-high/50 border-b border-outline-variant/20">
                  <th className="px-6 py-4 font-sans text-xs font-bold uppercase tracking-widest text-outline">Título</th>
                  <th className="px-6 py-4 font-sans text-xs font-bold uppercase tracking-widest text-outline">Fuente</th>
                  <th className="px-6 py-4 font-sans text-xs font-bold uppercase tracking-widest text-outline">Fecha</th>
                  <th className="px-6 py-4 font-sans text-xs font-bold uppercase tracking-widest text-outline">Idioma</th>
                  <th className="px-6 py-4 font-sans text-xs font-bold uppercase tracking-widest text-outline text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {recentTranscriptions.map((t, i) => (
                  <tr key={t.id} className="hover:bg-surface-bright transition-colors group cursor-pointer">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${i % 3 === 0 ? 'bg-primary' : i % 3 === 1 ? 'bg-secondary' : 'bg-tertiary'}`}></div>
                        <span className="font-medium text-on-surface group-hover:text-white">{t.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-tight border ${
                        t.source === 'YouTube' 
                          ? 'bg-[#00f5ff]/10 text-[#00f5ff] border-[#00f5ff]/20' 
                          : 'bg-primary/10 text-primary border-primary/20'
                      }`}>
                        {t.source}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-on-surface-variant text-sm font-mono">{t.date}</td>
                    <td className="px-6 py-5">
                      <span className="text-sm text-on-surface-variant">{t.language}</span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <button className="text-outline hover:text-primary transition-colors p-2 rounded-full hover:bg-surface-container-high">
                        <MoreVertical size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
