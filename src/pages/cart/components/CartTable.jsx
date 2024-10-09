import { PriceSummary } from '@/pages/cart/components/PriceSummary';
import { ProductInfoTable } from '@/pages/cart/components/ProductInfoTable';
import React from 'react';

export const CartTable = () => {
  return (
    <>
      <ProductInfoTable />
      <PriceSummary />
    </>
  );
};
