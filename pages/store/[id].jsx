import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import cls from 'classnames';
import { useRouter } from 'next/router';
import Link from 'next/link';
import coffeeStoresData from '../../data/coffee-stores.json';
import styles from '../../styles/store.module.css';

export default function Store({ coffeStore }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const { address, name, neighbourhood, imgUrl } = coffeStore;
  const handleUpvoteButton = () => {};
  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href="/">
              <a> Back to home</a>
            </Link>
          </div>
          <div className={styles.nameWrapper}>
            <h1>{name}</h1>
          </div>
          <Image src={imgUrl} alt={name} width={600} height={360}></Image>
        </div>
        <div className={cls('glass', styles.col2)}>
          <div className={styles.iconWrapper}>
            <Image
              alt="addressImg"
              src="/icons/places.svg"
              width="24"
              height="24"
            />
            <p className={styles.text}>{address}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image
              alt="neighbourhoodImg"
              src="/icons/nearMe.svg"
              width="24"
              height="24"
            />
            <p className={styles.text}>{neighbourhood}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image
              alt="ratingImg"
              src="/icons/star.svg"
              width="24"
              height="24"
            />
            <p className={styles.text}>1</p>
          </div>

          <button className={styles.upvoteButton} onClick={handleUpvoteButton}>
            Up vote!
          </button>
        </div>
      </div>
    </div>
  );
}

export function getStaticProps({ params }) {
  return {
    props: {
      coffeStore: coffeeStoresData.find((coffeStore) => {
        return coffeStore.id.toString() === params.id;
      }),
    },
  };
}
export function getStaticPaths() {
  const idsArray = coffeeStoresData.map((store) => ({
    params: {
      id: `${store.id}`,
    },
  }));
  return {
    paths: idsArray,
    fallback: true,
  };
}
