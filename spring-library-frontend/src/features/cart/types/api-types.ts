import { BookDto } from '@/features/books/types/api-types';

export type CartItemDto = {
  bookDto: BookDto;
  quantity: number;
};

export type CartDto = {
  totalPrice: number;
  totalQuantity: number;
};
