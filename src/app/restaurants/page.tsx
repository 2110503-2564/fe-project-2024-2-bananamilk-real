'use client';

import { useEffect, useState } from 'react';
import { fetchRestaurants } from "@/libs/api";

export default function RestaurantsPage() {
    const [restaurants, setRestaurants] = useState<any[]>([]);

    useEffect(() => {
        fetchRestaurants()
        .then(data => {
            console.log("Fetched restaurants:", data);
            setRestaurants(data);
        })
        .catch(err => console.error("Failed to fetch restaurants:", err));
    }, []);

    return (
        <section className="min-h-screen bg-black !py-8">
        <h1 className="text-3xl font-bold text-white !px-4 !mb-6">Restaurants</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 !px-4">
            {restaurants.map((r: any, i: number) => (
            <div
                key={r._id}
                className="bg-white text-black rounded-xl overflow-hidden shadow-md transition-transform hover:scale-105"
            >
                <img
                src={`/res${(i % 4) + 1}.jpg`}
                alt={r.name}
                className="w-full h-48 object-cover"
                />
                <div className="!p-4">
                <h2 className="text-xl font-bold mb-2">{r.name}</h2>
                <p><span className="font-semibold">Address:</span> {r.address}</p>
                <p><span className="font-semibold">Tel:</span> {r.tel}</p>
                <p><span className="font-semibold">Worktime:</span> {r.worktime}</p>
                </div>
            </div>
            ))}
        </div>
        </section>
    );
}
