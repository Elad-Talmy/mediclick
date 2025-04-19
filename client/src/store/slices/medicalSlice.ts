import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getSpecialities } from '../../services';

export const fetchMedicalFields = createAsyncThunk<string[]>(
   'medical/fetchFields',
   async (_, thunkAPI) => {
      try {
         return await getSpecialities();
      } catch {
         return thunkAPI.rejectWithValue('Failed to load medical fields');
      }
   }
);

export const medicalSlice = createSlice({
   name: 'medical',
   initialState: {
      fields: [] as string[],
   },
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(fetchMedicalFields.fulfilled, (state, action) => {
         state.fields = action.payload;
      });
   },
});
