'use client'
import { useAppSelector, AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { removeBooking } from "@/redux/features/bookSlice";
import bookSlice from '../redux/features/bookSlice';

export default function BookingList() {
    
    const Items = useAppSelector((state) => state.bookSlice.bookItems)
    const dispatch = useDispatch<AppDispatch>()
    
    
    return (
        <>
        {Items.length === 0 ? (
                <div className="text-center p-5">No Venue Booking</div>
            ) : (
                Items.map((bookingItem) => (
                    <div className="bg-slate-200 rounded !px-5 !mx-5 !py-2 !my-2 text-black" key={bookingItem.bookDate}>
                        <div className="text-lg font-semibold">Booking</div>
                        <div className="text-md">Name: {bookingItem.nameLastname}</div>
                        <div className="text-md">Tel: {bookingItem.tel}</div>
                        <div className="text-md">Venue: {bookingItem.venue}</div>
                        <div className="text-md">Date: {bookingItem.bookDate}</div>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold !py-2 !px-4 !my-5 rounded"
                            onClick={() => dispatch(removeBooking(bookingItem))}>Cancel Booking
                        </button>

                    </div>
                ))
            )}
        </>
    )
}