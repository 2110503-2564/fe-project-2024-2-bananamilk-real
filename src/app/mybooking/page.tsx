'use client';
import { useState, useEffect } from "react";
import { editReservation } from "@/libs/api"; // Import the API function

export default function BookingList() {
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState("");
    const [editMode, setEditMode] = useState(false);
    const [editingBooking, setEditingBooking] = useState<any>(null);
    const [formData, setFormData] = useState({ reservationDate: "" });

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
    
        // Convert the reservation date to GMT+7 for display in the `datetime-local` input
        const date = new Date(booking.reservationDate);
        const offset = 7 * 60; // GMT+7 offset in minutes
        const localDate = new Date(date.getTime() + offset * 60 * 1000);
        const reservationDate = localDate.toISOString().slice(0, 16);
    
        setFormData({
            reservationDate: reservationDate || "",
        });
    };
    

    // Handles input changes in the edit form
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Submits updated reservation data using `editReservation`
    const handleSave = async () => {
        if (!editingBooking) return;

        try {
            const updatedData = await editReservation(editingBooking._id, formData);
            console.log("Reservation updated:", updatedData);

            // Update the bookings state with the updated reservation details
            setBookings((prevBookings: any) =>
                prevBookings.map((booking: any) =>
                    booking._id === editingBooking._id
                        ? { ...booking, reservationDate: formData.reservationDate }
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

    if (error) {
        return <p style={{ color: "red", margin: "1rem" }}>{error}</p>;
    }

    return (
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
                                {new Date(booking.reservationDate).toLocaleString("en-US", {
                                    timeZone: "Asia/Bangkok",
                                })}
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
                                {new Date(booking.createdAt).toLocaleString("en-US", {
                                    timeZone: "Asia/Bangkok",
                                })}
                            </p>

                            {/* Edit Button */}
                            <button
                                className="absolute bottom-4 right-4 !px-4 !py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none"
                                onClick={() => handleEdit(booking)}
                            >
                                Edit
                            </button>
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
                            <div className="!mb-4">
                                <label className="block text-sm font-medium">Reservation Date:</label>
                                <input
                                    type="datetime-local"
                                    name="reservationDate"
                                    value={formData.reservationDate}
                                    onChange={handleChange}
                                    className="w-full !p-2 border rounded"
                                />
                            </div>

                            <div className="flex justify-end !space-x-3">
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
