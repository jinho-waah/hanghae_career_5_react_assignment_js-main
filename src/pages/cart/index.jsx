import { CartTable } from '@/pages/cart/components/CartTable';
import { EmptyNotice } from '@/pages/cart/components/EmptyNotice';
import { Layout, authStatusType } from '@/pages/common/components/Layout';
import { selectCart } from '@/store/cart/cartSelectors';
import { useDispatch, useSelector } from 'react-redux';

export const useAppDispatch = useDispatch;
export const useAppSelector = useSelector;
import React from 'react';

export const Cart = () => {
  const cart = useAppSelector(selectCart);
  const isExist = cart.length > 0;

  return (
    <Layout
      className="p-2.5 flex flex-col"
      authStatus={authStatusType.NEED_LOGIN}
    >
      {isExist ? <CartTable /> : <EmptyNotice />}
    </Layout>
  );
};
