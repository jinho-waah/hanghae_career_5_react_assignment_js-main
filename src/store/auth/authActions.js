import { registerUserAPI } from '@/api/auth';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ email, password, name }, { rejectWithValue }) => {
    try {
      return await registerUserAPI(email, password, name);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
