import { createAction } from '@reduxjs/toolkit';

export const setMinPrice = createAction('filter/setMinPrice');
export const setMaxPrice = createAction('filter/setMaxPrice');
export const setTitle = createAction('filter/setTitle');
export const setCategoryId = createAction('filter/setCategoryId');
export const resetFilter = createAction('filter/resetFilter');
