import styles from '../styles/components/FormSearch.module.scss';

interface IFormSearchProps {
  handleClick: () => void;
}

export const FormSearch = ({ handleClick }: IFormSearchProps) => {
  return (
    <div className={styles.container} onClick={handleClick}>
      <form className={styles.form} onClick={(e) => e.stopPropagation()}>
        <h1>Pontos de Coleta</h1>
        <input type="text" placeholder="Digite a cidade" />
        <input type="text" placeholder="Digite o estado" />
        <input type="submit" value="Buscar" />
      </form>
    </div>
  );
};
