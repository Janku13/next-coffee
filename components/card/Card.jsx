import Link from 'next/link';
import Image from 'next/image';
import cls from 'classnames';
import styles from './card.module.css';

export default function Card({ name, imgUrl, href }) {
  return (
    <Link href={href}>
      <div className={cls('glass', styles.container)}>
        <a className={styles.cardLink}>
          <div className={styles.cardHeaderWrapper}>
            <h2 className={styles.cardHeader}>{name}</h2>
          </div>
          <div className={styles.cardImageWrapper}>
            <Image
              src={imgUrl}
              width={260}
              height={160}
              className={styles.cardImage}
              alt="store-img"
            />
          </div>
        </a>
      </div>
    </Link>
  );
}
