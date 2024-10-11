import { useMutation } from '@tanstack/react-query';
import { addProductAPI } from '@/api/product';
import useProductStore from '@/store/useProductStore';

export const useAddProduct = () => {
  const { addProductToList, setLoading, setError } = useProductStore();

  return useMutation({
    mutationFn: async (productData) => {
      return await addProductAPI(productData);
    },
    onSuccess: (newProduct) => {
      addProductToList(newProduct);
    },
    onError: (error) => {
      setError(error.message);
    },
    onSettled: () => {
      setLoading(false);
    },
  });
};
