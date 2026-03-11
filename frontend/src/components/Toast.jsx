import styles from './Toast.module.css';

export default function Toast({ msg, type, visible }) {
  return (
    <div className={`${styles.toast} ${visible ? styles.show : ''} ${type ? styles[type] : ''}`}>
      {msg}
    </div>
  );
}
