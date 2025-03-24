import styles from "./topmenu.module.css";
import Image from "next/image";
import TopMenuItem from "./TopMenuItem";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { Link } from "@mui/material";

export default async function TopMenu() {
    const session = await getServerSession(authOptions);

    return (
        <div className={styles.menucontainer}>
        {/* Right Side: Logo and Main Nav */}
        <div className="flex flex-row-reverse absolute right-0 h-full items-center space-x-4 space-x-reverse">
            <Link href="/" className="flex items-center h-full">
            <Image
                src={"/logo_transparent.png"}
                className={styles.logoimg}
                alt="logo"
                width={0}
                height={0}
                sizes="100vh"
            />
            </Link>
            { session?.user.role !== "admin" ? (
                <TopMenuItem title="Booking" pageRef="booking" />
            ) : (
                <div className="flex flex-row-reverse h-full items-center space-x-4 space-x-reverse">
                    <TopMenuItem title="Booking" pageRef="booking" />
                    <TopMenuItem title="Manage Restaurant" pageRef="manage" />
                </div>
            )
            }
            
        </div>

        {/* Left Side: Auth and MyBooking */}
        <div className="flex flex-row absolute left-0 h-full items-center space-x-4 pl-4">
            {session ? (
            <Link href="/api/auth/signout" className="text-white !px-4">
                Sign-out
            </Link>
            ) : (
            <div className="flex flex-row !px-4">
                <Link href="/api/auth/signin" className="text-white !px-4">
                    Sign-in
                </Link>
                <Link href="/api/auth/signup" className="text-white !px-4">
                    Sign-up
                </Link>
            </div>
            )}

            <TopMenuItem title="My Booking" pageRef="mybooking" />
        </div>
        </div>
    );
}
