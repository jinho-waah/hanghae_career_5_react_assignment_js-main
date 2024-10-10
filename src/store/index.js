// // export const store = configureStore({
// //   reducer: {
// //     auth: authReducer,
// //     cart: cartReducer,
// //     filter: filterReducer,
// //     products: productsReducer,
// //     purchase: purchaseSlice,
// //   },
// // });

// import { create } from 'zustand';
// import { registerUserAPI } from '@/api/auth';
// import { ALL_CATEGORY_ID } from '@/constants';
// import { fetchProducts, addProductAPI } from '@/api/product';

// // Helper functions
// const getCartFromLocalStorage = (userId) => {
//   const cartData = localStorage.getItem('CART_LOCAL_STORAGE_KEY');
//   if (!cartData) return [];

//   const cartItem = JSON.parse(cartData) || null;
//   return cartItem?.[userId] ?? [];
// };

// const resetCartAtLocalStorage = (userId) => {
//   const cartData = localStorage.getItem('CART_LOCAL_STORAGE_KEY');
//   const cartItem = cartData ? JSON.parse(cartData) : {};

//   localStorage.setItem(
//     'CART_LOCAL_STORAGE_KEY',
//     JSON.stringify({
//       ...cartItem,
//       [userId]: [],
//     })
//   );
// };

// const setCartToLocalStorage = (cart, userId) => {
//   const cartData = localStorage.getItem('CART_LOCAL_STORAGE_KEY');
//   const cartItem = cartData ? JSON.parse(cartData) : {};

//   localStorage.setItem(
//     'CART_LOCAL_STORAGE_KEY',
//     JSON.stringify({
//       ...cartItem,
//       [userId]: cart,
//     })
//   );
// };

// const calculateTotal = (cart) =>
//   cart.reduce(
//     (acc, item) => ({
//       totalCount: acc.totalCount + item.count,
//       totalPrice: acc.totalPrice + item.price * item.count,
//     }),
//     { totalCount: 0, totalPrice: 0 }
//   );

// const useStore = create((set) => ({
//   // Auth state
//   isLogin: false,
//   user: null,
//   registerStatus: 'idle',
//   registerError: null,

//   setIsLogin: (isLogin) => set({ isLogin }),
//   setUser: (user) => set({ user, isLogin: true }),
//   logout: () => set({ isLogin: false, user: null }),

//   registerUser: async ({ email, password, name }) => {
//     set({ registerStatus: 'loading' });
//     try {
//       const user = await registerUserAPI({ email, password, name });
//       set({
//         registerStatus: 'succeeded',
//         user,
//         isLogin: true,
//         registerError: null,
//       });
//     } catch (error) {
//       set({
//         registerStatus: 'failed',
//         registerError: error.message || 'Registration failed',
//       });
//     }
//   },

//   // Cart state
//   cart: [],
//   totalCount: 0,
//   totalPrice: 0,

//   initCart: (userId) => {
//     if (!userId) return;
//     const prevCartItems = getCartFromLocalStorage(userId);
//     const total = calculateTotal(prevCartItems);
//     set({
//       cart: prevCartItems,
//       totalCount: total.totalCount,
//       totalPrice: total.totalPrice,
//     });
//   },
//   resetCart: (userId) => {
//     resetCartAtLocalStorage(userId);
//     set({ cart: [], totalCount: 0, totalPrice: 0 });
//   },
//   addCartItem: ({ item, userId, count }) =>
//     set((state) => {
//       const existingItemIndex = state.cart.findIndex(
//         (cartItem) => cartItem.id === item.id
//       );
//       let updatedCart;
//       if (existingItemIndex !== -1) {
//         updatedCart = [...state.cart];
//         updatedCart[existingItemIndex].count += count;
//       } else {
//         updatedCart = [...state.cart, { ...item, count }];
//       }
//       const total = calculateTotal(updatedCart);
//       setCartToLocalStorage(updatedCart, userId);
//       return {
//         cart: updatedCart,
//         totalCount: total.totalCount,
//         totalPrice: total.totalPrice,
//       };
//     }),
//   removeCartItem: ({ itemId, userId }) =>
//     set((state) => {
//       const updatedCart = state.cart.filter((item) => item.id !== itemId);
//       const total = calculateTotal(updatedCart);
//       setCartToLocalStorage(updatedCart, userId);
//       return {
//         cart: updatedCart,
//         totalCount: total.totalCount,
//         totalPrice: total.totalPrice,
//       };
//     }),
//   changeCartItemCount: ({ itemId, count, userId }) =>
//     set((state) => {
//       const itemIndex = state.cart.findIndex((item) => item.id === itemId);
//       if (itemIndex !== -1) {
//         const updatedCart = [...state.cart];
//         updatedCart[itemIndex].count = count;
//         const total = calculateTotal(updatedCart);
//         setCartToLocalStorage(updatedCart, userId);
//         return {
//           cart: updatedCart,
//           totalCount: total.totalCount,
//           totalPrice: total.totalPrice,
//         };
//       }
//     }),

//   // Filter state
//   filterState: {
//     minPrice: 0,
//     maxPrice: 0,
//     title: '',
//     categoryId: ALL_CATEGORY_ID,
//   },

//   setMinPrice: (minPrice) =>
//     set((state) => ({
//       filterState: { ...state.filterState, minPrice },
//     })),
//   setMaxPrice: (maxPrice) =>
//     set((state) => ({
//       filterState: { ...state.filterState, maxPrice },
//     })),
//   setTitle: (title) =>
//     set((state) => ({
//       filterState: { ...state.filterState, title },
//     })),
//   setCategoryId: (categoryId) =>
//     set((state) => ({
//       filterState: { ...state.filterState, categoryId },
//     })),
//   resetFilter: () =>
//     set({
//       filterState: {
//         minPrice: 0,
//         maxPrice: 0,
//         title: '',
//         categoryId: ALL_CATEGORY_ID,
//       },
//     }),

//   // Products state
//   products: [],
//   hasNextPage: true,
//   isLoading: false,
//   error: null,
//   totalCount: 0,

//   loadProducts: async ({ filter, pageSize, page }) => {
//     set({ isLoading: true });
//     try {
//       const { products, hasNextPage, totalCount } = await fetchProducts(
//         filter,
//         pageSize,
//         page
//       );
//       set((state) => ({
//         products: page === 1 ? products : [...state.products, ...products],
//         hasNextPage,
//         totalCount,
//         isLoading: false,
//         error: null,
//       }));
//     } catch (error) {
//       set({ isLoading: false, error: error.message });
//     }
//   },

//   addProduct: async (productData) => {
//     set({ isLoading: true });
//     try {
//       const newProduct = await addProductAPI(productData);
//       set((state) => ({
//         products: [newProduct, ...state.products],
//         totalCount: state.totalCount + 1,
//         isLoading: false,
//         error: null,
//       }));
//     } catch (error) {
//       set({
//         isLoading: false,
//         error: error.message || '상품 등록에 실패하였습니다.',
//       });
//     }
//   },

//   // Purchase state
//   purchaseStart: () => set({ isLoading: true, error: null }),
//   purchaseSuccess: () => set({ isLoading: false, error: null }),
//   purchaseFailure: (error) => set({ isLoading: false, error }),
// }));

// export default useStore;
