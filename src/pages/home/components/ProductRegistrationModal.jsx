import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ALL_CATEGORY_ID, categories } from '@/constants';
import React from 'react';

import { createNewProduct, initialProductState } from '@/helpers/product';
import { useForm, Controller } from 'react-hook-form';
import { uploadImage } from '@/utils/imageUpload';
import useProductStore from '@/store/useProductStore'; // 상품 관련 zustand 스토어
import useToastStore from '@/store/useToastStore'; // 토스트 관련 zustand 스토어

export const ProductRegistrationModal = ({
  isOpen,
  onClose,
  onProductAdded,
}) => {
  const { addProduct } = useProductStore(); // 상품 추가 액션
  const { showToast } = useToastStore(); // 토스트 표시 액션

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: initialProductState,
  });

  const onSubmit = async (data) => {
    try {
      if (!data.image[0]) {
        throw new Error('이미지를 선택해야 합니다.');
      }

      const imageUrl = await uploadImage(data.image[0]);
      if (!imageUrl) {
        throw new Error('이미지 업로드에 실패했습니다.');
      }

      const newProduct = createNewProduct(data, imageUrl);
      await addProduct(newProduct); // zustand 액션 호출
      showToast('성공적으로 상품이 등록 되었습니다');
      onClose();
      onProductAdded();
    } catch (error) {
      console.error('물품 등록에 실패했습니다.', error);
      showToast('상품 등록에 실패했습니다');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>상품 등록</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <Input
              {...register('title', { required: '상품명을 입력해주세요.' })}
              placeholder="상품명"
            />
            {errors.title && <p>{errors.title.message}</p>}
            <Input
              {...register('price', {
                required: '가격을 입력해주세요.',
                valueAsNumber: true,
              })}
              type="number"
              placeholder="가격"
            />
            {errors.price && <p>{errors.price.message}</p>}
            <Textarea
              {...register('description', {
                required: '상품 설명을 입력해주세요.',
              })}
              className="resize-none"
              placeholder="상품 설명"
            />
            {errors.description && <p>{errors.description.message}</p>}
            <Controller
              control={control}
              name="categoryId"
              render={({ field }) => (
                <Select
                  onValueChange={(value) => field.onChange(value)}
                  value={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="카테고리 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories
                      .filter((category) => category.id !== ALL_CATEGORY_ID)
                      .map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              )}
            />
            <Input
              className="cursor-pointer"
              type="file"
              accept="image/*"
              {...register('image', { required: '이미지를 선택해주세요.' })}
            />
            {errors.image && <p>{errors.image.message}</p>}
          </div>
          <DialogFooter>
            <Button type="submit">등록</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
