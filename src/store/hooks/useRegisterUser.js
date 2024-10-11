import { useMutation } from '@tanstack/react-query';
import { registerUserAPI } from '@/api/auth';
import useAuthStore from '@/store/useAuthStore';

export const useRegisterUser = () => {
  const { setUser, setIsLogin } = useAuthStore();

  return useMutation({
    mutationFn: async (userData) => {
      return await registerUserAPI(userData);
    },
    onSuccess: (user) => {
      setUser(user);
      setIsLogin(true);
    },
    onError: (error) => {
      console.error('Registration failed:', error.message);
    },
  });
};
