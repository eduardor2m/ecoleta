/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { BiExit } from 'react-icons/bi';

import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';

import { FormSearch } from '../components/FormSearch';
import { NavBar } from '../components/NavBar';
import { usePoint } from '../hooks/usePoint';
import styles from '../styles/pages/Home.module.scss';
import { Entity } from '../types/entity';

const Home: NextPage = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [collectionPoints, setCollectionPoints] = useState<Entity[]>([]);
  const [search, setSearch] = useState('');

  const { listPoints } = usePoint();

  useEffect(() => {
    setCollectionPoints(listPoints());
  }, []);

  const filteredPointsState = collectionPoints.filter((point) => {
    return point.adress.state.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>Ecoleta</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/assets/icon.svg" />
      </Head>

      <NavBar
        data={{
          icon: 'exit',
          description: 'Cadastre um ponto de coleta',
          href: '/register',
        }}
      />

      <main className={styles.main}>
        {searchOpen ? (
          <>
            <FormSearch
              handleClickToClose={() => setSearchOpen(false)}
              handlCheckIfTheStateExists={(letters) => {
                setSearch(letters);
              }}
              states={filteredPointsState.map((point) => point.adress.state)}
            />
          </>
        ) : null}

        <section className={styles.info}>
          <h1 className={styles.title}>
            Seu marketplace <br /> de coleta de resíduos.
          </h1>
          <p className={styles.description}>
            Ajudamos pessoas a encontrarem pontos <br /> de coleta de forma
            eficiente.
          </p>
          <button
            className={styles.button}
            onClick={() => setSearchOpen(!searchOpen)}
          >
            <section className={styles.buttonIcon}>
              <BiExit color="#fff" size={24} />
            </section>
            <section className={styles.sectionText}>
              <span className={styles.buttonText}>
                Pesquise pontos de coleta
              </span>
            </section>
          </button>
        </section>

        <section className={styles.image}>
          <Image
            src="/assets/people.svg"
            alt="Ecoleta"
            width={400}
            height={400}
          />
        </section>
      </main>
    </div>
  );
};

export default Home;
