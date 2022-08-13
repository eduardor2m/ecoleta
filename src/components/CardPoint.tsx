import Image from 'next/image';

import styles from '../styles/components/CardPoint.module.scss';

interface IFormSearchProps {
  category: string;
  name: string;
  description: string;
  imageURL: string;
}

export const CardPoint = ({
  category,
  name,
  description,
  imageURL,
}: IFormSearchProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.cardImage}>
        <Image
          src={imageURL}
          alt={name}
          layout="fill"
          width={150}
          height={150}
          style={{
            borderRadius: '5px 5px 0 0',
          }}
        />
      </div>
      <div className={styles.cardContent}>
        <h1>{category}</h1>
        <h3>{name}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};
