import { BookDto } from '@/features/books/types/api-types';

export type CartItemDto = {
  bookDto: BookDto;
  quantity: number;
};

export type CartDto = {
  id: string;
  totalPrice: number;
  totalQuantity: number;
};

export type CheckoutResponse = {
  url: string;
};
