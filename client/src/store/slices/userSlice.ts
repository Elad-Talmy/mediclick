import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUser } from '../../services';

export type User = {
   isNew: boolean;
   name: string;
};

export const fetchUser = createAsyncThunk<User>(
   'user/fetchUser',
   async (_, thunkAPI) => {
      try {
         const token = localStorage.getItem('token');
         return await getUser(token!);
      } catch (error) {
         return thunkAPI.rejectWithValue('Failed to fetch user');
      }
   }
);

export const userSlice = createSlice({
   name: 'user',
   initialState: {
      data: null as User | null,
      status: 'idle',
   },
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(fetchUser.pending, (state) => {
            state.status = 'loading';
         })
         .addCase(fetchUser.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.data = action.payload;
         })
         .addCase(fetchUser.rejected, (state) => {
            state.status = 'failed';
         });
   },
});
