import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum AppView {
   Login = 'login',
   Dashboard = 'dashboard',
   Booking = 'booking',
   Success = 'success',
}

interface ViewState {
   current: AppView;
}

const initialState: ViewState = {
   current: AppView.Login,
};

export const viewSlice = createSlice({
   name: 'view',
   initialState,
   reducers: {
      goToView: (state, action: PayloadAction<AppView>) => {
         state.current = action.payload;
      },
   },
});

export const { goToView } = viewSlice.actions;
