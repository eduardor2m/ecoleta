import { useEffect, useState } from 'react';
import { BiExit } from 'react-icons/bi';

import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import { FormSearch } from '../components/FormSearch';
import styles from '../styles/pages/Home.module.scss';
import { Data } from './api/points';

const Home: NextPage = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [list, setList] = useState<Data[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function fetchData() {
      await fetch('http://localhost:3000/api/points')
        .then((response) => response.json())
        .then((data) => setList(data));
    }

    fetchData();
  }, []);

  const filteredPointsState = list.filter((point) => {
    return point.adress.state.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>Ecoleta</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/assets/icon.svg" />
      </Head>
      <nav className={styles.navbar}>
        <Link href="/">
          <a href="/">
            <Image
              src="/assets/logo.svg"
              alt="Ecoleta"
              width={150}
              height={50}
            />
          </a>
        </Link>

        <Link href="/register">
          <a href="/register" className={styles.link}>
            <BiExit color="#34CB79" size={24} />
            <span className={styles.textLink}>Cadastre um ponto de coleta</span>
          </a>
        </Link>
      </nav>

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
