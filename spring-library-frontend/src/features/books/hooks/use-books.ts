import { axiosInstance } from '@/lib';
import { useAuthStore } from '@/store';
import { ApiResponse } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router';
import { BookStoreResponse } from '@/features/books/types/api-types';

const useBooks = () => {
  const token = useAuthStore(state => state.accessToken);
  const [searchParams] = useSearchParams();

  return useQuery({
    queryKey: ['books', searchParams.toString()],
    queryFn: async () => {
      if (!token) {
        throw new Error('No token found');
      }

      const response = await axiosInstance.get<ApiResponse<BookStoreResponse>>(
        '/api/books/filter',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: searchParams,
        }
      );
      if (response.data.success && response.data.data) {
        return response.data.data;
      } else {
        throw new Error(response.data.message || 'Failed to fetch books');
      }
    },
  });
};

export default useBooks;
