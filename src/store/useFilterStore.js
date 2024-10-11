import { create } from 'zustand';
import { ALL_CATEGORY_ID } from '@/constants';

// Filter store
const useFilterStore = create((set) => ({
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
}));

export default useFilterStore;
