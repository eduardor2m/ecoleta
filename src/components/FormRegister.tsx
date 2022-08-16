import { useState } from 'react';

import Image from 'next/image';

import { usePoint } from '../hooks/usePoint';
import styles from '../styles/components/FormRegister.module.scss';
import { Entity } from '../types/entity';
import { Success } from './Success';

export const FormRegister = () => {
  const [open, setOpen] = useState(false);
  const [point, setPoint] = useState<Entity>({} as Entity);

  const { createPoint } = usePoint();

  function handleAddPoint() {
    createPoint(point);
    setOpen(true);
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
              category: 'Lâmpadas',
            })
          }
          style={{
            backgroundColor: point.category === 'Lâmpadas' ? '#34CB79' : '#fff',
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
              category: 'Pilhas e Baterias',
            })
          }
          style={{
            backgroundColor:
              point.category === 'Pilhas e Baterias' ? '#34CB79' : '#fff',
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
              category: 'Papéis e Papelão',
            })
          }
          style={{
            backgroundColor:
              point.category === 'Papéis e Papelão' ? '#34CB79' : '#fff',
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
              category: 'Resíduos Eletrônicos',
            })
          }
          style={{
            backgroundColor:
              point.category === 'Resíduos Eletrônicos' ? '#34CB79' : '#fff',
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
              category: 'Resíduos Orgânicos',
            })
          }
          style={{
            backgroundColor:
              point.category === 'Resíduos Orgânicos' ? '#34CB79' : '#fff',
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
              category: 'Óleo de Cozinha"',
            })
          }
          style={{
            backgroundColor:
              point.category === 'Óleo de Cozinha"' ? '#34CB79' : '#fff',
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
