import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { cancelAppointment, getAppointments } from '../../services';
import { AppointmentState } from '../../types';

export const fetchAppointments = createAsyncThunk<AppointmentState>(
   'appointment/fetchAppointments',
   async (_, thunkAPI) => {
      try {
         return await getAppointments();
      } catch {
         return thunkAPI.rejectWithValue('Failed to load appointments');
      }
   }
);

export const removeAppointment = createAsyncThunk<AppointmentState, string>(
   'appointment/removeAppointment',
   async (id, thunkAPI) => {
      try {
         thunkAPI.dispatch(deleteAppointment(id));
         return await cancelAppointment(id);
      } catch {
         return thunkAPI.rejectWithValue('Failed to load appointments');
      }
   }
);

export const appointmentSlice = createSlice({
   name: 'appointment',
   initialState: {
      upcoming: [],
      past: [],
   } as AppointmentState,
   reducers: {
      deleteAppointment: (state, action: PayloadAction<string>) => {
         state.upcoming = state.upcoming.filter(
            (appointment) => appointment._id !== action.payload
         );
      },
   },
   extraReducers: (builder) => {
      builder.addCase(fetchAppointments.fulfilled, (state, action) => {
         state.past = action.payload.past;
         state.upcoming = action.payload.upcoming;
      });
   },
});

export const { deleteAppointment } = appointmentSlice.actions;
