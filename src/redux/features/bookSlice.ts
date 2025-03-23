import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type BookState = {
    bookItems: BookingItem[]
}

const initialState: BookState = {
    bookItems: []
}

export const bookSlice = createSlice({
    name: "book",
    initialState: initialState,
    reducers: {
        addBooking: (state, action: PayloadAction<BookingItem>) => {
            const existingBooking = state.bookItems.find((item) => item.bookDate === action.payload.bookDate && item.venue === action.payload.venue);
                    if (!existingBooking) {
                        state.bookItems.push(action.payload);
                    }
                    else {
                        //replace name and tel as the newest booking
                        state.bookItems.splice(state.bookItems.indexOf(existingBooking), 1, action.payload)
                    }
        },

        removeBooking: (state, action: PayloadAction<BookingItem>) => {
            const index = state.bookItems.findIndex(
                (item) =>
                    item.bookDate === action.payload.bookDate &&
                    item.venue === action.payload.venue &&
                    item.nameLastname === action.payload.nameLastname &&
                    item.tel === action.payload.tel
            );
            if (index !== -1) {
                state.bookItems.splice(index, 1);
            }
        },
    }
})

export const { addBooking, removeBooking } = bookSlice.actions
export default bookSlice.reducer