import { useState, useRef, useEffect } from 'react';
import { API } from '../App';
import styles from './VisionPanel.module.css';

export default function VisionPanel({ showToast }) {
  const [sourceTab, setSourceTab] = useState('upload');
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [note, setNote] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [captured, setCaptured] = useState(false);

  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  // Start/stop camera when tab changes
  useEffect(() => {
    if (sourceTab === 'camera') {
      startCamera();
    } else {
      stopCamera();
    }
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
    setLoading(true);
    const fd = new FormData();
    fd.append('file', selectedFile);
    if (note) fd.append('note', note);
    try {
      const res = await fetch(`${API}/vision`, { method: 'POST', body: fd });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setResult(data.analysis);
    } catch {
      showToast('Server error — check backend connection', 'error');
    } finally {
      setLoading(false);
    }
  };

  const clear = () => {
    setSelectedFile(null);
    setPreviewUrl('');
    setResult('');
    setNote('');
    setCaptured(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (sourceTab === 'camera') startCamera();
  };

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <h2>Image Analysis</h2>
        <p>Upload or capture a medical image for AI-assisted assessment</p>
      </div>

      {/* Source tabs */}
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${sourceTab === 'upload' ? styles.activeTab : ''}`}
          onClick={() => setSourceTab('upload')}
        >
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" width="13" height="13">
            <rect x="1" y="2" width="14" height="10" rx="2"/>
            <path d="M1 9l4-4 3 3 2-2 4 4"/>
          </svg>
          Upload File
        </button>
        <button
          className={`${styles.tab} ${sourceTab === 'camera' ? styles.activeTab : ''}`}
          onClick={() => setSourceTab('camera')}
        >
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" width="13" height="13">
            <path d="M1 5a2 2 0 012-2h1.5l1-2h5l1 2H13a2 2 0 012 2v7a2 2 0 01-2 2H3a2 2 0 01-2-2V5z"/>
            <circle cx="8" cy="9" r="2.5"/>
          </svg>
          Take Photo
        </button>
      </div>

      {/* Upload zone */}
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
                <rect x="3" y="3" width="18" height="18" rx="3"/>
                <path d="M3 16l5-5 4 4 3-3 5 5"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
              </svg>
              <span className={styles.uploadText}>Click to upload or drag & drop</span>
              <span className={styles.uploadSub}>JPG, PNG, WEBP — max 10MB</span>
            </>
          )}
        </div>
      )}

      {/* Camera zone */}
      {sourceTab === 'camera' && (
        <div className={styles.cameraZone}>
          {!captured ? (
            <video ref={videoRef} autoPlay playsInline className={styles.video} />
          ) : (
            <img src={previewUrl} alt="captured" className={styles.preview} />
          )}
          <canvas ref={canvasRef} style={{ display: 'none' }} />
          <div className={styles.cameraControls}>
            {!captured ? (
              <button className={styles.btnPrimary} onClick={capturePhoto}>
                <svg viewBox="0 0 20 20" fill="none" stroke="white" strokeWidth="1.8" width="15" height="15">
                  <path d="M2 6a2 2 0 012-2h1.5l1-2h7l1 2H16a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"/>
                  <circle cx="10" cy="11" r="3"/>
                </svg>
                Capture
              </button>
            ) : (
              <button className={styles.btnGhost} onClick={retake}>Retake</button>
            )}
          </div>
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
        <button className={styles.btnGhost} onClick={clear}>Clear</button>
      </div>

      {result && (
        <div className={styles.result}>
          <div className={styles.resultLabel}>Analysis</div>
          {result.split('\n').map((line, i) => (
            <span key={i}>{line}{i < result.split('\n').length - 1 && <br />}</span>
          ))}
        </div>
      )}
    </div>
  );
}
