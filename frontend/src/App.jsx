import { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ChatPanel from './pages/ChatPanel';
import VoicePanel from './pages/VoicePanel';
import VisionPanel from './pages/VisionPanel';
import Toast from './components/Toast';
import './App.css';

export const API = 'http://localhost:8000';

export default function App() {
  const [activePanel, setActivePanel] = useState('chat');
  const [toast, setToast] = useState({ msg: '', type: '', visible: false });

  const showToast = (msg, type = '') => {
    setToast({ msg, type, visible: true });
    setTimeout(() => setToast(t => ({ ...t, visible: false })), 3200);
  };

  return (
    <div className="app-root">
      <div className="ambient ambient-1" />
      <div className="ambient ambient-2" />
      <Header />
      <div className="layout">
        <Sidebar active={activePanel} onSelect={setActivePanel} />
        <main className="main">
          {activePanel === 'chat'   && <ChatPanel  showToast={showToast} />}
          {activePanel === 'voice'  && <VoicePanel showToast={showToast} />}
          {activePanel === 'vision' && <VisionPanel showToast={showToast} />}
        </main>
      </div>
      <Toast msg={toast.msg} type={toast.type} visible={toast.visible} />
    </div>
  );
}
