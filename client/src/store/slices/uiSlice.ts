import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ToastType = 'success' | 'error';

type UiState = {
   isLoading: boolean;
   modal: null | string;
   toast: null | {
      message: string;
      type: ToastType;
   };
};

const initialState: UiState = {
   isLoading: false,
   modal: null,
   toast: null,
};

export const uiSlice = createSlice({
   name: 'ui',
   initialState,
   reducers: {
      setLoading: (state, action: PayloadAction<boolean>) => {
         state.isLoading = action.payload;
      },
      showToast: (
         state,
         action: PayloadAction<{ message: string; type: ToastType }>
      ) => {
         state.toast = action.payload;
      },
      clearToast: (state) => {
         state.toast = null;
      },
   },
});

export const { setLoading, showToast, clearToast } = uiSlice.actions;
