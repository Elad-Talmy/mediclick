import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RequestField } from '../../types';

export enum BookingStep {
   Specialty = 'specialty',
   Doctor = 'doctor',
   Time = 'time',
   Confirm = 'confirm',
}

const STEP_ORDER = [
   BookingStep.Specialty,
   BookingStep.Doctor,
   BookingStep.Time,
   BookingStep.Confirm,
] as const;

interface BookingState {
   step: BookingStep;
   selectedSpecialty: RequestField | null;
   selectedDoctor: RequestField | null;
   selectedTime: RequestField | null;
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
      setSpecialty: (state, action: PayloadAction<RequestField>) => {
         state.selectedSpecialty = action.payload;
         state.step = BookingStep.Doctor;
      },
      setDoctor: (state, action: PayloadAction<RequestField>) => {
         state.selectedDoctor = action.payload;
         state.step = BookingStep.Time;
      },
      setTime: (state, action: PayloadAction<RequestField>) => {
         state.selectedTime = action.payload;
         state.step = BookingStep.Confirm;
      },
      goToPreviousStep: (state) => {
         const currentIndex = STEP_ORDER.indexOf(state.step);
         if (currentIndex > 0) {
            state.step = STEP_ORDER[currentIndex - 1];
         }
      },

      resetBooking: () => initialState,
   },
});

export const {
   goToStep,
   setSpecialty,
   setDoctor,
   setTime,
   goToPreviousStep,
   resetBooking,
} = bookingSlice.actions;
