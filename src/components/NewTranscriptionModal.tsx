import { useState, useEffect } from 'react';
import { X, CheckCircle2, Globe, FileText, Zap, Loader2 } from 'lucide-react';

interface NewTranscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NewTranscriptionModal({ isOpen, onClose }: NewTranscriptionModalProps) {
  const [url, setUrl] = useState('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
  const [isDetecting, setIsDetecting] = useState(false);
  const [detectedLanguage, setDetectedLanguage] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    if (!url || url.trim() === '') {
      setDetectedLanguage(null);
      return;
    }

    setIsDetecting(true);
    const timer = setTimeout(() => {
      try {
        const parsedUrl = new URL(url);
        if (parsedUrl.hostname.includes('youtube.com') || parsedUrl.hostname.includes('youtu.be')) {
          if (url.includes('dQw4w9WgXcQ')) {
            setDetectedLanguage('Inglés (Detectado)');
          } else if (url.toLowerCase().includes('es') || url.toLowerCase().includes('latam')) {
            setDetectedLanguage('Español (Detectado)');
          } else {
            // Default random detection for demo purposes
            setDetectedLanguage('Español (Detectado)');
          }
        } else if (parsedUrl.hostname.includes('vimeo.com')) {
          setDetectedLanguage('Francés (Detectado)');
        } else if (parsedUrl.hostname.includes('gmetrix')) {
          setDetectedLanguage('Inglés (Detectado)');
        } else {
          setDetectedLanguage(null);
        }
      } catch (e) {
        // Invalid URL
        setDetectedLanguage(null);
      }
      setIsDetecting(false);
    }, 1200); // Simulate network delay

    return () => clearTimeout(timer);
  }, [url, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
      {/* Modal Window */}
      <div className="w-full max-w-2xl bg-surface-container-high border border-outline-variant/30 rounded-[24px] shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden relative">
        
        {/* Modal Header */}
        <div className="px-8 pt-8 pb-4 flex justify-between items-start">
          <div>
            <h2 className="font-headline text-3xl font-bold tracking-tight text-white mb-2">Nueva Transcripción</h2>
            <p className="text-on-surface-variant text-sm font-sans">Convierte audio y video en texto preciso en segundos.</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 transition-colors text-on-surface-variant hover:text-white"
          >
            <X size={24} />
          </button>
        </div>

        {/* Tabs Navigation */}
        <div className="px-8 border-b border-outline-variant/20 flex gap-8">
          <button className="py-4 font-headline font-semibold text-primary relative group">
            URL
            <div className="absolute bottom-0 left-0 w-full h-[3px] lava-gradient rounded-t-full"></div>
          </button>
          <button className="py-4 font-headline font-semibold text-on-surface-variant hover:text-on-surface transition-colors">
            Archivo
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-8 space-y-8 relative z-10">
          
          {/* URL Input Group */}
          <div className="space-y-3">
            <label className="text-sm font-sans font-medium text-secondary-fixed/80 px-1">YouTube, Vimeo o GMetrix URL</label>
            <div className="relative group">
              <input 
                type="text" 
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
                className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-xl px-4 py-4 text-on-surface placeholder:text-outline focus:outline-none focus:border-secondary/50 transition-all font-sans"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                {isDetecting ? (
                  <Loader2 className="text-secondary animate-spin" size={20} />
                ) : url.trim() !== '' ? (
                  <CheckCircle2 className="text-[#00f5ff] fill-current" size={20} />
                ) : null}
              </div>
            </div>
            <p className="text-[11px] text-on-surface-variant px-1 font-sans">Se admiten enlaces públicos y privados con acceso compartido.</p>
          </div>

          {/* Bento Style Options Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/10 hover:bg-surface-container transition-colors cursor-pointer group">
              <div className="flex items-center gap-3 mb-2">
                <Globe className="text-secondary" size={20} />
                <span className="font-headline font-bold text-sm text-white">Idioma</span>
              </div>
              <p className="text-xs text-on-surface-variant font-sans transition-colors duration-300">
                {isDetecting ? (
                  <span className="text-secondary animate-pulse">Detectando idioma...</span>
                ) : detectedLanguage ? (
                  <span className="text-[#00f5ff] font-medium">{detectedLanguage}</span>
                ) : (
                  "Auto-detección habilitada (ES, EN, FR, DE)"
                )}
              </p>
            </div>
            
            <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/10 hover:bg-surface-container transition-colors cursor-pointer group">
              <div className="flex items-center gap-3 mb-2">
                <FileText className="text-tertiary" size={20} />
                <span className="font-headline font-bold text-sm text-white">Resumen AI</span>
              </div>
              <p className="text-xs text-on-surface-variant font-sans">Generar puntos clave automáticamente</p>
            </div>
          </div>

          {/* Primary CTA */}
          <div className="pt-4">
            <button 
              onClick={onClose}
              disabled={isDetecting}
              className={`w-full py-4 rounded-full font-headline font-bold text-on-primary-container lava-gradient neon-glow-primary active:scale-95 transition-all flex items-center justify-center gap-3 ${isDetecting ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              <Zap size={20} className="fill-current" />
              Transcribir Ahora
            </button>
            <p className="text-center text-[10px] uppercase tracking-widest text-outline mt-6 font-medium font-sans">
              Consumo estimado: 12 Créditos Nebula
            </p>
          </div>
        </div>

        {/* Visual Flare */}
        <div className="absolute bottom-0 right-0 w-48 h-48 lava-gradient opacity-10 rounded-tl-full -mr-16 -mb-16 blur-2xl pointer-events-none"></div>
      </div>
    </div>
  );
}
