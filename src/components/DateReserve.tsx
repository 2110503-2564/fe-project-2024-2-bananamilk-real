'use client'

import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState } from 'react';
import { Dayjs } from 'dayjs';

export default function DateReserve({ setDate }: { setDate: (date: Dayjs | null) => void }) {
    const [date, setDateState] = useState<Dayjs | null>(null);;
    return (
        <form className="w-1/5  bg-white shadow-lg rounded-lg">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker className="w-full"
                    value={date} onChange={(newValue) => {
                        setDateState(newValue);
                        setDate(newValue);
                    }}/>
            </LocalizationProvider>
        </form>
    );
}