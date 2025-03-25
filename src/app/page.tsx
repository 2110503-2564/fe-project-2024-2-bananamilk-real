'use client'
import { useEffect, useState } from 'react';
import { fetchRestaurants } from '@/libs/api';
import { useRouter } from "next/navigation";
import Banner from '../components/Banner';
import Image from 'next/image';

export default function HomePage() {
  const [restaurants, setRestaurants] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchRestaurants().then(data => setRestaurants(data)).catch(console.error);
  }, []);

  return (
    <main className="p-6 relative">
      <Banner />
      <div className="flex flex-col items-center mt-8">
        <h1 className="text-3xl font-bold text-gray-700 mb-6">
          Start Skipping Lines Now
        </h1>
        <Image 
          src="/logo.png" 
          alt="Logo"
          width={180}
          height={180}
          className="mb-10"
        />
        <button
          className="bg-white text-cyan-600 border border-cyan-600 font-semibold py-2 px-4 rounded transform transition-all duration-300 ease-in-out hover:scale-105 hover:bg-cyan-600 hover:text-white hover:border-transparent"
          onClick={(e) => {
            e.stopPropagation();
            router.push("/restaurants");
          }}
        >
          Select Restaurant
        </button>
      </div>
    </main>
  );
}
