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
    </main>
  );
}
