import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchProducts } from '@/api/product';

export const useLoadProducts = (filter, pageSize, page) => {
  return useInfiniteQuery({
    queryKey: ['products', filter, pageSize], // queryKey도 이제 배열이 아닌 객체로 전달합니다
    queryFn: async ({ pageParam = page }) => {
      return await fetchProducts(filter, pageSize, pageParam);
    },
    getNextPageParam: (lastPage) =>
      lastPage.hasNextPage ? lastPage.page + 1 : undefined,
    staleTime: 300000, // 5 minutes cache
    cacheTime: 600000, // 10 minutes cache
  });
};
