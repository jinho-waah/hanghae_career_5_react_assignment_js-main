import { Label } from '@/components/ui/label';
import { TableCell, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { MessageSquare } from 'lucide-react';
import React from 'react';

export const RequestsTableRow = ({ value, onChange }) => {
  return (
    <TableRow>
      <TableCell className="font-bold">
        <Label htmlFor="requests" className="flex items-center">
          <MessageSquare className="mr-2 h-4 w-4" />
          요청사항
        </Label>
      </TableCell>
      <TableCell>
        <Textarea
          id="requests"
          name="requests"
          value={value}
          onChange={onChange}
          placeholder="요청사항을 입력하세요"
          className="resize-none"
        />
      </TableCell>
    </TableRow>
  );
};
