import styles from '../styles/components/FormSearch.module.scss';

interface IFormSearchProps {
  handleClick: () => void;
  handleCheckName: (name: string) => void;
}

export const FormSearch = ({
  handleClick,
  handleCheckName,
}: IFormSearchProps) => {
  return (
    <div className={styles.container} onClick={handleClick}>
      <form
        className={styles.form}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h1>Pontos de Coleta</h1>
        <input type="text" placeholder="Digite a cidade" />
        <input
          type="text"
          placeholder="Digite o estado"
          onChange={(e) => handleCheckName(e.currentTarget.value)}
        />
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
