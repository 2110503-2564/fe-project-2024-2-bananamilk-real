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
        <TopMenuItem title="Booking" pageRef="booking" />
        <TopMenuItem title="Manage Reservation" pageRef="managereservation" />
        <TopMenuItem title="Manage Restaurant" pageRef="manage" />
      </div>

      {/* Left Side: Auth and MyBooking */}
      <div className="flex flex-row absolute left-0 h-full items-center space-x-4 pl-4">
        {session ? (
          <Link href="/api/auth/signout" className="text-white">
            Sign-out
          </Link>
        ) : (
          <Link href="/api/auth/signin" className="text-white">
            Sign-in
          </Link>
        )}

        <span className="text-black">Sign-up</span>

        <TopMenuItem title="My Booking" pageRef="mybooking" />
      </div>
    </div>
  );
}
