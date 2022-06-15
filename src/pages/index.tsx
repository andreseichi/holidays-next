import { useEffect, useState } from 'react';

import { api } from '../services/api';

import { Holidays } from '../types/holidays';

export default function Home() {
  const [holidays, setHolidays] = useState<Holidays[]>([]);

  useEffect(() => {
    getHolidays();
  }, []);

  async function getHolidays() {
    try {
      const { data } = await api.get('holidays');

      setHolidays(data);

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  return <h1>hello world</h1>;
}
