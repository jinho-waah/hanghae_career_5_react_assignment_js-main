import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { formatPrice } from '@/utils/formatter';
import React, { useState } from 'react';

export const ProductCard = ({
  product,
  onClickAddCartButton,
  onClickPurchaseButton,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  if (!product) return null;

  const { title, image, price, category } = product;

  const handleClickAddCartButton = (e) => {
    e.stopPropagation();
    onClickAddCartButton(e, product);
  };
  const handleClickPurchaseButton = (e) => {
    e.stopPropagation();
    onClickPurchaseButton(e, product);
  };

  return (
    <Card className="cursor-pointer">
      <div className="relative w-full h-40 bg-gray-200">
        <img
          src={image}
          alt={`${title} 상품 이미지`}
          className={`w-full h-full object-cover ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
          width={320}
          height={160}
        />
      </div>
      <CardContent className="p-4">
        <Badge variant="secondary" className="mb-2">
          {category.name}
        </Badge>
        <h3 className="font-bold text-lg line-clamp-2 mb-2">{title}</h3>
        <p className="text-sm text-gray-600">{formatPrice(price)}</p>
      </CardContent>
      <CardFooter className="p-4">
        <Button
          variant="outline"
          size="sm"
          className="mr-2"
          onClick={handleClickAddCartButton}
        >
          장바구니
        </Button>
        <Button size="sm" onClick={handleClickPurchaseButton}>
          구매하기
        </Button>
      </CardFooter>
    </Card>
  );
};
