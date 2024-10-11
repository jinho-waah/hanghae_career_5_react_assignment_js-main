import { create } from 'zustand';

// Toast store
const useToastStore = create((set) => ({
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

export default useToastStore;
