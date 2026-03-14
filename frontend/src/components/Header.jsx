import styles from './Header.module.css';

export default function Header({ modesVisible, onToggleModes }) {
  return (
    <header className={styles.header}>
      <div className={styles.left}>

        {/* Square Toggle Button */}
        <button
          className={`${styles.toggleBtn} ${modesVisible ? styles.active : ''}`}
          onClick={onToggleModes}
          aria-label="Toggle modes panel"
          title={modesVisible ? 'Hide Modes' : 'Show Modes'}
        >
          <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect
              x="1" y="1" width="6" height="16" rx="1.5"
              fill={modesVisible ? 'currentColor' : 'none'}
              stroke="currentColor" strokeWidth="1.4"
              opacity={modesVisible ? '0.9' : '0.5'}
            />
            <rect x="10" y="1" width="7" height="7" rx="1.5"
              stroke="currentColor" strokeWidth="1.4" opacity="0.5"
            />
            <rect x="10" y="10" width="7" height="7" rx="1.5"
              stroke="currentColor" strokeWidth="1.4" opacity="0.5"
            />
          </svg>
        </button>

        {/* Logo */}
        <div className={styles.logo}>
          <div className={styles.logoMark}>
            <svg className={styles.ecg} viewBox="0 0 44 28" preserveAspectRatio="xMidYMid meet">
              <polyline
                className={styles.ecgLine}
                points="0,14 6,14 9,14 11,5 13,22 15,8 17,14 22,14 26,14 28,14 30,4 32,24 34,10 36,14 44,14"
              />
            </svg>
          </div>
          Aidora
        </div>

      </div>

      {/* Status */}
      <div className={styles.status}>
        <div className={styles.dot} />
        <span>Medical AI — Online</span>
      </div>
    </header>
  );
}