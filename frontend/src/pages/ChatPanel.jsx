import { useState, useRef, useEffect } from 'react';
import { API } from '../App';
import styles from './ChatPanel.module.css';

export default function ChatPanel({ showToast }) {
  const [messages, setMessages] = useState([
    { role: 'ai', text: "Hello. I'm your medical AI assistant. Please describe your symptoms or ask a health-related question, and I'll provide safe, general guidance." }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = async () => {
    const question = input.trim();
    if (!question || loading) return;

    setMessages(m => [...m, { role: 'user', text: question }]);
    setInput('');
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
    setLoading(true);

    try {
      const res = await fetch(`${API}/health`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setMessages(m => [...m, { role: 'ai', text: data.response }]);
    } catch {
      setMessages(m => [...m, { role: 'ai', text: 'Unable to reach the server. Please ensure the backend is running on port 8000.' }]);
      showToast('Connection error', 'error');
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  };

  const autoResize = (e) => {
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
  };

  return (
    <div className={styles.panel}>
      <div className={styles.panelHeader}>
        <h2>Text Consultation</h2>
        <p>Describe your symptoms or ask a medical question</p>
      </div>

      <div className={styles.messages}>
        {messages.map((msg, i) => (
          <div key={i} className={`${styles.msgRow} ${styles[msg.role]}`}>
            <div className={styles.sender}>{msg.role === 'ai' ? 'Aidora' : 'You'}</div>
            <div className={styles.bubble}>
              {msg.text.split('\n').map((line, j) => (
                <span key={j}>{line}{j < msg.text.split('\n').length - 1 && <br />}</span>
              ))}
            </div>
          </div>
        ))}
        {loading && (
          <div className={`${styles.msgRow} ${styles.ai}`}>
            <div className={styles.sender}>Aidora</div>
            <div className={`${styles.bubble} ${styles.typing}`}>
              <span className={styles.dot} />
              <span className={styles.dot} />
              <span className={styles.dot} />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className={styles.inputBar}>
        <div className={styles.inputWrap}>
          <textarea
            ref={textareaRef}
            rows={1}
            placeholder="Describe your symptoms..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            onInput={autoResize}
          />
          <button className={styles.sendBtn} onClick={send} disabled={loading || !input.trim()}>
            <svg viewBox="0 0 20 20" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
              <line x1="4" y1="10" x2="16" y2="10"/>
              <polyline points="11,5 16,10 11,15"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
