import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React from 'react';

export const PriceRange = ({ onChangeMinPrice, onChangeMaxPrice }) => {
  return (
    <div className="space-y-2 mt-4">
      <Label>가격 범위</Label>
      <div className="flex items-center space-x-2">
        <div className="relative">
          <Input
            type="number"
            min="0"
            step="1000"
            placeholder="최소 금액"
            onChange={onChangeMinPrice}
            className="pr-8 w-[120px]"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm">
            원
          </span>
        </div>
        <span className="text-sm">~</span>
        <div className="relative">
          <Input
            type="number"
            min="0"
            step="1000"
            placeholder="최대 금액"
            onChange={onChangeMaxPrice}
            className="pr-8 w-[120px]"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm">
            원
          </span>
        </div>
      </div>
    </div>
  );
};
