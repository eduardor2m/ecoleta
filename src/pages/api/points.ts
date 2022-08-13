import type { NextApiRequest, NextApiResponse } from 'next';

export type Entity = {
  id: string;
  name: string;
  category: string;
  adress: {
    state: string;
    city: string;
    street: string;
    number: string;
  };
  image: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Entity[]>
) {
  res.status(200).json([
    {
      id: '1',
      name: 'Colectoria',
      category: 'Resíduos Eletrôniocos, Lâmpadas',
      adress: {
        state: 'Rio de Janeiro',
        city: 'Rio de Janeiro',
        street: 'Rua dos Coqueiros',
        number: '123',
      },
      image: '/assets/imageTalk.svg',
    },
    {
      id: '2',
      name: 'Colectoria',
      category: 'Resíduos Eletrôniocos, Lâmpadas',
      adress: {
        state: 'Parana',
        city: 'Curitiba',
        street: 'Rua dos Coqueiros',
        number: '123',
      },
      image: '/assets/imageBucket.svg',
    },
    {
      id: '3',
      name: 'Colectoria',
      category: 'Resíduos Eletrôniocos, Lâmpadas',
      adress: {
        state: 'Alagoas',
        city: 'Maceió',
        street: 'Rua dos Coqueiros',
        number: '123',
      },
      image: '/assets/imageBucket.svg',
    },
    {
      id: '4',
      name: 'Colectoria',
      category: 'Resíduos Eletrôniocos, Lâmpadas',
      adress: {
        state: 'São Paulo',
        city: 'São Paulo',
        street: 'Rua dos Coqueiros',
        number: '123',
      },
      image: '/assets/imageBucket.svg',
    },
  ]);
}
