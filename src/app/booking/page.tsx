'use client'
import DateReserve from '@/components/DateReserve';
import { TextField, Select, MenuItem, Button, InputLabel, FormControl, Box } from '@mui/material';
// import { getServerSession } from 'next-auth';
// import { authOptions } from '../api/auth/[...nextauth]/authOptions';
// import getUserProfile from '@/libs/getUserProfile';
import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { addBooking } from '@/redux/features/bookSlice';


export default function BookingPage() {

    /* const session = await getServerSession(authOptions)
    if(!session || !session.user.token) return null;

    const profile = await getUserProfile(session.user.token)
    var createdAt = new Date(profile.data.createdAt) */


    const dispatch = useDispatch<AppDispatch>();

    const makeBooking = () => {
        if(name && number && venue && date) {
            const item: BookingItem = {
                nameLastname: name,
                tel: number,
                bookDate: dayjs(date).format('YYYY-MM-DD'),
                venue: venue
            }
            dispatch(addBooking(item));
        }
    }

    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [venue, setVenue] = useState('');
    const [date, setDate] = useState<Dayjs | null>(null);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!name || !number || !venue || !date) {
            alert("Please fill in all fields.");
            return;
        }
        alert(`Name: ${name}\nContact Number: ${number}\nVenue: ${venue}\nDate: ${date}`);
        makeBooking();
    }


    return (
        <main className="!bg-gray-700 !min-h-screen">
            <div className="flex items-center justify-center !pt-4">
                <div className="text-[3vh] text-sky-600 font-bold !p-4 bg-white rounded-xl shadow-lg mx-auto transform transition-all duration-300 ease-in-out hover:scale-105">
                    Venue Booking
                </div>
            </div>

            {/* <div className='bg-slate-100 text-black !m-5 !p-5 w-1/3 !shadow-lg !rounded-lg'>
                <table className='table-auto border-separate border-spacing-2 border-black'>
                    <tbody>
                        <tr><td>Name</td><td>{profile.data.name}</td></tr>
                        <tr><td>Email</td><td>{profile.data.email}</td></tr>
                        <tr><td>Tel</td><td>{profile.data.tel}</td></tr>
                        <tr><td>Member Since</td><td>{createdAt.toDateString()}</td></tr>
                    </tbody>
                </table>
            </div> */}

            <form onSubmit={handleSubmit}>
                <div className="!pl-5 !pt-5">
                    <TextField label="Name-Lastname" variant="standard" id="Name-Lastname" name="Name-Lastname"
                    className="w-1/5 bg-white !shadow-lg !rounded-lg"
                    value={name} onChange={(e) => setName(e.target.value)}/>
                </div>

                <div className="!pl-5 !pt-5">
                    <TextField label="Contact-Number" variant="standard" id="Contact-Number" name="Contact-Number"
                    className="w-1/5 bg-white !shadow-lg !rounded-lg" 
                    value={number} onChange={(e) => setNumber(e.target.value)}/>
                </div>

                <div className="!pl-5 !pt-5">
                    <FormControl className="w-1/3 !bg-white !shadow-lg !rounded-lg">
                        <InputLabel id="venue-label">Select Venue</InputLabel>
                            <Select
                                labelId="venue-label"
                                id="venue"
                                name="venue"
                                label="Select Venue"
                                value={venue}
                                onChange={(e) => setVenue(e.target.value)}
                            >
                                <MenuItem value="Bloom">The Bloom Pavilion</MenuItem>
                                <MenuItem value="Spark">Spark Space</MenuItem>
                                <MenuItem value="GrandTable">The Grand Table</MenuItem>
                            </Select>
                    </FormControl>
                </div>
                    
                <div className="!pl-5 !pt-5">
                    <DateReserve setDate={(date: Dayjs | null) => setDate(date)}/>
                    <Button type="submit" variant="contained" color="primary" className="!bg-sky-600 !shadow-lg shadow-gray-900 !rounded-lg !mt-5">
                        Book Venue
                    </Button>
                </div>
            </form>
            

        </main>
    );
}