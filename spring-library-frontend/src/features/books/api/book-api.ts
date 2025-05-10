import { ApiResponse } from '@/types';
import {
  CreateBookType,
  FetchBookSearchRequest,
} from '@/features/books/types/api-types';
import { axiosInstance } from '@/lib';
import { SearchBook } from '@/features/books/types';

export const uploadBook = async (
  data: CreateBookType
): Promise<ApiResponse> => {
  const { token, pdf, ...rest } = data;

  const formData = new FormData();
  formData.append('pdf', pdf);
  formData.append('book', JSON.stringify(rest));

  const response = await axiosInstance.post('/api/books', formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data as ApiResponse;
};

export const searchBooks = async (
  data: FetchBookSearchRequest
): Promise<ApiResponse<SearchBook[]>> => {
  const { token, query } = data;

  const response = await axiosInstance.get('/api/books/search', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      query,
    },
  });

  return response.data as ApiResponse<SearchBook[]>;
};
