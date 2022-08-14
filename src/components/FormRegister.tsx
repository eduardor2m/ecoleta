import { useState } from 'react';

import { collection, addDoc } from 'firebase/firestore';
import Image from 'next/image';

import { data } from '../pages';
import { db } from '../services/firebase';
import styles from '../styles/components/FormRegister.module.scss';
import { Entity } from '../types/entity';
import { Success } from './Success';

export const FormRegister = () => {
  const [open, setOpen] = useState(false);
  const [point, setPoint] = useState<Entity>({} as Entity);

  const dbInstance = collection(db, 'points');

  function handleAddPoint() {
    const pointFormatted = {
      id: new Date().getTime().toString(),
      name: point.name,
      category: point.category,
      adress: {
        state: point.adress.state,
        city: point.adress.city,
        street: point.adress.street,
        number: point.adress.number,
      },
      image: '/assets/imageTalk.svg',
    };

    // function savePoint() {
    //   addDoc(dbInstance, pointFormatted)
    //     .then(() => {
    //       setOpen(true);
    //     })
    //     .catch((err) => {
    //       alert(err);
    //     });
    // }

    // savePoint();

    data.push(pointFormatted);
  }

  return (
    <form className={styles.form}>
      <h1 className={styles.title}>
        Cadastro do <br /> ponto de coleta
      </h1>
      <h3 className={styles.subTitle}>Dados da entidade</h3>
      <label htmlFor="name" className={styles.label}>
        Nome da entidade
      </label>
      <input
        type="text"
        id="name"
        className={styles.inputName}
        onChange={(e) => setPoint({ ...point, name: e.target.value })}
      />
      <section className={styles.adressOne}>
        <section className={styles.wrapper}>
          <label htmlFor="adressName" className={styles.label}>
            Endereço
          </label>
          <input
            type="text"
            id="adressName"
            className={styles.inputAdressName}
            onChange={(e) =>
              setPoint({
                ...point,
                adress: { ...point.adress, street: e.target.value },
              })
            }
          />
        </section>
        <section className={styles.wrapper}>
          <label
            htmlFor="adressNumber"
            className={styles.label}
            style={{
              marginLeft: '50%',
            }}
          >
            Número
          </label>
          <input
            type="number"
            id="adressNumber"
            className={styles.inputAdressNumber}
            onChange={(e) =>
              setPoint({
                ...point,
                adress: { ...point.adress, number: e.target.value },
              })
            }
          />
        </section>
      </section>
      <section className={styles.adressTwo}>
        <section className={styles.wrapper}>
          <label htmlFor="adressCity" className={styles.label}>
            Cidade
          </label>
          <input
            type="text"
            id="adressCity"
            className={styles.inputAdressCity}
            onChange={(e) =>
              setPoint({
                ...point,
                adress: { ...point.adress, city: e.target.value },
              })
            }
          />
        </section>
        <section className={styles.wrapper}>
          <label
            htmlFor="adressState"
            className={styles.label}
            style={{
              marginLeft: '5%',
            }}
          >
            Estado
          </label>
          <input
            type="text"
            id="adressState"
            className={styles.inputAdressState}
            onChange={(e) =>
              setPoint({
                ...point,
                adress: { ...point.adress, state: e.target.value },
              })
            }
          />
        </section>
      </section>
      <section className={styles.titleItens}>
        <h3>Ítens de coleta</h3>
        <span>Selecione um ou mais ítens abaixo</span>
      </section>

      <section className={styles.items}>
        <div
          className={styles.item}
          onClick={() =>
            setPoint({
              ...point,
              category: 'lampadas',
            })
          }
          style={{
            backgroundColor: point.category === 'lampadas' ? '#34CB79' : '#fff',
          }}
        >
          <Image
            src="/assets/lamps.svg"
            alt="Lâmpadas"
            width={60}
            height={60}
          />
          <span className={styles.textSpan}>Lâmpadas</span>
        </div>
        <div
          className={styles.item}
          onClick={() =>
            setPoint({
              ...point,
              category: 'pilhas-e-baterias',
            })
          }
          style={{
            backgroundColor:
              point.category === 'pilhas-e-baterias' ? '#34CB79' : '#fff',
          }}
        >
          <Image
            src="/assets/batteries.svg"
            alt="Pilhas e Baterias"
            width={60}
            height={60}
          />
          <span className={styles.textSpan}>Pilhas e Baterias</span>
        </div>
        <div
          className={styles.item}
          onClick={() =>
            setPoint({
              ...point,
              category: 'papeis-e-papelao',
            })
          }
          style={{
            backgroundColor:
              point.category === 'papeis-e-papelao' ? '#34CB79' : '#fff',
          }}
        >
          <Image
            src="/assets/papers.svg"
            alt="Papéis e Papelão"
            width={60}
            height={60}
          />
          <span className={styles.textSpan}>Papéis e Papelão</span>
        </div>
        <div
          className={styles.item}
          onClick={() =>
            setPoint({
              ...point,
              category: 'eletronicos',
            })
          }
          style={{
            backgroundColor:
              point.category === 'eletronicos' ? '#34CB79' : '#fff',
          }}
        >
          <Image
            src="/assets/electronics.svg"
            alt="Resíduos Eletrônicos"
            width={60}
            height={60}
          />
          <span className={styles.textSpan}>Resíduos Eletrônicos</span>
        </div>
        <div
          className={styles.item}
          onClick={() =>
            setPoint({
              ...point,
              category: 'organicos',
            })
          }
          style={{
            backgroundColor:
              point.category === 'organicos' ? '#34CB79' : '#fff',
          }}
        >
          <Image
            src="/assets/organic.svg"
            alt="Resíduos Orgânicos"
            width={60}
            height={60}
          />
          <span className={styles.textSpan}>Resíduos Orgânicos</span>
        </div>
        <div
          className={styles.item}
          onClick={() =>
            setPoint({
              ...point,
              category: 'oleo-de-cozinha',
            })
          }
          style={{
            backgroundColor:
              point.category === 'oleo-de-cozinha' ? '#34CB79' : '#fff',
          }}
        >
          <Image
            src="/assets/oil.svg"
            alt="Óleo de Cozinha"
            width={60}
            height={60}
          />
          <span className={styles.textSpan}>Óleo de Cozinha</span>
        </div>
      </section>
      <section className={styles.wrapperButton}>
        <button
          type="submit"
          className={styles.button}
          onClick={(e) => {
            setOpen(true);
            handleAddPoint();
            e.preventDefault();
          }}
        >
          Cadastrar ponto de coleta
        </button>
        {open && (
          <Success
            handleClick={() => {
              setOpen(false);
            }}
          />
        )}
      </section>
    </form>
  );
};
