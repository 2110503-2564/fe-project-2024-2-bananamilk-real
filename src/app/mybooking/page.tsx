'use client'
import BookingList from "@/components/BookingList"

export default function MyBooking() {
    return (
        <main>
            <h1 className="text-lg font-medium !py-5">My Booking</h1>
            <BookingList></BookingList>
        </main>
    )
}