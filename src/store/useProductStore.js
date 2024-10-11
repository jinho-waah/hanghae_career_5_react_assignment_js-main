// import { create } from 'zustand';
// import { fetchProducts, addProductAPI } from '@/api/product';

// // Product store
// const useProductStore = create((set) => ({
//   products: [],
//   hasNextPage: true,
//   isLoading: false,
//   error: null,
//   productsTotalCount: 0,

//   loadProducts: async ({ filter, pageSize, page }) => {
//     set({ isLoading: true });
//     try {
//       const { products, hasNextPage, productsTotalCount } = await fetchProducts(
//         filter,
//         pageSize,
//         page
//       );
//       set((state) => ({
//         products: page === 1 ? products : [...state.products, ...products],
//         hasNextPage,
//         productsTotalCount,
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
//         productsTotalCount: state.productsTotalCount + 1,
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
// }));

// export default useProductStore;

import { create } from 'zustand';

const useProductStore = create((set) => ({
  products: [],
  hasNextPage: true,
  isLoading: false,
  error: null,
  productsTotalCount: 0,

  setProducts: (products, hasNextPage, productsTotalCount) => {
    set((state) => ({
      products,
      hasNextPage,
      productsTotalCount,
      isLoading: false,
      error: null,
    }));
  },

  addProductToList: (newProduct) => {
    set((state) => ({
      products: [newProduct, ...state.products],
      productsTotalCount: state.productsTotalCount + 1,
    }));
  },

  setLoading: (isLoading) => {
    set({ isLoading });
  },

  setError: (error) => {
    set({ error, isLoading: false });
  },
}));

export default useProductStore;
