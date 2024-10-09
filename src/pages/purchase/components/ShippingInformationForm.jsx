import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody } from '@/components/ui/table';
import { Truck } from 'lucide-react';
import React from 'react';

import { AddressTableRow } from '@/pages/purchase/components/AddressTableRow';
import { NameTableRow } from '@/pages/purchase/components/NameTableRow';
import { PhoneTableRow } from '@/pages/purchase/components/PhoneTableRow';
import { RequestsTableRow } from '@/pages/purchase/components/RequestsTableRow';

export const ShippingInformationForm = ({ formData, onChange, errors }) => {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Truck className="mr-2 h-6 w-6" />
          배송 정보
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableBody>
            <NameTableRow value={formData.name} onChange={onChange} />
            <AddressTableRow value={formData.address} onChange={onChange} />
            <PhoneTableRow value={formData.phone} onChange={onChange} />
            <RequestsTableRow value={formData.requests} onChange={onChange} />
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
