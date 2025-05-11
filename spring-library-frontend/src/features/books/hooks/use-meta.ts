import { Author, Category } from '@/features/books/types';
import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/store';
import {
  fetchAuthors,
  fetchCategories,
} from '@/features/books/api/meta-api';

export const useMeta = () => {
  const token = useAuthStore(state => state.accessToken);

  const {
    data: authors = [],
    isLoading: authorsLoading,
    isError: authorsError,
  } = useQuery({
    queryKey: ['authors', token],
    queryFn: async () => {
      const response = await fetchAuthors({ token: token! });

      if (response.data) {
        return response.data;
      }
    },
    enabled: !!token,
  });

  const {
    data: categories = [],
    isLoading: categoriesLoading,
    isError: categoriesError,
  } = useQuery({
    queryKey: ['categories', token],
    queryFn: async () => {
      const response = await fetchCategories({ token: token! });
      if (response.data) {
        return response.data;
      }
    },
  });

  return {
    authors: authors as Author[],
    categories: categories as Category[],
    isLoading: authorsLoading || categoriesLoading,
    isError: authorsError || categoriesError,
  };
};

export default useMeta;
