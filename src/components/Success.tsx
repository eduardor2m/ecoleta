import { BsCheck2Circle } from 'react-icons/bs';

import styles from '../styles/components/Success.module.scss';
interface IFormSearchProps {
  handleClick: () => void;
}

export const Success = ({ handleClick }: IFormSearchProps) => {
  return (
    <div className={styles.container} onClick={handleClick}>
      <BsCheck2Circle className={styles.icon} />
      <h1>Cadastro Concluído</h1>
    </div>
  );
};
