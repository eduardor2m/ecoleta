/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { createContext, useContext, useEffect, useState } from 'react';

import { collection, addDoc, getDocs } from 'firebase/firestore';

import { db } from '../services/firebase';
import { Entity } from '../types/entity';

interface PointContextData {
  point: Entity[];
  createPoint: (point: Entity) => void;
  updatePoint: (point: Entity) => void;
  deletePoint: (point: Entity) => void;
  listPoints: () => Entity[];
  listPointsByState: (state: string) => Entity[];
}

const PointContext = createContext<PointContextData>({} as PointContextData);

interface IPointsProviderProps {
  children: React.ReactNode;
}

const dbInstance = collection(db, 'points');

export const PointProvider: React.FC<IPointsProviderProps> = ({
  children,
}: IPointsProviderProps) => {
  const [collectionPoints, setCollectionPoints] = useState<Entity[]>([]);

  useEffect(() => {
    const point = localStorage.getItem('@point');
    if (point) {
      setCollectionPoints({
        ...JSON.parse(point),
      });
    }
  }, []);

  function createPoint(point: Entity) {
    if (point.name && point.category && point.adress) {
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

      addDoc(dbInstance, pointFormatted)
        .then(() => {
          setCollectionPoints([...collectionPoints, pointFormatted]);
          localStorage.setItem('@point', JSON.stringify(collectionPoints));
          alert('Ponto criado com sucesso!');
        })
        .catch((err) => {
          alert(err);
        });
    } else {
      alert('Preencha todos os campos!');
    }
  }

  function updatePoint(point: Entity) {
    if (point.name && point.category && point.image && point.adress) {
      alert('Ponto de coleta atualizado com sucesso!');
    }
  }

  function deletePoint(point: Entity) {
    alert('Ponto de coleta excluído com sucesso!');
    console.log(point);
  }

  function listPoints(): Entity[] {
    getDocs(dbInstance)
      .then((data) => {
        setCollectionPoints(
          data.docs.map((item: any) => {
            return { ...item.data() };
          })
        );
      })
      .catch((err) => {
        alert(err);
      });

    return collectionPoints;
  }

  function listPointsByState(state: string): Entity[] {
    getDocs(dbInstance)
      .then((data) => {
        setCollectionPoints(
          data.docs
            .map((item: any) => {
              return { ...item.data() };
            })
            .filter((point) => {
              return point.adress.state === state;
            })
        );
      })
      .catch((err) => {
        alert(err);
      });

    return collectionPoints;
  }

  return (
    <PointContext.Provider
      value={{
        point: collectionPoints,
        createPoint,
        updatePoint,
        deletePoint,
        listPoints,
        listPointsByState,
      }}
    >
      {children}
    </PointContext.Provider>
  );
};

export const usePoint = () => {
  const context = useContext(PointContext);

  return context;
};
