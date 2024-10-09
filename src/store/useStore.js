import { create } from 'zustand';
// import { registerUser } from './auth/auth';
import { registerUserAPI } from '@/api/auth';
import {
  getCartFromLocalStorage,
  resetCartAtLocalStorage,
  setCartToLocalStorage,
  calculateTotal,
} from './cart/cartUtils';
import { ALL_CATEGORY_ID } from '@/constants';
import { loadProducts, addProduct } from './product/productsActions';

const useStore = create((set) => ({
  // Auth state
  isLogin: false,
  user: null,
  registerStatus: 'idle',
  registerError: null,

  setIsLogin: (isLogin) => set({ isLogin }),
  setUser: (user) => set({ user, isLogin: true }),
  logout: () => set({ isLogin: false, user: null }),

  registerUser: async ({ email, password, name }) => {
    set({ registerStatus: 'loading' });
    try {
      const user = await registerUserAPI({ email, password, name });
      set({
        registerStatus: 'succeeded',
        user,
        isLogin: true,
        registerError: null,
      });
    } catch (error) {
      set({
        registerStatus: 'failed',
        registerError: error.message || 'Registration failed',
      });
    }
  },

  // Cart state
  cart: [],
  totalCount: 0,
  totalPrice: 0,

  initCart: (userId) => {
    if (!userId) return;
    const prevCartItems = getCartFromLocalStorage(userId);
    const total = calculateTotal(prevCartItems);
    set({
      cart: prevCartItems,
      totalCount: total.totalCount,
      totalPrice: total.totalPrice,
    });
  },
  resetCart: (userId) => {
    resetCartAtLocalStorage(userId);
    set({ cart: [], totalCount: 0, totalPrice: 0 });
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
        totalCount: total.totalCount,
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
        totalCount: total.totalCount,
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
          totalCount: total.totalCount,
          totalPrice: total.totalPrice,
        };
      }
    }),

  // Filter state
  minPrice: 0,
  maxPrice: 0,
  title: '',
  categoryId: ALL_CATEGORY_ID,

  setMinPrice: (minPrice) => set({ minPrice }),
  setMaxPrice: (maxPrice) => set({ maxPrice }),
  setTitle: (title) => set({ title }),
  setCategoryId: (categoryId) => set({ categoryId }),
  resetFilter: () =>
    set({ minPrice: 0, maxPrice: 0, title: '', categoryId: ALL_CATEGORY_ID }),

  // Products state
  items: [],
  hasNextPage: true,
  isLoading: false,
  error: null,
  totalCount: 0,

  loadProducts: async () => {
    set({ isLoading: true });
    try {
      const { products, hasNextPage, totalCount, isInitial } =
        await loadProducts();
      set((state) => ({
        items: isInitial ? products : [...state.items, ...products],
        hasNextPage,
        totalCount,
        isLoading: false,
        error: null,
      }));
    } catch (error) {
      set({ isLoading: false, error: error.message });
    }
  },
  addProduct: async (product) => {
    set({ isLoading: true });
    try {
      const newProduct = await addProduct(product);
      set((state) => ({
        items: [newProduct, ...state.items],
        totalCount: state.totalCount + 1,
        isLoading: false,
        error: null,
      }));
    } catch (error) {
      set({
        isLoading: false,
        error: error.message || '상품 등록에 실패하였습니다.',
      });
    }
  },

  // Purchase state
  purchaseStart: () => set({ isLoading: true, error: null }),
  purchaseSuccess: () => set({ isLoading: false, error: null }),
  purchaseFailure: (error) => set({ isLoading: false, error }),
}));

export default useStore;
