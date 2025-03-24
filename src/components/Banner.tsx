'use client';
import styles from "./banner.module.css";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function Banner() {
    const router = useRouter();
    const covers = ['res1.jpg', 'res2.jpg', 'res3.jpg', 'res4.jpg'];
    const [index, setIndex] = useState(0);
    const { data: session } = useSession();
    console.log("user " + session?.user);

    // Auto cycle the images
    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % covers.length);
        }, 10000); // Slide every 10 seconds
        return () => clearInterval(interval); // Cleanup interval on unmount
    }, []);

    return (
        <div className={`${styles.carousel} relative overflow-hidden h-[40%] w-full`}>
            {/* Sliding Images */}
            <div
                className={styles.slider}
                style={{
                    transform: `translateX(-${index * 100}%)`, // Move the slider
                }}
            >
                {covers.map((cover, idx) => (
                    <img
                        key={idx}
                        src={cover}
                        alt={`Slide ${idx + 1}`}
                        className={styles.slide}
                    />
                ))}
            </div>

            {/* Fixed Overlay */}
            <div className={styles.overlay}>
                <h1 className="text-4xl font-medium pb-10">Where everyone finds their restaurants</h1>
                <p className="!mt-4 text-xl font-serif">
                    Finding the perfect restaurant has never been easier. Whether it's fine dining, casual, or family restaurants, we connect people to the perfect place.
                </p>
            </div>

            {session ? (
                <div className="z-30 absolute right-10 top-5 font-semibold text-yellow-400 text-xl">
                    Hello {session.user?.name}
                </div>
            ) : null}

            {/* <button
                className="bg-white text-cyan-600 border-cyan-600 font-semibold !py-2 !px-2 !m-2 rounded z-30 !absolute !bottom-0 !right-0
                transform transition-all duration-300 ease-in-out hover:scale-105 hover:bg-cyan-600 hover:text-white hover:border-transparent"
                onClick={(e) => {
                    e.stopPropagation();
                    router.push("/restaurants");
                }}
            >
                Select Restaurant
            </button> */}
        </div>
    );
};
