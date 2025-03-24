'use client'
import { useEffect, useState } from 'react';
import { fetchRestaurants } from '@/libs/api';
import Banner from '../components/Banner';

export default function HomePage() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    fetchRestaurants().then(data => setRestaurants(data)).catch(console.error);
  }, []);

  return (
    
    <main className="p-6">
      <Banner></Banner>
      <h1 className="text-2xl font-bold mb-4">Restaurants</h1>
      <ul className="space-y-2">
        {restaurants.map((r: any) => (
          <li key={r._id} className="p-4 border rounded shadow">
            <h2 className="text-lg font-semibold">Name: {r.name}</h2>
            <p>Address: {r.address}</p>
            <p>Tel: {r.tel}</p>
            <p>Worktime: {r.worktime}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
