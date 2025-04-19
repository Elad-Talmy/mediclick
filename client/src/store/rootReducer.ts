import { combineReducers } from '@reduxjs/toolkit';
import {
   uiSlice,
   bookingSlice,
   userSlice,
   medicalSlice,
   appointmentSlice,
   viewSlice,
   waitlistSlice,
} from './slices';

export const rootReducer = combineReducers({
   ui: uiSlice.reducer,
   booking: bookingSlice.reducer,
   user: userSlice.reducer,
   medical: medicalSlice.reducer,
   appointment: appointmentSlice.reducer,
   view: viewSlice.reducer,
   waitlist: waitlistSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
