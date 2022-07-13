import React, { useContext, useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import useSWR from 'swr';
import cls from 'classnames';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { isEmpty } from '../../utils/isEmpty';
import styles from '../../styles/store.module.css';
import { getStoresData } from '../../utils/getStoresData';
import { StoreContext } from '../../context/storeContext';

export default function Store({ coffeStore }) {
  const router = useRouter();
  const id = router.query.id;
  const [storesList, setStoresList] = useState(coffeStore);
  const [votingCount, setVotingCount] = useState(0);

  const { state } = useContext(StoreContext);
  const { coffeeStores } = state;

  const handleCreateCoffeeStore = async (myShop) => {
    const { id, name, voting, imgUrl, neighborhood, address } = myShop;
    try {
      const response = await fetch('/api/createCoffeStore', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          name,
          voting: 0,
          imgUrl,
          neighborhood: neighborhood || '',
          address: address || '',
        }),
      });
      const dbCoffeeStore = await response.json();
      console.log(dbCoffeeStore);
    } catch (e) {
      console.error('Error saving store', err);
    }
  };
  useEffect(() => {
    if (isEmpty(coffeStore) || coffeStore === undefined) {
      if (coffeeStores.length > 0) {
        const myShop = coffeeStores?.find((store) => {
          return store.id.toString() === id;
        });
        console.log(myShop);
        if (myShop) {
          setStoresList(myShop);
          handleCreateCoffeeStore(myShop);
        }
      }
    } else {
      handleCreateCoffeeStore(coffeStore);
    }
  }, [coffeStore, coffeeStores, id]);
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR(`/api/getStoreById?id=${id}`, fetcher);

  useEffect(() => {
    if (data && data.length > 0) {
      setStoresList(data[0]);
      setVotingCount(data[0].voting);
    }
  }, [data]);
  const { name, address, neighborhood, imgUrl } = storesList;

  const handleUpvoteButton = async () => {
    try {
      const response = await fetch('/api/favoritStoreById', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
        }),
      });
      const dbCoffeeStore = await response.json();
      if (dbCoffeeStore && dbCoffeeStore.length > 0) {
        let count = votingCount + 1;
        setVotingCount(count);
      }
    } catch (e) {
      console.error('Error upvoting store', err);
    }
  };
  if (error) {
    return <div>Error fetching data</div>;
  }
  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href="/">
              <a>← Back to home</a>
            </Link>
          </div>
          <div className={styles.nameWrapper}>
            <h1>{name}</h1>
          </div>
          <Image
            src={
              imgUrl ||
              'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80'
            }
            alt={name}
            width={600}
            height={360}
          ></Image>
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
              alt="neighborhoodImg"
              src="/icons/nearMe.svg"
              width="24"
              height="24"
            />
            <p className={styles.text}>{neighborhood}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image
              alt="ratingImg"
              src="/icons/star.svg"
              width="24"
              height="24"
            />
            <p className={styles.text}>{votingCount}</p>
          </div>

          <button className={styles.upvoteButton} onClick={handleUpvoteButton}>
            Up vote!
          </button>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const data = await getStoresData();
  const myShop = data?.find((coffeStore) => {
    return coffeStore.id.toString() === params.id;
  });

  return {
    props: {
      coffeStore: myShop ? myShop : {},
    },
  };
}
export async function getStaticPaths() {
  const data = await getStoresData();
  const idsArray = data?.map((store) => ({
    params: {
      id: `${store.id}`,
    },
  }));
  return {
    paths: idsArray,
    fallback: true,
  };
}
