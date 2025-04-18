import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WaitlistState {
   subscribedDoctorIds: string[];
}

const initialState: WaitlistState = {
   subscribedDoctorIds: [],
};

export const waitlistSlice = createSlice({
   name: 'waitlist',
   initialState,
   reducers: {
      subscribeDoctor: (state, action: PayloadAction<string>) => {
         if (!state.subscribedDoctorIds.includes(action.payload)) {
            state.subscribedDoctorIds.push(action.payload);
         }
      },
      unsubscribeDoctor: (state, action: PayloadAction<string>) => {
         state.subscribedDoctorIds = state.subscribedDoctorIds.filter(
            (id) => id !== action.payload
         );
      },
   },
});

export const { subscribeDoctor, unsubscribeDoctor } = waitlistSlice.actions;
