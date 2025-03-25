'use client';
import { Select, MenuItem, Button, InputLabel, FormControl, TextField } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState, useEffect } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { useRouter } from 'next/navigation';
import { fetchRestaurants } from '@/libs/api';

// Extend dayjs with the UTC plugin
dayjs.extend(utc);

export default function BookingPage() {
    const router = useRouter();

    const [venue, setVenue] = useState('');
    const [date, setDate] = useState<Dayjs | null>(dayjs().utc());
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [restaurants, setRestaurants] = useState<{ _id: string, name: string, address: string, tel: string, worktime: string }[]>([]);

    // Fetch restaurants on component mount
    useEffect(() => {
        fetchRestaurants().then(data => setRestaurants(data));
    }, []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!venue || !date) {
            alert("Please fill out all fields.");
            return;
        }

        const reservationDate = dayjs(date).utc().toISOString();

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/restaurants/${venue}/reservations`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${await getToken()}`
                },
                body: JSON.stringify({ reservationDate }),
            });

            const json = await res.json();

            if (!res.ok) {
                alert(json.msg || 'Failed to create reservation');
                return;
            }

            alert('Reservation successfully created!');
            router.push('/mybooking');
        } catch (error) {
            console.error(error);
            alert('An error occurred while creating the reservation.');
        }
    };

    async function getToken() {
        const res = await fetch("/api/auth/session");
        if (res.ok) {
            const session = await res.json();
            return session.user.token;
        }
        return null;
    }

    // Find the selected restaurant details
    const selectedRestaurant = restaurants.find(r => r._id === venue);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <main className="!bg-black !min-h-screen absolute w-full">
                <div className="flex items-center justify-center !pt-4">
                    <div className="text-[3vh] text-sky-600 font-bold !p-4 bg-white rounded-xl shadow-lg mx-auto transform transition-all duration-300 ease-in-out hover:scale-105">
                        Restaurant Booking
                    </div>
                </div>

                <div className="flex !px-5 !pt-5">
                    {/* Booking Form */}
                    <form onSubmit={handleSubmit} className="flex flex-col w-2/3 space-y-4">

                    
                        {/* Name Field */}
                        {/* <TextField
                            label="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-4/5 !bg-white !shadow-lg !rounded-lg !my-5"
                        /> */}

                        {/* Contact Field */}
                        {/* <TextField
                            label="Contact Number"
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                            className="w-4/5 !bg-white !shadow-lg !rounded-lg !my-5"
                        /> */}

                        {/* Restaurant Selection */}
                        <FormControl className="w-4/5 !bg-white !shadow-lg !rounded-lg !my-5">
                            <InputLabel>Select Restaurant</InputLabel>
                            <Select
                                value={venue}
                                onChange={(e) => setVenue(e.target.value)}
                                label="Select Restaurant"
                            >
                                {restaurants.map(restaurant => (
                                    <MenuItem key={restaurant._id} value={restaurant._id}>{restaurant.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        {/* Date and Time Picker */}
                        <DateTimePicker
                            label="Reservation Date & Time"
                            value={date}
                            onChange={(newValue) => setDate(newValue)}
                            className="w-4/5 !bg-white !shadow-lg !rounded-lg !my-5"
                        />

                        {/* Submit Button */}
                        <Button type="submit" variant="contained" className="!bg-sky-600 !shadow-lg !rounded-lg w-1/5 !my-5 !p-3 !text-white">
                            Book Restaurant
                        </Button>
                    </form>

                    {/* Restaurant Preview */}
                    {selectedRestaurant && (
                        <div className="w-1/3 !pl-5 absolute right-10">
                            <div className="bg-white rounded-lg shadow-lg p-5 text-black">
                                <img
                                    src={`/res${Math.floor(Math.random() * 4) + 1}.jpg`}
                                    alt={selectedRestaurant.name}
                                    className="w-full h-48 object-cover rounded-lg"
                                />
                                <div className="!p-5">
                                <h2 className="text-lg font-bold !mt-3">{selectedRestaurant.name}</h2>
                                <p><strong>Address:</strong> {selectedRestaurant.address}</p>
                                <p><strong>Tel:</strong> {selectedRestaurant.tel}</p>
                                <p><strong>Work Time:</strong> {selectedRestaurant.worktime}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </LocalizationProvider>
    );
}
