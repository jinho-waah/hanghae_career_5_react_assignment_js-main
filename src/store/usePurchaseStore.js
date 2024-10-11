import { create } from 'zustand';

// Purchase store
const usePurchaseStore = create((set) => ({
  isLoading: false,
  error: null,

  purchaseStart: () => set({ isLoading: true, error: null }),
  purchaseSuccess: () => set({ isLoading: false, error: null }),
  purchaseFailure: (error) => set({ isLoading: false, error }),
}));

export default usePurchaseStore;
