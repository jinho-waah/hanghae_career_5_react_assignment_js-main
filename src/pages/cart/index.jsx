import { CartTable } from '@/pages/cart/components/CartTable';
import { EmptyNotice } from '@/pages/cart/components/EmptyNotice';
import { Layout, authStatusType } from '@/pages/common/components/Layout';
import React from 'react';
import useStore from '../../store/useStore';

export const Cart = () => {
  const { cart } = useStore();
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
