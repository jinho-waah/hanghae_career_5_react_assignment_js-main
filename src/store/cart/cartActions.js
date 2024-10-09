import { createAction } from '@reduxjs/toolkit';

export const initCart = createAction('cart/initCart');
export const resetCart = createAction('cart/resetCart');
export const addCartItem = createAction('cart/addCartItem');
export const removeCartItem = createAction('cart/removeCartItem');
export const changeCartItemCount = createAction('cart/changeCartItemCount');
