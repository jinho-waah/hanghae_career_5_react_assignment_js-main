import { create } from 'zustand';
import { registerUserAPI } from '@/api/auth';
import { ALL_CATEGORY_ID } from '@/constants';
import { fetchProducts, addProductAPI } from '@/api/product';
import Cookies from 'js-cookie';

// Helper functions
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

// store
const useStore = create((set) => ({
  isLogin: false,
  user: null,
  registerStatus: 'idle',
  registerError: null,

  initializeAuth: () => {
    const token = Cookies.get('accessToken');
    const user = Cookies.get('user');
    if (token && user) {
      set({ isLogin: true, user: JSON.parse(user) });
    }
  },

  setIsLogin: (isLogin) => {
    set({ isLogin });
    if (!isLogin) {
      Cookies.remove('accessToken'); // 로그아웃 시 쿠키 삭제
      Cookies.remove('user');
    }
  },

  setUser: (user) => {
    set({ user, isLogin: true });
    Cookies.set('user', JSON.stringify(user), { expires: 7 }); // 쿠키에 사용자 정보 저장
  },

  logout: () => {
    set({ isLogin: false, user: null });
    Cookies.remove('accessToken'); // 쿠키에서 로그인 정보 삭제
    Cookies.remove('user');
  },

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

  // Filter state
  filterState: {
    minPrice: 0,
    maxPrice: 0,
    title: '',
    categoryId: ALL_CATEGORY_ID,
  },

  setMinPrice: (minPrice) =>
    set((state) => ({
      filterState: { ...state.filterState, minPrice },
    })),
  setMaxPrice: (maxPrice) =>
    set((state) => ({
      filterState: { ...state.filterState, maxPrice },
    })),
  setTitle: (title) =>
    set((state) => ({
      filterState: { ...state.filterState, title },
    })),
  setCategoryId: (categoryId) =>
    set((state) => ({
      filterState: { ...state.filterState, categoryId },
    })),
  resetFilter: () =>
    set({
      filterState: {
        minPrice: 0,
        maxPrice: 0,
        title: '',
        categoryId: ALL_CATEGORY_ID,
      },
    }),

  // Products state
  products: [],
  hasNextPage: true,
  isLoading: false,
  error: null,
  productsTotalCount: 0,

  loadProducts: async ({ filter, pageSize, page }) => {
    set({ isLoading: true });
    try {
      const { products, hasNextPage, productsTotalCount } = await fetchProducts(
        filter,
        pageSize,
        page
      );
      set((state) => ({
        products: page === 1 ? products : [...state.products, ...products],
        hasNextPage,
        productsTotalCount,
        isLoading: false,
        error: null,
      }));
    } catch (error) {
      set({ isLoading: false, error: error.message });
    }
  },

  addProduct: async (productData) => {
    set({ isLoading: true });
    try {
      const newProduct = await addProductAPI(productData);
      set((state) => ({
        products: [newProduct, ...state.products],
        productsTotalCount: state.productsTotalCount + 1,
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

  // Toast state
  toasts: [],

  showToast: (message) => {
    const id = Date.now(); // 고유한 ID 생성
    set((state) => ({
      toasts: [...state.toasts, { id, message }],
    }));

    // 3초 후 자동 제거
    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((toast) => toast.id !== id),
      }));
    }, 3000);
  },

  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    }));
  },
}));

export default useStore;
