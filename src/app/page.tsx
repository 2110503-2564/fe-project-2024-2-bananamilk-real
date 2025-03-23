'use client'
import { useEffect, useState } from 'react';
import { fetchRestaurants } from '@/libs/api';

export default function HomePage() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    fetchRestaurants().then(data => setRestaurants(data)).catch(console.error);
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Restaurants</h1>
      <ul className="space-y-2">
        {restaurants.map((r: any) => (
          <li key={r._id} className="p-4 border rounded shadow">
            <h2 className="text-lg font-semibold">{r.name}</h2>
            <p>{r.address}</p>
            <p>{r.telephone}</p>
            <p>{r.openingTime} - {r.closingTime}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
