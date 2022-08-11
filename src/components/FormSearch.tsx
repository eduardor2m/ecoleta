import { useState } from 'react';

import Link from 'next/link';

import styles from '../styles/components/FormSearch.module.scss';

interface IFormSearchProps {
  handleClickToClose: () => void;
  handlCheckIfTheStateExists: (letters: string) => void;
  states: string[];
}

export const FormSearch = ({
  handleClickToClose,
  handlCheckIfTheStateExists,
  states,
}: IFormSearchProps) => {
  const [selectedInputState, setSelectedInputState] = useState(false);
  const [inputState, setInputState] = useState('Todos');

  return (
    <div className={styles.container} onClick={handleClickToClose}>
      <form
        className={styles.form}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h1>Pontos de Coleta</h1>
        <input
          type="text"
          placeholder="Digite o estado"
          value={inputState}
          onChange={(e) => {
            setInputState(e.target.value);
            handlCheckIfTheStateExists(e.target.value);
            inputState === ''
              ? setSelectedInputState(false)
              : setSelectedInputState(true);
          }}
        />
        {selectedInputState ? (
          <div className={styles.checkboxContainer}>
            {states?.map((state) => (
              <div
                key={state}
                className={styles.checkbox}
                onClick={() => setInputState(state)}
              >
                <h1
                  onClick={() => {
                    setInputState(state);
                  }}
                >
                  {state}
                </h1>
              </div>
            ))}
          </div>
        ) : null}
        <Link href="/list/[state]" as={`/list/${inputState}`} passHref>
          <input type="submit" value="Buscar" />
        </Link>
      </form>
    </div>
  );
};
