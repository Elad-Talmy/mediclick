import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   isLoading: false,
   modal: null as string | null,
};

export const uiSlice = createSlice({
   name: 'ui',
   initialState,
   reducers: {
      setLoading: (state, action) => {
         state.isLoading = action.payload;
      },
      openModal: (state, action) => {
         state.modal = action.payload;
      },
      closeModal: (state) => {
         state.modal = null;
      },
   },
});

export const { setLoading, openModal, closeModal } = uiSlice.actions;
