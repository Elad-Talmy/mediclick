import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getMedicalFields } from '../../services';
import { MedicalField } from '../../types';

export const fetchMedicalFields = createAsyncThunk<MedicalField[]>(
   'medical/fetchFields',
   async (_, thunkAPI) => {
      try {
         return await getMedicalFields();
      } catch {
         return thunkAPI.rejectWithValue('Failed to load medical fields');
      }
   }
);

export const medicalSlice = createSlice({
   name: 'medical',
   initialState: {
      fields: [] as MedicalField[],
   },
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(fetchMedicalFields.fulfilled, (state, action) => {
         state.fields = action.payload;
      });
   },
});
