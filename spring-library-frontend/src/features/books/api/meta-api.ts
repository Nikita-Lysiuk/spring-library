import { ApiResponse } from '@/types';
import { Author, Category } from '@/features/books/types';
import {
  CreateCategoryRequest,
  FetchAuthorRequest,
  FetchCategoryRequest,
} from '@/features/books/types/api-types';
import { axiosInstance } from '@/lib';

export const fetchCategories = async (
  data: FetchCategoryRequest
): Promise<ApiResponse<Category[]>> => {
  const response = await axiosInstance.get<ApiResponse<Category[]>>(
    `/api/meta/categories?search=${data.query}`,
    {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    }
  );

  return response.data;
};

export const createCategory = async (
  data: CreateCategoryRequest
): Promise<ApiResponse<Category>> => {
  const response = await axiosInstance.post<ApiResponse<Category>>(
    '/api/meta/categories',
    { name: data.name },
    {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    }
  );

  return response.data;
};

export const fetchAuthors = async (
  data: FetchAuthorRequest
): Promise<ApiResponse<Author[]>> => {
  const response = await axiosInstance.get<ApiResponse<Author[]>>(
    `/api/meta/authors?search=${data.query}`,
    {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    }
  );

  return response.data;
};

export const createAuthor = async (
  data: CreateCategoryRequest
): Promise<ApiResponse<Author>> => {
  const response = await axiosInstance.post<ApiResponse<Author>>(
    '/api/meta/authors',
    { name: data.name },
    {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    }
  );

  return response.data;
};
