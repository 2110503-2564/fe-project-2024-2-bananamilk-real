'use client'
import { Select, MenuItem, Button, InputLabel, FormControl } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState, useEffect } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc'; // <-- Import utc plugin
import { useRouter } from 'next/navigation';
import { fetchRestaurants } from '@/libs/api';

// Extend dayjs with the UTC plugin
dayjs.extend(utc);

export default function BookingPage() {

    const router = useRouter();

    const [venue, setVenue] = useState('');
    const [date, setDate] = useState<Dayjs | null>(dayjs().utc());
    const [restaurants, setRestaurants] = useState<{ _id: string, name: string }[]>([]);

    useEffect(() => {
        fetchRestaurants().then(data => setRestaurants(data));
    }, []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!venue || !date) {
            alert("Please select a restaurant and date/time.");
            return;
        }

        // explicitly convert to UTC
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

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <main className="!bg-gray-700 !min-h-screen">
                <div className="flex items-center justify-center !pt-4">
                    <div className="text-[3vh] text-sky-600 font-bold !p-4 bg-white rounded-xl shadow-lg mx-auto transform transition-all duration-300 ease-in-out hover:scale-105">
                        Restaurant Booking
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col items-start !pl-5 !pt-5 space-y-4">

                    <FormControl className="w-1/3 !bg-white !shadow-lg !rounded-lg">
                        <InputLabel>Select Restaurant</InputLabel>
                        <Select value={venue} onChange={(e) => setVenue(e.target.value)} label="Select Restaurant">
                            {restaurants.map(restaurant => (
                                <MenuItem key={restaurant._id} value={restaurant._id}>{restaurant.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <DateTimePicker
                        label="Reservation Date & Time"
                        value={date}
                        onChange={(newValue) => setDate(newValue)}
                        className="w-1/3 !bg-white !shadow-lg !rounded-lg"
                    />

                    <Button type="submit" variant="contained" className="!bg-sky-600 !shadow-lg !rounded-lg !mt-5">
                        Book Restaurant
                    </Button>
                </form>
            </main>
        </LocalizationProvider>
    );
}
