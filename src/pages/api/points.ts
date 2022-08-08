import type { NextApiRequest, NextApiResponse } from 'next';

export type Data = {
  id: string;
  title: string;
  description: string;
  adress: {
    state: string;
    city: string;
    street: string;
    number: string;
    country: string;
  };
  image: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data[]>
) {
  res.status(200).json([
    {
      id: '1',
      title: 'Colectoria',
      description: 'Resíduos Eletrôniocos, Lâmpadas',
      adress: {
        state: 'Rio de Janeiro',
        city: 'Rio de Janeiro',
        street: 'Rua dos Coqueiros',
        number: '123',
        country: 'Brasil',
      },
      image: '/assets/imageTalk.svg',
    },
    {
      id: '2',
      title: 'Colectoria',
      description: 'Resíduos Eletrôniocos, Lâmpadas',
      adress: {
        state: 'Parana',
        city: 'Curitiba',
        street: 'Rua dos Coqueiros',
        number: '123',
        country: 'Brasil',
      },
      image: '/assets/imageBucket.svg',
    },
    {
      id: '3',
      title: 'Colectoria',
      description: 'Resíduos Eletrôniocos, Lâmpadas',
      adress: {
        state: 'Alagoas',
        city: 'Maceió',
        street: 'Rua dos Coqueiros',
        number: '123',
        country: 'Brasil',
      },
      image: '/assets/imageBucket.svg',
    },
    {
      id: '4',
      title: 'Colectoria',
      description: 'Resíduos Eletrôniocos, Lâmpadas',
      adress: {
        state: 'São Paulo',
        city: 'São Paulo',
        street: 'Rua dos Coqueiros',
        number: '123',
        country: 'Brasil',
      },
      image: '/assets/imageBucket.svg',
    },
  ]);
}
