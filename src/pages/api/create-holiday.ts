import type { NextApiRequest, NextApiResponse } from 'next';

import fs from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';

import { Holidays } from '../../types/holidays';

export default async function create(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    let holidays: Holidays[] = [];

    fs.readFile(path.join(__dirname, 'holidays.json'), 'utf-8', (err, data) => {
      if (err) {
        console.log(err);
      } else {
        holidays = JSON.parse(data);

        const { date, name } = req.body;

        const holiday = {
          date,
          name,
          id: randomUUID(),
        };

        holidays.push(holiday);

        fs.writeFile(
          path.join(__dirname, 'holidays.json'),
          JSON.stringify(holidays),
          (err) => {
            if (err) {
              return res.status(500).json({ error: err.message });
            } else {
              return res.status(201).json(holiday);
            }
          }
        );
      }
    });
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
