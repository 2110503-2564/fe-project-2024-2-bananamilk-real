'use client';
import { useState, useEffect } from "react";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { editReservation, deleteReservation } from "@/libs/api"; // Import API functions

// Extend dayjs with the UTC plugin
dayjs.extend(utc);

export default function BookingList() {
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState("");
    const [editMode, setEditMode] = useState(false);
    const [editingBooking, setEditingBooking] = useState<any>(null);
    const [formData, setFormData] = useState<Dayjs | null>(null);

    useEffect(() => {
        const fetchBookings = async () => {
            setError("");

            try {
                const token = await getToken();

                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/reservations`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await response.json();
                if (response.ok && data.success) {
                    setBookings(data.data);
                } else {
                    setError(data.message || "Failed to fetch bookings.");
                }
            } catch (err) {
                console.error(err);
                setError("An error occurred. Please try again.");
            }
        };

        fetchBookings();
    }, []);

    // Opens edit mode for a specific booking
    const handleEdit = (booking: any) => {
        setEditMode(true);
        setEditingBooking(booking);
    
        // Convert the reservation date to Dayjs format in GMT+7
        const reservationDate = dayjs(booking.reservationDate).utcOffset(7);
        setFormData(reservationDate || null);
    };

    // Submits updated reservation data using `editReservation`
    const handleSave = async () => {
        if (!editingBooking || !formData) return;

        try {
            const reservationDate = formData.utc().toISOString(); // Convert to UTC
            const updatedData = await editReservation(editingBooking._id, { reservationDate });
            console.log("Reservation updated:", updatedData);

            // Update the bookings state with the updated reservation details
            setBookings((prevBookings: any) =>
                prevBookings.map((booking: any) =>
                    booking._id === editingBooking._id
                        ? { ...booking, reservationDate }
                        : booking
                )
            );

            setEditMode(false);
            setEditingBooking(null);
        } catch (err: any) {
            console.error("Error saving changes:", err);
            setError(err.message || "An error occurred while saving changes.");
        }
    };

    // Deletes a reservation
    const handleDelete = async (bookingId: string) => {
        const confirmed = window.confirm("Are you sure you want to delete this reservation?");
        if (!confirmed) return;

        try {
            await deleteReservation(bookingId);
            console.log(`Reservation with ID ${bookingId} deleted.`);

            // Remove the reservation from the state
            setBookings((prevBookings) =>
                prevBookings.filter((booking:any) => booking._id !== bookingId)
            );
        } catch (err) {
            console.error("Error deleting reservation:", err);
            setError("Failed to delete the reservation. Please try again.");
        }
    };

    if (error) {
        return <p style={{ color: "red", margin: "1rem" }}>{error}</p>;
    }

    return (
        <div className="bg-black text-white h-screen w-screen">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className="!m-5 !p-5">
                    <h1 className="text-xl font-semibold !mb-5">My Bookings</h1>
                    {bookings.length === 0 ? (
                        <p className="text-gray-500">No bookings found.</p>
                    ) : (
                        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                            {bookings.map((booking: any) => (
                                <div
                                    key={booking._id}
                                    className="border rounded-lg shadow-lg !p-5 bg-white text-black relative"
                                >
                                    <h2 className="text-lg font-medium !mb-3 text-blue-700">
                                        {booking.restaurant.name}
                                    </h2>
                                    <p>
                                        <strong>Reservation Date:</strong>{" "}
                                        {dayjs(booking.reservationDate).utcOffset(7).format('YYYY-MM-DD HH:mm')}
                                    </p>
                                    <p>
                                        <strong>Address:</strong> {booking.restaurant.address}
                                    </p>
                                    <p>
                                        <strong>Telephone:</strong> {booking.restaurant.tel}
                                    </p>
                                    <p>
                                        <strong>Work Time:</strong> {booking.restaurant.worktime}
                                    </p>
                                    <p>
                                        <strong>User ID:</strong> {booking.user}
                                    </p>
                                    <p>
                                        <strong>Created At:</strong>{" "}
                                        {dayjs(booking.createdAt).utcOffset(7).format('YYYY-MM-DD HH:mm')}
                                    </p>

                                    <div className="flex justify-between mt-4">
                                        {/* Edit Button */}
                                        <button
                                            className="!px-4 !py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none"
                                            onClick={() => handleEdit(booking)}
                                        >
                                            Edit
                                        </button>
                                        {/* Delete Button */}
                                        <button
                                            className="!px-4 !py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none"
                                            onClick={() => handleDelete(booking._id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Edit Form (Modal Style) */}
                    {editMode && editingBooking && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                            <div className="bg-white !p-5 rounded-lg shadow-lg w-96 text-black">
                                <h2 className="text-lg font-medium !mb-3">Edit Reservation</h2>
                                <form>
                                    {/* Display Restaurant Work Time */}
                                    <div className="!mb-4">
                                        <label className="block text-sm font-medium">Work Time:</label>
                                        <div className="bg-gray-100 !p-2 border rounded">
                                            {editingBooking.restaurant.worktime}
                                        </div>
                                    </div>
                                    {/* Editable Reservation Date */}
                                    <DateTimePicker
                                        label="Reservation Date & Time"
                                        value={formData}
                                        onChange={(newValue) => setFormData(newValue)}
                                        className="w-full !bg-white !shadow-sm !rounded-lg"
                                    />
                                    <div className="flex justify-end !space-x-3 !mt-4">
                                        <button
                                            type="button"
                                            onClick={() => setEditMode(false)}
                                            className="!px-4 !py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleSave}
                                            className="!px-4 !py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                        >
                                            Save
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </LocalizationProvider>
        </div>
    );
}

// Example utility function to fetch token (adjust as per your setup)
async function getToken() {
    const res = await fetch("/api/auth/session");
    if (res.ok) {
        const session = await res.json();
        return session.user.token;
    }
    return null;
}
