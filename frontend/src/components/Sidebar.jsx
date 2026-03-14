import styles from './Sidebar.module.css';

const items = [
  {
    id: 'chat', label: 'Text Consultation',
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H7l-4 3V5z" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'voice', label: 'Voice Input',
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M10 2a3 3 0 013 3v5a3 3 0 01-6 0V5a3 3 0 013-3z" strokeLinejoin="round"/>
        <path d="M5 10a5 5 0 0010 0M10 15v3M7 18h6" strokeLinejoin="round" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'vision', label: 'Image Analysis',
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="4" width="16" height="12" rx="2" strokeLinejoin="round"/>
        <circle cx="10" cy="10" r="3"/>
      </svg>
    ),
  },
];

// NEW — modesVisible prop add kiya
export default function Sidebar({ active, onSelect, modesVisible }) {
  return (
    <aside className={`${styles.aside} ${modesVisible ? styles.visible : styles.hidden}`}>
      <div className={styles.inner}>
        <div className={styles.section}>
          <div className={styles.label}>Modes</div>
          {items.map(item => (
            <div
              key={item.id}
              className={`${styles.navItem} ${active === item.id ? styles.active : ''}`}
              onClick={() => onSelect(item.id)}
            >
              <span className={styles.icon}>{item.icon}</span>
              <span className={styles.navLabel}>{item.label}</span>
            </div>
          ))}
        </div>
        <div className={styles.bottom}>
          <div className={styles.disclaimer}>
            For informational use only. Always consult a qualified healthcare professional.
          </div>
        </div>
      </div>
    </aside>
  );
}