import { useState, useRef, useEffect } from 'react';
import { API } from '../App';
import styles from './VoicePanel.module.css';

export default function VoicePanel({ showToast }) {
  const [recording, setRecording] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('Click the mic to start speaking');
  const [messages, setMessages] = useState([]);

  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const streamRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    return () => {
      if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop());
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      chunksRef.current = [];

      const mr = new MediaRecorder(stream, { mimeType: 'audio/webm' });
      mr.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      mr.onstop = async () => {
        stream.getTracks().forEach(t => t.stop());
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        await transcribeAudio(blob);
      };

      mr.start();
      mediaRecorderRef.current = mr;
      setRecording(true);
      setStatus('Recording… click again to stop');
    } catch {
      showToast('Microphone access denied', 'error');
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
    setStatus('Transcribing…');
  };

  const toggleRecording = () => {
    if (recording) stopRecording();
    else startRecording();
  };

  const transcribeAudio = async (blob) => {
    setLoading(true);
    setStatus('Transcribing your speech…');
    try {
      const fd = new FormData();
      fd.append('file', blob, 'audio.webm');
      const res = await fetch(`${API}/transcribe`, { method: 'POST', body: fd });
      if (!res.ok) throw new Error();
      const data = await res.json();

      if (data.text) {
        setStatus('Analyzing with AI…');
        await analyzeText(data.text);
      } else {
        setStatus('No speech detected. Try again.');
        setLoading(false);
      }
    } catch {
      showToast('Transcription failed — check backend', 'error');
      setStatus('Error. Try again.');
      setLoading(false);
    }
  };

  const analyzeText = async (text) => {
    const t = text?.trim();
    if (!t) { showToast('Nothing to analyze', 'error'); return; }

    setMessages(prev => [...prev, { role: 'user', text: t }]);
    setLoading(true);
    setStatus('Analyzing with AI…');

    try {
      const fd = new FormData();
      fd.append('text', t);
      const res = await fetch(`${API}/voice`, { method: 'POST', body: fd });
      if (!res.ok) throw new Error();
      const data = await res.json();

      setMessages(prev => [...prev, { role: 'ai', text: data.response }]);
      setStatus('Done! Click mic to ask again');
    } catch {
      showToast('Server error — check backend', 'error');
      setStatus('Error. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    setStatus('Click the mic to start speaking');
  };

  return (
    <div className={styles.panel}>

      {/* Header */}
      <div className={styles.header}>
        <div className={styles.title}>
          <h2>Voice Input</h2>
          <p>Speak your symptoms — AI will respond</p>
        </div>
        {messages.length > 0 && (
          <button className={styles.clearBtn} onClick={clearChat}>Clear Chat</button>
        )}
      </div>

      {/* Chat History */}
      {messages.length > 0 && (
        <div className={styles.chatBox}>
          {messages.map((msg, i) => (
            <div key={i} className={msg.role === 'user' ? styles.userMsg : styles.aiMsg}>
              <div className={styles.msgLabel}>
                {msg.role === 'user' ? 'YOU' : 'AIDORA'}
              </div>
              <div className={styles.msgText}>
                {msg.text.split('\n').map((line, j) => (
                  <span key={j}>{line}{j < msg.text.split('\n').length - 1 && <br />}</span>
                ))}
              </div>
            </div>
          ))}
          {loading && (
            <div className={styles.aiMsg}>
              <div className={styles.msgLabel}>AIDORA</div>
              <div className={styles.typing}>
                <span /><span /><span />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      )}

      {/* Mic Area */}
      <div className={styles.micArea}>
        <div className={`${styles.ring} ${recording ? styles.activeRing : ''}`} />
        <div className={`${styles.ring} ${recording ? styles.activeRing : ''}`} />
        <div className={`${styles.ring} ${recording ? styles.activeRing : ''}`} />
        <button
          className={`${styles.micBtn} ${recording ? styles.recording : ''}`}
          onClick={toggleRecording}
          disabled={loading}
        >
          {recording ? (
            /* Stop icon */
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" style={{opacity: 0.7}}>
              <rect x="6" y="6" width="12" height="12" rx="2"/>
            </svg>
          ) : (
            /* Mic icon — thin stroke, same as original */
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" width="22" height="22" style={{opacity: 0.55}}>
              <rect x="9" y="1" width="6" height="12" rx="3" />
              <path d="M5 10a7 7 0 0 0 14 0" />
              <line x1="12" y1="19" x2="12" y2="23" />
              <line x1="8" y1="23" x2="16" y2="23" />
            </svg>
          )}
        </button>
      </div>

      <p className={`${styles.status} ${(recording || loading) ? styles.active : ''}`}>
        {loading ? <><span className={styles.miniSpinner} /> {status}</> : status}
      </p>

      {/* Manual text input */}
      <div className={styles.row}>
        <input
          type="text"
          placeholder="Or type symptoms manually…"
          className={styles.textInput}
          disabled={recording || loading}
          onKeyDown={e => {
            if (e.key === 'Enter' && e.target.value.trim()) {
              analyzeText(e.target.value);
              e.target.value = '';
            }
          }}
        />
        <button
          className={styles.btnPrimary}
          disabled={loading || recording}
          onClick={(e) => {
            const input = e.target.closest(`.${styles.row}`).querySelector('input');
            if (input.value.trim()) {
              analyzeText(input.value);
              input.value = '';
            }
          }}
        >
          {loading ? <span className={styles.spinner} /> : 'Send'}
        </button>
      </div>

    </div>
  );
}