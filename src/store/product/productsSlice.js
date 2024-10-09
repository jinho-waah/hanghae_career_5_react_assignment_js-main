import { createSlice } from '@reduxjs/toolkit';
import { loadProducts, addProduct } from './productsActions';

const initialState = {
  items: [],
  hasNextPage: true,
  isLoading: false,
  error: null,
  totalCount: 0,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadProducts.fulfilled, (state, action) => {
        const { products, hasNextPage, totalCount, isInitial } = action.payload;
        state.items = isInitial ? products : [...state.items, ...products];
        state.hasNextPage = hasNextPage;
        state.totalCount = totalCount;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(loadProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
        state.totalCount += 1;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || '상품 등록에 실패하였습니다.';
      });
  },
});

export default productsSlice.reducer;
