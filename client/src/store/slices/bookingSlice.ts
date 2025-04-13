import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum BookingStep {
   Specialty = 'specialty',
   Doctor = 'doctor',
   Time = 'time',
   Confirm = 'confirm',
}

interface BookingState {
   step: BookingStep;
   selectedSpecialty: string | null;
   selectedDoctor: string | null;
   selectedTime: string | null;
}

const initialState: BookingState = {
   step: BookingStep.Specialty,
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
         state.step = BookingStep.Doctor;
      },
      setDoctor: (state, action: PayloadAction<string>) => {
         state.selectedDoctor = action.payload;
         state.step = BookingStep.Time;
      },
      setTime: (state, action: PayloadAction<string>) => {
         state.selectedTime = action.payload;
         state.step = BookingStep.Confirm;
      },
      resetBooking: () => initialState,
   },
});

export const { goToStep, setSpecialty, setDoctor, setTime, resetBooking } =
   bookingSlice.actions;
