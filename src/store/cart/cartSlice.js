import { createSlice } from '@reduxjs/toolkit';
import {
  getCartFromLocalStorage,
  resetCartAtLocalStorage,
  setCartToLocalStorage,
  calculateTotal,
} from './cartUtils';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: [],
    totalCount: 0,
    totalPrice: 0,
  },
  reducers: {
    initCart: (state, action) => {
      const userId = action.payload;
      if (!userId) return;
      const prevCartItems = getCartFromLocalStorage(userId);
      const total = calculateTotal(prevCartItems);
      state.cart = prevCartItems;
      state.totalCount = total.totalCount;
      state.totalPrice = total.totalPrice;
    },
    resetCart: (state, action) => {
      const userId = action.payload;
      resetCartAtLocalStorage(userId);
      state.cart = [];
      state.totalCount = 0;
      state.totalPrice = 0;
    },
    addCartItem: (state, action) => {
      const { item, userId, count } = action.payload;
      const existingItemIndex = state.cart.findIndex(
        (cartItem) => cartItem.id === item.id
      );
      if (existingItemIndex !== -1) {
        state.cart[existingItemIndex].count += count;
      } else {
        state.cart.push({ ...item, count });
      }
      const total = calculateTotal(state.cart);
      state.totalCount = total.totalCount;
      state.totalPrice = total.totalPrice;
      setCartToLocalStorage(state.cart, userId);
    },
    removeCartItem: (state, action) => {
      const { itemId, userId } = action.payload;
      state.cart = state.cart.filter((item) => item.id !== itemId);
      const total = calculateTotal(state.cart);
      state.totalCount = total.totalCount;
      state.totalPrice = total.totalPrice;
      setCartToLocalStorage(state.cart, userId);
    },
    changeCartItemCount: (state, action) => {
      const { itemId, count, userId } = action.payload;
      const itemIndex = state.cart.findIndex((item) => item.id === itemId);
      if (itemIndex !== -1) {
        state.cart[itemIndex].count = count;
        const total = calculateTotal(state.cart);
        state.totalCount = total.totalCount;
        state.totalPrice = total.totalPrice;
        setCartToLocalStorage(state.cart, userId);
      }
    },
  },
});

export const {
  initCart,
  resetCart,
  addCartItem,
  removeCartItem,
  changeCartItemCount,
} = cartSlice.actions;

export default cartSlice.reducer;
