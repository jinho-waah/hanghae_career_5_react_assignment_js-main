import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { CreditCard } from 'lucide-react';
import React from 'react';

import { PaymentMethodTableRow } from '@/pages/purchase/components/PaymentMethodTableRow';
import { selectTotalPrice } from '@/store/cart/cartSelectors';
import { useAppSelector } from '@/store/hooks';
import { formatPrice } from '@/utils/formatter';

export const Payment = ({ paymentMethod, onPaymentMethodChange }) => {
  const totalPrice = useAppSelector(selectTotalPrice);
  const shippingCost = 3000;

  const getTotalPrice = () => {
    return formatPrice(totalPrice + shippingCost);
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center">
          <CreditCard className="mr-2 h-6 w-6" />
          결제정보
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="font-bold">총상품가격</TableCell>
              <TableCell>{formatPrice(totalPrice)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-bold">배송비</TableCell>
              <TableCell>{formatPrice(shippingCost)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-bold">총결제금액</TableCell>
              <TableCell>{getTotalPrice()}</TableCell>
            </TableRow>
            <PaymentMethodTableRow
              paymentMethod={paymentMethod}
              onPaymentMethodChange={onPaymentMethodChange}
            />
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
