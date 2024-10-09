import { getItem, setItem } from '@/helpers/localStorage';
import { parseJSON } from '@/utils/common';

const CART_LOCAL_STORAGE_KEY = 'CART_LOCAL_STORAGE_KEY';

export const getCartFromLocalStorage = (userId) => {
  const cartData = getItem(CART_LOCAL_STORAGE_KEY);
  if (!cartData) {
    return [];
  }

  const cartItem = parseJSON(cartData) | null;
  return cartItem?.[userId] ?? [];
};

export const resetCartAtLocalStorage = (userId) => {
  const cartData = getItem(CART_LOCAL_STORAGE_KEY);
  const cartItem = cartData ? parseJSON(cartData) : {};

  setItem(CART_LOCAL_STORAGE_KEY, {
    ...cartItem,
    [userId]: [],
  });
};

export const setCartToLocalStorage = (cart, userId) => {
  const cartData = getItem(CART_LOCAL_STORAGE_KEY);
  const cartItem = cartData ? parseJSON(cartData) : {};

  setItem(CART_LOCAL_STORAGE_KEY, {
    ...cartItem,
    [userId]: cart,
  });
};

export const calculateTotal = (cart) =>
  cart.reduce(
    (acc, item) => ({
      totalCount: acc.totalCount + item.count,
      totalPrice: acc.totalPrice + item.price * item.count,
    }),
    { totalCount: 0, totalPrice: 0 }
  );
