import { useState, useRef, useEffect } from 'react';
import { API } from '../App';
import styles from './VisionPanel.module.css';

export default function VisionPanel({ showToast }) {
  const [sourceTab, setSourceTab] = useState('upload');
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [captured, setCaptured] = useState(false);
  const [messages, setMessages] = useState([]);

  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (sourceTab === 'camera') startCamera();
    else stopCamera();
    return () => stopCamera();
  }, [sourceTab]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' }, audio: false });
      streamRef.current = stream;
      if (videoRef.current) videoRef.current.srcObject = stream;
      setCaptured(false);
      setSelectedFile(null);
      setPreviewUrl('');
    } catch {
      showToast('Camera access denied', 'error');
      setSourceTab('upload');
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);
    canvas.toBlob(blob => {
      const file = new File([blob], 'capture.jpg', { type: 'image/jpeg' });
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(blob));
      setCaptured(true);
      stopCamera();
      showToast('Photo captured', 'success');
    }, 'image/jpeg', 0.92);
  };

  const retake = () => {
    setSelectedFile(null);
    setPreviewUrl('');
    setCaptured(false);
    startCamera();
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const analyze = async () => {
    if (!selectedFile) return;
    const savedPreview = previewUrl;
    const savedNote = note;

    setMessages(prev => [...prev, { role: 'user', previewUrl: savedPreview, note: savedNote || null }]);
    setLoading(true);

    const fd = new FormData();
    fd.append('file', selectedFile);
    if (savedNote) fd.append('note', savedNote);

    try {
      const res = await fetch(`${API}/vision`, { method: 'POST', body: fd });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'ai', text: data.analysis }]);
      setSelectedFile(null);
      setPreviewUrl('');
      setNote('');
      if (fileInputRef.current) fileInputRef.current.value = '';
      if (sourceTab === 'camera') startCamera();
    } catch {
      showToast('Server error — check backend connection', 'error');
    } finally {
      setLoading(false);
    }
  };

  const clearAll = () => {
    setMessages([]);
    setSelectedFile(null);
    setPreviewUrl('');
    setNote('');
    setCaptured(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (sourceTab === 'camera') startCamera();
  };

  return (
    <div className={styles.panel}>

      <div className={styles.header}>
        <div>
          <h2>Image Analysis</h2>
          <p>Upload or capture a medical image for AI-assisted assessment</p>
        </div>
        {messages.length > 0 && (
          <button className={styles.clearBtn} onClick={clearAll}>Clear Chat</button>
        )}
      </div>

      {/* Chat History */}
      {messages.length > 0 && (
        <div className={styles.chatBox}>
          {messages.map((msg, i) => (
            <div key={i} className={msg.role === 'user' ? styles.userMsg : styles.aiMsg}>
              <div className={styles.msgLabel}>{msg.role === 'user' ? 'YOU' : 'AIDORA'}</div>
              {msg.role === 'user' ? (
                <div className={styles.userContent}>
                  <img src={msg.previewUrl} alt="uploaded" className={styles.chatImg} />
                  {msg.note && <p className={styles.chatNote}>{msg.note}</p>}
                </div>
              ) : (
                <div className={styles.msgText}>
                  {msg.text.split('\n').map((line, j) => (
                    <span key={j}>{line}{j < msg.text.split('\n').length - 1 && <br />}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
          {loading && (
            <div className={styles.aiMsg}>
              <div className={styles.msgLabel}>AIDORA</div>
              <div className={styles.typing}><span /><span /><span /></div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      )}

      {/* Tabs */}
      <div className={styles.tabs}>
        <button className={`${styles.tab} ${sourceTab === 'upload' ? styles.activeTab : ''}`} onClick={() => setSourceTab('upload')}>
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" width="13" height="13">
            <rect x="1" y="2" width="14" height="10" rx="2"/><path d="M1 9l4-4 3 3 2-2 4 4"/>
          </svg>
          Upload File
        </button>
        <button className={`${styles.tab} ${sourceTab === 'camera' ? styles.activeTab : ''}`} onClick={() => setSourceTab('camera')}>
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" width="13" height="13">
            <path d="M1 5a2 2 0 012-2h1.5l1-2h5l1 2H13a2 2 0 012 2v7a2 2 0 01-2 2H3a2 2 0 01-2-2V5z"/><circle cx="8" cy="9" r="2.5"/>
          </svg>
          Take Photo
        </button>
      </div>

      {sourceTab === 'upload' && (
        <div
          className={`${styles.uploadZone} ${previewUrl ? styles.hasImage : ''}`}
          onClick={() => !previewUrl && fileInputRef.current?.click()}
          onDragOver={e => e.preventDefault()}
          onDrop={handleDrop}
        >
          <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFileSelect} />
          {previewUrl ? (
            <img src={previewUrl} alt="preview" className={styles.preview} />
          ) : (
            <>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={styles.uploadIcon}>
                <rect x="3" y="3" width="18" height="18" rx="3"/><path d="M3 16l5-5 4 4 3-3 5 5"/><circle cx="8.5" cy="8.5" r="1.5"/>
              </svg>
              <span className={styles.uploadText}>Click to upload or drag & drop</span>
              <span className={styles.uploadSub}>JPG, PNG, WEBP — max 10MB</span>
            </>
          )}
        </div>
      )}

      {sourceTab === 'camera' && (
        <div className={styles.cameraZone}>
          {!captured ? (
            <>
              <video ref={videoRef} autoPlay playsInline className={styles.video} />
              <div className={styles.captureOverlay}>
                <button className={styles.captureBtn} onClick={capturePhoto}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" width="22" height="22">
                    <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/>
                  </svg>
                </button>
              </div>
            </>
          ) : (
            <div className={styles.capturedWrap}>
              <img src={previewUrl} alt="captured" className={styles.capturedImg} />
              <button className={styles.retakeBtn} onClick={retake}>Retake</button>
            </div>
          )}
          <canvas ref={canvasRef} style={{ display: 'none' }} />
        </div>
      )}

      <input
        type="text"
        className={styles.noteInput}
        placeholder="Optional: describe the affected area or symptoms…"
        value={note}
        onChange={e => setNote(e.target.value)}
      />

      <div className={styles.actions}>
        <button className={styles.btnPrimary} onClick={analyze} disabled={!selectedFile || loading}>
          {loading ? <><span className={styles.spinner} /> Analyzing</> : 'Analyze Image'}
        </button>
        {previewUrl && (
          <button className={styles.btnGhost} onClick={() => {
            setSelectedFile(null); setPreviewUrl(''); setNote('');
            if (fileInputRef.current) fileInputRef.current.value = '';
            if (sourceTab === 'camera') startCamera();
          }}>Remove</button>
        )}
      </div>

    </div>
  );
}