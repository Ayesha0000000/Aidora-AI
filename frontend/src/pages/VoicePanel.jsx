import { useState, useRef } from 'react';
import { API } from '../App';
import styles from './VoicePanel.module.css';

export default function VoicePanel({ showToast }) {
  const [recording, setRecording] = useState(false);
  const [voiceText, setVoiceText] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('Click the mic or type below');
  const mediaRef = useRef(null);
  const chunksRef = useRef([]);

  const toggleRecording = async () => {
    if (!recording) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mr = new MediaRecorder(stream);
        chunksRef.current = [];
        mr.ondataavailable = e => chunksRef.current.push(e.data);
        mr.onstop = () => {
          stream.getTracks().forEach(t => t.stop());
          setStatus('Recording done — type or edit text, then click Analyze');
          showToast('Recording saved. Type what you said and click Analyze.', '');
        };
        mr.start();
        mediaRef.current = mr;
        setRecording(true);
        setStatus('Recording… click again to stop');
      } catch {
        showToast('Microphone access denied', 'error');
      }
    } else {
      mediaRef.current?.stop();
      setRecording(false);
    }
  };

  const submit = async () => {
    const text = voiceText.trim();
    if (!text) { showToast('Please enter text first', 'error'); return; }
    setLoading(true);
    setStatus('Analyzing…');

    try {
      const fd = new FormData();
      fd.append('text', text);
      const res = await fetch(`${API}/voice`, { method: 'POST', body: fd });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setResponse(data.response);
      setStatus('Analysis complete');
    } catch {
      showToast('Server error — check backend connection', 'error');
      setStatus('Error. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.panel}>
      <div className={styles.title}>
        <h2>Voice Input</h2>
        <p>Record your symptoms or type them below</p>
      </div>

      <div className={styles.micArea}>
        <div className={styles.ring} />
        <div className={styles.ring} />
        <div className={styles.ring} />
        <button
          className={`${styles.micBtn} ${recording ? styles.recording : ''}`}
          onClick={toggleRecording}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M12 1a4 4 0 014 4v7a4 4 0 01-8 0V5a4 4 0 014-4z"/>
            <path d="M5 10a7 7 0 0014 0M12 19v4M8 23h8"/>
          </svg>
        </button>
      </div>

      <p className={`${styles.status} ${(recording || loading) ? styles.active : ''}`}>{status}</p>

      <div className={styles.row}>
        <input
          type="text"
          placeholder="Paste or type transcribed text…"
          value={voiceText}
          onChange={e => setVoiceText(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && submit()}
          className={styles.textInput}
        />
        <button className={styles.btnPrimary} onClick={submit} disabled={loading}>
          {loading ? <span className={styles.spinner} /> : 'Analyze'}
        </button>
      </div>

      {response && (
        <div className={styles.response}>
          <div className={styles.responseLabel}>Response</div>
          {response.split('\n').map((line, i) => (
            <span key={i}>{line}{i < response.split('\n').length - 1 && <br />}</span>
          ))}
        </div>
      )}
    </div>
  );
}
