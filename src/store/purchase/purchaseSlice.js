import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  error: null,
};

const purchaseSlice = createSlice({
  name: 'purchase',
  initialState,
  reducers: {
    purchaseStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    purchaseSuccess: (state) => {
      state.isLoading = false;
      state.error = null;
    },
    purchaseFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { purchaseStart, purchaseSuccess, purchaseFailure } =
  purchaseSlice.actions;

export default purchaseSlice.reducer;
