import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { categories } from '@/constants';
import React from 'react';

export const CategoryRadioGroup = ({ categoryId, onChangeCategory }) => {
  return (
    <RadioGroup
      value={categoryId}
      onValueChange={onChangeCategory}
      className="flex flex-wrap gap-4 pt-6"
    >
      {categories.map((category) => (
        <div key={category.id} className="flex items-center space-x-2">
          <RadioGroupItem value={category.id} id={category.id} />
          <Label htmlFor={category.id}>{category.name}</Label>
        </div>
      ))}
    </RadioGroup>
  );
};
