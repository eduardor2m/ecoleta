import fs from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next';

import points from '../../../database/points.json';
import { Entity } from '../points';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Entity[] | string | any>
) {
  if (req.method === 'GET') {
    const pointsFormatted = points.map((point) => {
      return {
        id: point.id,
        name: point.name,
        category: point.category,
        image: point.image,
        adress: {
          state: point.adress.state,
          city: point.adress.city,
          street: point.adress.street,
          number: point.adress.number,
        },
      };
    });
    try {
      const data = pointsFormatted.filter((point) => {
        return point.adress.state === req.query.state;
      });

      if (req.query.state === 'Todos') {
        return res.status(200).json(pointsFormatted);
      } else if (data.length === 1) {
        return res.status(200).json([...data]);
      } else {
        return res.status(200).json(data);
      }
    } catch (error) {
      res.json('Erro ao buscar pontos de coleta');
    }
  }

  if (req.method === 'POST') {
    const { id, name, category, image, adress } = req.body;
    const point = {
      id,
      name,
      category,
      image,
      adress,
    };

    points.push(point);
    fs.writeFileSync(
      '/home/eduardor2m/Documents/projects/myprojects/ecoleta/src/database/points.json',
      JSON.stringify(points)
    );

    return res.status(200).json(point);
  }
}
