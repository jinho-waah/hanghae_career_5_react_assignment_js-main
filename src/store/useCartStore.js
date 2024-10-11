import { create } from 'zustand';

// Helper functions for managing cart in localStorage
const getCartFromLocalStorage = (userId) => {
  const cartData = localStorage.getItem('CART_LOCAL_STORAGE_KEY');
  if (!cartData) return [];

  const cartItem = JSON.parse(cartData) || null;
  return cartItem?.[userId] ?? [];
};

const resetCartAtLocalStorage = (userId) => {
  const cartData = localStorage.getItem('CART_LOCAL_STORAGE_KEY');
  const cartItem = cartData ? JSON.parse(cartData) : {};

  localStorage.setItem(
    'CART_LOCAL_STORAGE_KEY',
    JSON.stringify({
      ...cartItem,
      [userId]: [],
    })
  );
};

const setCartToLocalStorage = (cart, userId) => {
  const cartData = localStorage.getItem('CART_LOCAL_STORAGE_KEY');
  const cartItem = cartData ? JSON.parse(cartData) : {};

  localStorage.setItem(
    'CART_LOCAL_STORAGE_KEY',
    JSON.stringify({
      ...cartItem,
      [userId]: cart,
    })
  );
};

const calculateTotal = (cart) =>
  cart.reduce(
    (acc, item) => ({
      cartTotalCount: acc.cartTotalCount + item.count,
      totalPrice: acc.totalPrice + item.price * item.count,
    }),
    { cartTotalCount: 0, totalPrice: 0 }
  );

// Cart store
const useCartStore = create((set) => ({
  cart: [],
  cartTotalCount: 0,
  totalPrice: 0,

  initCart: (userId) => {
    if (!userId) return;
    const prevCartItems = getCartFromLocalStorage(userId);
    const total = calculateTotal(prevCartItems);
    set({
      cart: prevCartItems,
      cartTotalCount: total.cartTotalCount,
      totalPrice: total.totalPrice,
    });
  },

  resetCart: (userId) => {
    resetCartAtLocalStorage(userId);
    set({ cart: [], cartTotalCount: 0, totalPrice: 0 });
  },

  addCartItem: ({ item, userId, count }) =>
    set((state) => {
      const existingItemIndex = state.cart.findIndex(
        (cartItem) => cartItem.id === item.id
      );
      let updatedCart;
      if (existingItemIndex !== -1) {
        updatedCart = [...state.cart];
        updatedCart[existingItemIndex].count += count;
      } else {
        updatedCart = [...state.cart, { ...item, count }];
      }
      const total = calculateTotal(updatedCart);
      setCartToLocalStorage(updatedCart, userId);
      return {
        cart: updatedCart,
        cartTotalCount: total.cartTotalCount,
        totalPrice: total.totalPrice,
      };
    }),

  removeCartItem: ({ itemId, userId }) =>
    set((state) => {
      const updatedCart = state.cart.filter((item) => item.id !== itemId);
      const total = calculateTotal(updatedCart);
      setCartToLocalStorage(updatedCart, userId);
      return {
        cart: updatedCart,
        cartTotalCount: total.cartTotalCount,
        totalPrice: total.totalPrice,
      };
    }),

  changeCartItemCount: ({ itemId, count, userId }) =>
    set((state) => {
      const itemIndex = state.cart.findIndex((item) => item.id === itemId);
      if (itemIndex !== -1) {
        const updatedCart = [...state.cart];
        updatedCart[itemIndex].count = count;
        const total = calculateTotal(updatedCart);
        setCartToLocalStorage(updatedCart, userId);
        return {
          cart: updatedCart,
          cartTotalCount: total.cartTotalCount,
          totalPrice: total.totalPrice,
        };
      }
    }),
}));

export default useCartStore;
