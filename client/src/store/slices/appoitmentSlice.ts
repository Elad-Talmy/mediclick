import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Appointment } from '../../types';
import { getAppointments } from '../../services';

type AppointmentState = {
   data: {
      upcoming: Appointment[];
      past: Appointment[];
   };
};

export const fetchAppointments = createAsyncThunk<AppointmentState['data']>(
   'appointment/fetchAppointments',
   async (_, thunkAPI) => {
      try {
         return await getAppointments();
      } catch {
         return thunkAPI.rejectWithValue('Failed to load appointments');
      }
   }
);

export const appointmentSlice = createSlice({
   name: 'appointment',
   initialState: {
      data: { upcoming: [], past: [] },
   } as AppointmentState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(fetchAppointments.fulfilled, (state, action) => {
         state.data = action.payload;
      });
   },
});
