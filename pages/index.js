import Head from 'next/head';
import Image from 'next/image';
import Banner from '../components/banner/Banner';
import Card from '../components/card/Card';
import styles from '../styles/Home.module.css';
import { getStoresData } from '../utils/getStoresData';
import useTrackLocation from '../hooks/use-track-location';
import { useContext, useEffect, useState } from 'react';
import { ACTION_TYPES, StoreContext } from '../context/storeContext';

export default function Home({ stores }) {
  const [coffeeError, setCoffeeError] = useState('');
  const [da, setda] = useState('');
  const { locationErrorMsg, handleTrackLocation, isFetching } =
    useTrackLocation();

  const { state, dispatch } = useContext(StoreContext);
  const { coffeeStores, latLong } = state;

  useEffect(() => {
    console.log('testing');
  }, [da]);
  // const latLong = '41.8781,-87.6298';
  const limit = 30;
  useEffect(() => {
    async function setCoffeeStoresByLocation() {
      if (latLong) {
        try {
          const fetchedCoffeeStores = await fetch(
            `/api/getCoffeeStoresByLocation?latLong=${latLong}&limit=${limit}`
          );
          const coffeeStores = await fetchedCoffeeStores.json();
          dispatch({
            type: ACTION_TYPES.SET_COFFEE_STORES,
            payload: { coffeeStores },
          });
          setCoffeeError('');
        } catch (e) {
          console.log({ e });
          setCoffeeError(e.message);
        }
      }
    }
    setCoffeeStoresByLocation();
  }, [latLong, dispatch]);
  const handleClick = () => {
    handleTrackLocation();
  };

  if (!stores) return <h1>API IS OFF TRY AGAIN LATER</h1>;
  return (
    <div className={styles.container}>
      <Head>
        <title>My Coffee Shop</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Banner
          buttonText={isFetching ? 'Locating...' : 'View stores nearby'}
          handleClick={handleClick}
        />
        {locationErrorMsg && <p>Something went wrong: {locationErrorMsg}</p>}
        {coffeeError && <p>Something went wrong: {coffeeError}</p>}
        <div className={styles.heroImage}>
          <Image
            alt="hero-coffee-img"
            src="/static/hero-image.png"
            width={700}
            height={400}
          />
        </div>
        {coffeeStores?.length > 0 && (
          <>
            <h2 className={styles.heading2}>Stores Near By</h2>
            <div className={styles.cardLayout}>
              {coffeeStores.map((store) => {
                return (
                  <Card
                    key={store.id}
                    className={styles.card}
                    name={store.name}
                    imgUrl={
                      store.imgUrl ||
                      'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80'
                    }
                    href={`/store/${store.id}`}
                  />
                );
              })}
            </div>
          </>
        )}
        {stores.length > 0 && (
          <>
            <h2 className={styles.heading2}>Toronto stores</h2>
            <div className={styles.cardLayout}>
              {stores.map((store) => {
                return (
                  <Card
                    key={store.id}
                    className={styles.card}
                    name={store.name}
                    imgUrl={
                      store.imgUrl ||
                      'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80'
                    }
                    href={`/store/${store.id}`}
                  />
                );
              })}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export async function getStaticProps(context) {
  const data = await getStoresData();
  // const data = coffeeData;
  return {
    props: {
      stores: data,
    }, //pass para o comp como prop
  };
}
