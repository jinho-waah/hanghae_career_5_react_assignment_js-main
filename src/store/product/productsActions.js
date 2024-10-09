import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProducts, addProductAPI } from '@/api/product';

export const loadProducts = createAsyncThunk(
  'products/loadProducts',
  async ({ filter, pageSize, page, isInitial }, { rejectWithValue }) => {
    try {
      const result = await fetchProducts(filter, pageSize, page);
      return { ...result, isInitial };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addProduct = createAsyncThunk(
  'products/addProduct',
  async (productData, { rejectWithValue }) => {
    try {
      const newProduct = await addProductAPI(productData);
      return newProduct;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
