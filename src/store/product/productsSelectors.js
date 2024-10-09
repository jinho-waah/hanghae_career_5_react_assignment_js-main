export const selectProducts = (state) => state.products.items;
export const selectHasNextPage = (state) => state.products.hasNextPage;
export const selectIsLoading = (state) => state.products.isLoading;
export const selectError = (state) => state.products.error;
export const selectTotalCount = (state) => state.products.totalCount;
