import { Lock, Cloud, CheckSquare, Square, Info } from 'lucide-react';

export function Settings() {
  return (
    <div className="max-w-4xl relative">
      {/* Aurora Background Elements */}
      <div className="aurora-pulse top-[-10%] right-[-5%] w-[600px] h-[600px] bg-primary/10"></div>
      <div className="aurora-pulse bottom-[-10%] left-[5%] w-[400px] h-[400px] bg-secondary/10 opacity-50"></div>

      <header className="mb-12">
        <h1 className="font-headline text-5xl font-bold tracking-tight mb-2 text-white">Settings</h1>
        <p className="font-sans text-on-surface-variant max-w-md">Manage your cosmic workspace, personal preferences, and subscription status.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Profile & Storage */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          
          {/* Profile Card */}
          <section className="glass-panel p-8 rounded-xl ghost-border relative overflow-hidden group">
            <div className="flex items-start justify-between mb-8">
              <div>
                <h2 className="font-editorial text-2xl font-bold mb-1 text-white">Profile</h2>
                <p className="text-sm text-on-surface-variant">Update your public identity</p>
              </div>
              <div className="w-24 h-24 rounded-full p-1 lava-gradient">
                <div className="w-full h-full rounded-full bg-surface-container overflow-hidden">
                  <img 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMsY3gy-Mf4C4snSrPrDA6ysnfMeUv33X2hjb2gI20vZAZldwtNVh-HH9Ubhzu57M83VtgGlra9XDp-aF2K_qRqYHxGcBld_4ENwmSMxf8_tL2YFSzbYNEaRm1QFODn0Ysgh8nYB6XpUAcsFzPf8LXZmFafETU9axW88ACIy3Wy6ouuxzEavU9ZDDwF-mk2QnK4GH4SXLpNC43obSgDpNXql3hwfUKtzS8d-Nn3BhVIJFIb8Ld40otGj_Js8HbQaYqpykwwPb2jI_8" 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Name</label>
                <input 
                  type="text" 
                  defaultValue="Aurora Ethereal"
                  className="w-full bg-surface-container-lowest border-none rounded-lg p-4 text-on-surface focus:ring-1 focus:ring-secondary/50 font-sans outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Email</label>
                <div className="w-full bg-surface-container-low/50 border-none rounded-lg p-4 text-on-surface-variant font-mono flex justify-between items-center">
                  <span>aurora@nebula.io</span>
                  <Lock size={16} />
                </div>
              </div>
              <div className="pt-4 flex justify-end">
                <button className="lava-gradient text-on-primary font-headline font-bold py-3 px-8 rounded-full hover:scale-105 active:scale-95 transition-all neon-glow-primary">
                  Guardar
                </button>
              </div>
            </div>
          </section>

          {/* Storage Card */}
          <section className="bg-surface-container-high p-8 rounded-xl relative overflow-hidden ghost-border">
            <div className="flex items-center gap-3 mb-6">
              <Cloud className="text-secondary" size={24} />
              <h2 className="font-editorial text-xl font-bold text-white">Storage</h2>
            </div>
            <div className="mb-8">
              <div className="flex justify-between items-end mb-3">
                <span className="text-3xl font-headline font-bold text-white">
                  3.5 <span className="text-sm font-normal text-on-surface-variant uppercase">GB Used</span>
                </span>
                <span className="text-sm text-on-surface-variant">of 10 GB</span>
              </div>
              <div className="h-3 w-full bg-surface-container-lowest rounded-full overflow-hidden">
                <div className="h-full w-[35%] lava-gradient rounded-full"></div>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-surface-bright/30 rounded-xl">
              <p className="text-sm text-on-surface-variant">Need more space for high-fidelity recordings?</p>
              <button className="text-secondary font-bold text-sm hover:underline decoration-secondary underline-offset-4">
                Upgrade
              </button>
            </div>
          </section>

        </div>

        {/* Right Column: Preferences */}
        <div className="lg:col-span-5">
          <section className="glass-panel p-8 rounded-xl ghost-border h-full">
            <h2 className="font-editorial text-2xl font-bold mb-8 text-white">Preferences</h2>
            
            <div className="space-y-10">
              {/* Language */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Language</label>
                <select className="w-full bg-surface-container-lowest border-none rounded-lg p-4 text-on-surface focus:ring-1 focus:ring-secondary/50 appearance-none cursor-pointer outline-none">
                  <option>English (Universal)</option>
                  <option>Español (Latino)</option>
                  <option>Français (Cosmique)</option>
                </select>
              </div>

              {/* Dark Mode Toggle */}
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-bold text-white">Dark Mode</span>
                  <span className="text-xs text-on-surface-variant">Atmospheric observatory theme</span>
                </div>
                <button className="w-14 h-7 bg-secondary rounded-full relative p-1 flex items-center justify-end transition-all">
                  <div className="w-5 h-5 bg-on-secondary rounded-full shadow-lg"></div>
                </button>
              </div>

              {/* Notifications */}
              <div className="space-y-4">
                <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Notifications</label>
                
                <label className="flex items-center gap-4 group cursor-pointer">
                  <div className="text-secondary">
                    <CheckSquare size={24} className="fill-current text-secondary bg-surface-container-lowest rounded" />
                  </div>
                  <span className="text-sm text-on-surface group-hover:text-white transition-colors">Transcription completed</span>
                </label>
                
                <label className="flex items-center gap-4 group cursor-pointer">
                  <div className="text-outline">
                    <Square size={24} className="bg-surface-container-lowest rounded" />
                  </div>
                  <span className="text-sm text-on-surface group-hover:text-white transition-colors">Automation reports</span>
                </label>
                
                <label className="flex items-center gap-4 group cursor-pointer">
                  <div className="text-secondary">
                    <CheckSquare size={24} className="fill-current text-secondary bg-surface-container-lowest rounded" />
                  </div>
                  <span className="text-sm text-on-surface group-hover:text-white transition-colors">Security alerts</span>
                </label>
              </div>
            </div>

            <div className="mt-20 pt-8 border-t border-outline-variant/10">
              <div className="flex items-center gap-3 p-4 bg-[#00f5ff]/5 rounded-lg border border-[#00f5ff]/10">
                <Info className="text-[#00f5ff]" size={16} />
                <p className="text-xs text-[#00f5ff]/80">System is currently running on Node-Delta (Ultra Latency).</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
