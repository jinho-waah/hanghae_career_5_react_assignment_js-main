import { pageRoutes } from "@/apiRoutes";
import { Button } from '@/components/ui/button';
import { formatNumber, formatPrice } from '@/utils/formatter';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import useCartStore from '../../../store/useCartStore';

export const PriceSummary = () => {
  const navigate = useNavigate();
  const { cart, cartTotalCount, totalPrice } = useCartStore();
  const handleClickPurchase = () => {
    navigate(pageRoutes.purchase);
  };

  return (
    <div className="pt-4 flex flex-col items-end">
      <p>
        총 {formatNumber(cartTotalCount)}개, {formatPrice(totalPrice)}
      </p>
      <Button onClick={handleClickPurchase} className="mt-2">
        구매하기
      </Button>
    </div>
  );
};
