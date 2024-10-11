import { create } from 'zustand';
import { registerUserAPI } from '@/api/auth';
import Cookies from 'js-cookie';

const useAuthStore = create((set) => ({
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
}));

export default useAuthStore;
