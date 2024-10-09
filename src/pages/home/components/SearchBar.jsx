import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Search } from 'lucide-react';
import React from 'react';

export const SearchBar = ({ onChangeInput }) => {
  return (
    <div className="space-y-2 mt-4">
      <Label htmlFor="searchbar-input">검색</Label>
      <div className="relative">
        <Input
          id="searchbar-input"
          placeholder="상품명을 입력해주세요"
          onChange={onChangeInput}
          className="pl-10"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      </div>
    </div>
  );
};
