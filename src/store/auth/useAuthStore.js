import { create } from 'zustand';
import { registerUserAPI } from '../../api/auth';

const userAuthBear = create((set) => ({
  isLogin: false,
  user: null,
  registerStatus: 'idle',
  registerError: null,

  // 로그인
  setIsLogin: (isLogin) => set({ isLogin }),
  setUser: (user) => set({ user, isLogin: true }),
  setLogOut: () => set({ isLogin: false, user: null }),

  // 회원가입
  registerUser: async ({ email, password, name }) => {
    set({ registerStatus: 'loading', registerError: null });
    try {
      const userData = await registerUserAPI(email, password, name);
      set({ registerStatus: 'succeeded', user: userData, isLogin: true });
    } catch (error) {
      set({ registerStatus: 'failed', registerError: error.message });
    }
  },
}));

export default userAuthBear;
