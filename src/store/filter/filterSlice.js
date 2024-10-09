import { createSlice } from '@reduxjs/toolkit';
import { ALL_CATEGORY_ID } from '@/constants';
import {
  setMinPrice,
  setMaxPrice,
  setTitle,
  setCategoryId,
  resetFilter,
} from './filterActions';

const initialState = {
  minPrice: 0,
  maxPrice: 0,
  title: '',
  categoryId: ALL_CATEGORY_ID,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setMinPrice, (state, action) => {
        state.minPrice = action.payload;
      })
      .addCase(setMaxPrice, (state, action) => {
        state.maxPrice = action.payload;
      })
      .addCase(setTitle, (state, action) => {
        state.title = action.payload;
      })
      .addCase(setCategoryId, (state, action) => {
        state.categoryId = action.payload;
      })
      .addCase(resetFilter, () => initialState);
  },
});

export default filterSlice.reducer;
