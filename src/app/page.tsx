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
    <main className="p-6 relative h-screen w-screen">
      <Banner />
      <div className="flex flex-col items-center !my-5">
        <h1 className="text-3xl font-bold text-gray-400 font-serif !mt-1">
          Start Skipping Lines Now
        </h1>
        <Image 
          src="/logo.png" 
          alt="Logo"
          width={180}
          height={180}
          className="!my-10 rounded-lg w-[20%] h-auto shadow-2xl hover:shadow-lg transform transition-all duration-600 ease-in-out hover:scale-105"
        />
        <button
          className="bg-white text-cyan-600 border border-cyan-600 font-semibold !p-3 rounded transform transition-all duration-300 ease-in-out hover:scale-105 hover:bg-cyan-600 hover:text-white hover:border-transparent cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            router.push("/restaurants");
          }}
        >
          View Restaurant
        </button>
      </div>
      <div className="absolute bottom-0 right-5 font-small text-gray-400">by Bananamilk</div>
    </main>
  );
}
