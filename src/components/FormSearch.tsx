import { useState } from 'react';

import styles from '../styles/components/FormSearch.module.scss';

interface IFormSearchProps {
  handleClick: () => void;
  handleCheckState: (name: string) => void;
  handleCheckCity: (name: string) => void;
  state: string[];
  city: string[];
}

export const FormSearch = ({
  handleClick,
  handleCheckState,
  handleCheckCity,
  state,
  city,
}: IFormSearchProps) => {
  const [selectedState, setSelectedState] = useState(false);
  const [selectedState2, setSelectedState2] = useState(false);
  return (
    <div className={styles.container} onClick={handleClick}>
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
            handleCheckCity(e.target.value);
          }}
          onClick={() => setSelectedState(true)}
          onBlur={() => setSelectedState(false)}
        />
        {selectedState ? (
          <div className={styles.checkboxContainer}>
            {city?.map((city) => (
              <div key={city} className={styles.checkbox}>
                <h1>{city}</h1>
              </div>
            ))}
          </div>
        ) : null}
        <input
          type="text"
          placeholder="Digite o estado"
          onChange={(e) => handleCheckState(e.currentTarget.value)}
          onClick={() => setSelectedState2(true)}
          onBlur={() => setSelectedState2(false)}
        />
        {selectedState2 ? (
          <div className={styles.checkboxContainer}>
            {state?.map((state) => (
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
