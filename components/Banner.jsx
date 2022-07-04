import styles from './banner.module.css';

export default function Banner({ buttonText, handleClick }) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <span className={styles.title1}>Coffee</span>
        <span className={styles.title2}>Shop</span>
      </h1>
      <p className={styles.subtitle}>Check Out The Best Coffee Shops</p>
      <div className={styles.buttonWrapper}>
        <button className={styles.button} onClick={handleClick}>
          {buttonText}
        </button>
      </div>
    </div>
  );
}
