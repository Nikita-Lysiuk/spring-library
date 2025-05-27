import { Author, Category } from '@/features/books/types';

export type FetchCategoryRequest = {
  page?: number;
  size?: number;
  query?: string;
  token: string;
};

export type CreateCategoryRequest = {
  name: string;
  token: string;
};

export type FetchAuthorRequest = {
  page?: number;
  size?: number;
  query?: string;
  token: string;
};

export type CreateAuthorRequest = {
  name: string;
  token: string;
};

export type FetchBookSearchRequest = {
  query: string;
  token: string;
};

export type CreateBookType = {
  title: string;
  description: string | null;
  publishedDate: string;
  publisher: string;
  language: string;
  price: string;
  categoryIds: string[];
  authorIds: string[];
  token: string;
  pdf: File;
};

export type BookStore = {
  id: string;
  title: string;
  coverUrl: string;
  averageRating: number;
  numberOfRatings: number;
  price: number;
  publisher: string;
};

export type BookStoreResponse = {
  books: BookStore[];
  totalPages: number;
};

export type BookDto = {
  id: string;
  title: string;
  publisher: string;
  publishedDate: string;
  description: string;
  language: string;
  price: number;
  coverImageUrl: string;
  pageCount: number;
  averageRating: number;
  reviewCount: number;
  authors: Author[];
  categories: Category[];
};

export type UserDto = {
  id: string;
  fullName: string;
  email: string;
  avatarUrl?: string;
};

export type ReviewDto = {
  id: string;
  user: UserDto;
  book: BookDto;
  rating: number;
  content?: string;
  createdAt: string;
};
