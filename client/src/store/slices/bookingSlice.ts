import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type BookingStep = 'specialty' | 'doctor' | 'time' | 'confirm';

interface BookingState {
   step: BookingStep;
   selectedSpecialty: string | null;
   selectedDoctor: string | null;
   selectedTime: string | null;
}

const initialState: BookingState = {
   step: 'specialty',
   selectedSpecialty: null,
   selectedDoctor: null,
   selectedTime: null,
};

export const bookingSlice = createSlice({
   name: 'booking',
   initialState,
   reducers: {
      goToStep: (state, action: PayloadAction<BookingStep>) => {
         state.step = action.payload;
      },
      setSpecialty: (state, action: PayloadAction<string>) => {
         state.selectedSpecialty = action.payload;
         state.step = 'doctor';
      },
      setDoctor: (state, action: PayloadAction<string>) => {
         state.selectedDoctor = action.payload;
         state.step = 'time';
      },
      setTime: (state, action: PayloadAction<string>) => {
         state.selectedTime = action.payload;
         state.step = 'confirm';
      },
      resetBooking: () => initialState,
   },
});

export const { goToStep, setSpecialty, setDoctor, setTime, resetBooking } =
   bookingSlice.actions;
