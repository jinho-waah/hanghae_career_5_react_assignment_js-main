import { createSlice } from '@reduxjs/toolkit';
import { registerUser } from './authActions';

const initialState = {
  isLogin: false,
  user: null,
  registerStatus: 'idle',
  registerError: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsLogin: (state, action) => {
      state.isLogin = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLogin = true;
    },
    logout: (state) => {
      state.isLogin = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.registerStatus = 'loading';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.registerStatus = 'succeeded';
        state.user = action.payload;
        state.isLogin = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.registerStatus = 'failed';
        state.registerError = action.payload || 'Registration failed';
      });
  },
});

export const { setIsLogin, setUser, logout } = authSlice.actions;

export default authSlice.reducer;
