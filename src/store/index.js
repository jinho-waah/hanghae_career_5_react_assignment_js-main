import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import cartReducer from './cart/cartSlice';
import filterReducer from './filter/filterSlice';
import productsReducer from './product/productsSlice';
import purchaseSlice from './purchase/purchaseSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    filter: filterReducer,
    products: productsReducer,
    purchase: purchaseSlice,
  },
});
