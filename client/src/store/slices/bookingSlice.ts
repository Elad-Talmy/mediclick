import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Appointment, BookingState, BookingStep, Doctor } from '../../types';
import { loadBookingSession } from '../../context/BookingStorage';

export const STEP_ORDER = [
   BookingStep.Specialty,
   BookingStep.Doctor,
   BookingStep.Time,
   BookingStep.Confirm,
] as const;

const persisted = loadBookingSession();

const initialState: BookingState = persisted || {
   step: BookingStep.Specialty,
   selectedSpecialty: null,
   selectedDoctor: null,
   selectedTime: null,
   rescheduleId: null,
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
      setDoctor: (state, action: PayloadAction<Doctor>) => {
         state.selectedDoctor = action.payload;
         state.step = BookingStep.Time;
      },
      setTime: (state, action: PayloadAction<string>) => {
         state.selectedTime = action.payload;
         state.step = BookingStep.Confirm;
      },
      goToPreviousStep: (state) => {
         const currentIndex = STEP_ORDER.indexOf(state.step);
         if (currentIndex > 0) {
            state.step = STEP_ORDER[currentIndex - 1];
         }
      },
      resumeBooking: (state, action: PayloadAction<Appointment>) => {
         state.step = BookingStep.Time;
         state.selectedSpecialty = action.payload.specialty;
         state.selectedDoctor = action.payload.doctor;
         state.selectedTime = null;
      },
      setReschedule: (state, action: PayloadAction<string>) => {
         state.rescheduleId = action.payload;
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
   resumeBooking,
   setReschedule,
   resetBooking,
} = bookingSlice.actions;
