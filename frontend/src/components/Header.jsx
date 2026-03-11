import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
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
      <div className={styles.status}>
        <div className={styles.dot} />
        Medical AI — Online
      </div>
    </header>
  );
}
