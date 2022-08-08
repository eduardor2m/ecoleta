import { useState } from 'react';

import styles from '../styles/components/FormSearch.module.scss';

interface IFormSearchProps {
  handleClickToClose: () => void;
  handlCheckIfTheStateExists: (letters: string) => void;
  handleCheckIfTheCityExists: (letters: string) => void;
  states: string[];
  cities: string[];
}

export const FormSearch = ({
  handleClickToClose,
  handlCheckIfTheStateExists,
  handleCheckIfTheCityExists,
  states,
  cities,
}: IFormSearchProps) => {
  const [selectedInputState, setSelectedInputState] = useState(false);
  const [selectedInputCity, setSelectedInputCity] = useState(false);

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
          placeholder="Digite a cidade"
          onChange={(e) => {
            handleCheckIfTheCityExists(e.target.value);
            e.target.value.length > 0
              ? setSelectedInputCity(true)
              : setSelectedInputCity(false);
          }}
          onBlur={() => setSelectedInputCity(false)}
        />
        {selectedInputCity ? (
          <div className={styles.checkboxContainer}>
            {cities?.map((city) => (
              <div key={city} className={styles.checkbox}>
                <h1>{city}</h1>
              </div>
            ))}
          </div>
        ) : null}
        <input
          type="text"
          placeholder="Digite o estado"
          onChange={(e) => {
            handlCheckIfTheStateExists(e.currentTarget.value);
            e.target.value.length > 0
              ? setSelectedInputState(true)
              : setSelectedInputState(false);
          }}
          onBlur={() => {
            setSelectedInputState(false);
          }}
        />
        {selectedInputState ? (
          <div className={styles.checkboxContainer}>
            {states?.map((state) => (
              <div key={state} className={styles.checkbox}>
                <h1>{state}</h1>
              </div>
            ))}
          </div>
        ) : null}
        <input
          type="submit"
          value="Buscar"
          onClick={(e) => {
            e.preventDefault();
            window.location.href = '/list';
          }}
        />
      </form>
    </div>
  );
};
