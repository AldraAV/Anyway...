import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { TranscriptionDetail } from './components/TranscriptionDetail';
import { Settings } from './components/Settings';
import { NewTranscriptionModal } from './components/NewTranscriptionModal';
import { ViewState } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-on-surface font-sans flex">
      {/* Ambient Glows */}
      <div className="aurora-pulse top-[-200px] left-[-200px] w-[600px] h-[600px] bg-primary/10"></div>
      <div className="aurora-pulse bottom-[-200px] right-[-100px] w-[600px] h-[600px] bg-tertiary/10"></div>

      <Sidebar 
        currentView={currentView} 
        onNavigate={setCurrentView} 
        onNewTranscription={() => setIsModalOpen(true)} 
      />

      <main className="flex-1 md:ml-[280px] min-h-screen flex flex-col p-8 lg:p-12 relative z-10">
        {currentView === 'dashboard' && (
          <Dashboard onNewTranscription={() => setIsModalOpen(true)} />
        )}
        {currentView === 'detail' && (
          <TranscriptionDetail onBack={() => setCurrentView('dashboard')} />
        )}
        {currentView === 'settings' && (
          <Settings />
        )}
      </main>

      <NewTranscriptionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}
