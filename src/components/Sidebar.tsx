import { LayoutDashboard, FolderOpen, Settings, LogOut, Mic, Wand2, HelpCircle, Plus } from 'lucide-react';
import { ViewState } from '../types';

interface SidebarProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  onNewTranscription: () => void;
}

export function Sidebar({ currentView, onNavigate, onNewTranscription }: SidebarProps) {
  return (
    <aside className="fixed left-0 top-0 h-full w-[280px] z-40 bg-surface-container flex flex-col justify-between pb-8 font-sans text-sm font-medium hidden md:flex border-r border-outline-variant/10">
      <div>
        {/* Brand Logo */}
        <div className="px-8 py-10">
          <span className="text-2xl font-bold font-headline text-primary">AuraScribe</span>
        </div>

        {/* User Profile Mini */}
        <div className="px-6 mb-8">
          <div className="flex items-center gap-3 p-3 bg-surface-container-high rounded-xl border border-outline-variant/10">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuATLrr3EqJCFcAE3Jb20vlydJUx2Ek_2FNBTnineSs4-H2l7s0GxWJQXsnGU6NaiO7lfwNC1sF_Ez2E6VBTcljQ_07mtp1APFe_VTO580AdwrEMXTuLPxaWH1bVmf8vlqycfM2wHxPsDZyMN2pW5u_CcpGc0cmK63Cra6Q2XGvnQQvwt0Et3pqbUdZnRuEBS3SNa7Jn6yejc1ocNuVDUg1RJSvMSYe_1wgTizL1CF4-ho2YNBF_pAuiq0XdlX2rX94reN5ghlQqgVpW" 
              alt="Avatar" 
              className="w-10 h-10 rounded-lg object-cover"
            />
            <div className="flex flex-col">
              <span className="font-headline font-bold text-sm text-on-surface">Aurora Ethereal</span>
              <span className="text-[10px] uppercase tracking-wider text-primary font-bold">Pro Plan</span>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1">
          <button 
            onClick={() => onNavigate('dashboard')}
            className={`w-full flex items-center gap-4 py-3 px-6 transition-all duration-300 ${
              currentView === 'dashboard' 
                ? 'bg-gradient-to-r from-primary/20 to-transparent text-primary border-l-4 border-primary' 
                : 'text-slate-400 hover:bg-surface-container-high hover:text-white border-l-4 border-transparent'
            }`}
          >
            <LayoutDashboard size={20} className={currentView === 'dashboard' ? 'text-primary' : ''} />
            <span>Dashboard</span>
          </button>
          
          <button 
            onClick={() => onNavigate('detail')}
            className={`w-full flex items-center gap-4 py-3 px-6 transition-all duration-300 ${
              currentView === 'detail' 
                ? 'bg-gradient-to-r from-primary/20 to-transparent text-primary border-l-4 border-primary' 
                : 'text-slate-400 hover:bg-surface-container-high hover:text-white border-l-4 border-transparent'
            }`}
          >
            <Mic size={20} />
            <span>Recordings</span>
          </button>

          <button className="w-full flex items-center gap-4 text-slate-400 py-3 px-6 hover:bg-surface-container-high hover:text-white transition-all duration-300 border-l-4 border-transparent">
            <FolderOpen size={20} />
            <span>Library</span>
          </button>

          <button className="w-full flex items-center gap-4 text-slate-400 py-3 px-6 hover:bg-surface-container-high hover:text-white transition-all duration-300 border-l-4 border-transparent">
            <Wand2 size={20} />
            <span>Automation</span>
          </button>

          <button 
            onClick={() => onNavigate('settings')}
            className={`w-full flex items-center gap-4 py-3 px-6 transition-all duration-300 ${
              currentView === 'settings' 
                ? 'bg-gradient-to-r from-primary/20 to-transparent text-primary border-l-4 border-primary' 
                : 'text-slate-400 hover:bg-surface-container-high hover:text-white border-l-4 border-transparent'
            }`}
          >
            <Settings size={20} />
            <span>Settings</span>
          </button>
        </nav>
      </div>

      {/* Bottom Actions */}
      <div className="px-6 space-y-4">
        <button 
          onClick={onNewTranscription}
          className="w-full lava-gradient text-on-primary font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all neon-glow-primary"
        >
          <Plus size={18} />
          <span>New Transcription</span>
        </button>
        
        <div className="pt-4 space-y-1 border-t border-outline-variant/10">
          <button className="w-full flex items-center gap-4 text-slate-400 py-2 px-6 hover:text-white text-sm font-medium transition-colors">
            <HelpCircle size={18} />
            <span>Support</span>
          </button>
          <button className="w-full flex items-center gap-4 text-slate-400 py-2 px-6 hover:text-white text-sm font-medium transition-colors">
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
