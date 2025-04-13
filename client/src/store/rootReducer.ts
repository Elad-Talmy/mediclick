import { combineReducers } from '@reduxjs/toolkit';
import { uiSlice } from './slices/uiSlice';
import { bookingSlice } from './slices/bookingSlice';
import { userSlice } from './slices/userSlice';
import { medicalSlice } from './slices/medicalSlice';
import { appointmentSlice } from './slices/appoitmentSlice';
import { viewSlice } from './slices/viewSlice';
//fix imports

export const rootReducer = combineReducers({
   ui: uiSlice.reducer,
   booking: bookingSlice.reducer,
   user: userSlice.reducer,
   medical: medicalSlice.reducer,
   appointment: appointmentSlice.reducer,
   view: viewSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
