'use client'
import styles from "./banner.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSession } from "next-auth/react";

export default function Banner () {
    const router = useRouter();
    const covers = ['res1.jpg', 'res2.jpg', 'res3.jpg', 'res4.jpg'];
    const [index, setIndex] = useState(0);
    const { data: session } = useSession();
    // console.log("token "+session?.user.token);
    console.log("user "+session?.user);

    return (
        <div className={styles.img} onClick={() => setIndex(index+1)}>
        <img 
            src={covers[index%4]} 
            alt="Banner" 
            className={styles.image} 
        />
        <div className={styles.overlay}>
            <h1 className="text-4xl font-medium pb-10">Where every one finds their restaurants</h1> 
            <p className="!mt-4 text-xl font-serif">
            Finding the perfect restaurant has never been easier. Whether it's a fine dining, casual, or family restaurant, we connect people to the perfect place.
            </p>
        </div>

        {
            session? 
            <div className="z-30 absolute right-10 top-5 font-semibold text-yellow-400 text-xl">Hello {session.user?.name}</div> 
            : null
        }

        <button
        className="bg-white text-cyan-600 border-cyan-600 font-semibold !py-2 !px-2 !m-2 rounded z-30 !absolute !bottom-0 !right-0
                    transform transition-all duration-300 ease-in-out hover:scale-105 hover:bg-cyan-600 hover:text-white hover:border-transparent"
        onClick={(e) => { e.stopPropagation(); router.push("/restaurants") }}
        >
        Select Restaurant
        </button>

        </div>
    );
};
