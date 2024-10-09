import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TableCell, TableRow } from '@/components/ui/table';
import { Phone } from 'lucide-react';
import React, { useState } from 'react';

import { PHONE_PATTERN } from '@/constants';

export const PhoneTableRow = ({ value, onChange }) => {
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const newValue = e.target.value;
    onChange(e);

    if (!PHONE_PATTERN.test(newValue) && newValue !== '') {
      setError('-를 포함한 휴대폰 번호만 가능합니다');
    } else {
      setError('');
    }
  };

  return (
    <TableRow>
      <TableCell className="font-bold">
        <Label htmlFor="phone" className="flex items-center">
          <Phone className="mr-2 h-4 w-4" />
          전화번호
        </Label>
      </TableCell>
      <TableCell>
        <Input
          id="phone"
          name="phone"
          value={value}
          onChange={handleChange}
          placeholder="휴대폰 번호를 입력하세요"
          className={error ? 'border-red-500' : ''}
        />
        {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
      </TableCell>
    </TableRow>
  );
};
