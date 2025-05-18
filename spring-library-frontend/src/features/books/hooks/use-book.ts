import { axiosInstance } from '@/lib';
import { useAuthStore } from '@/store';
import { useQuery } from '@tanstack/react-query';
import { BookDto } from '@/features/books/types/api-types';
import { ApiResponse } from '@/types';

const useBook = (bookId: string) => {
  const accessToken = useAuthStore(state => state.accessToken);

  return useQuery({
    queryKey: ['book', bookId],
    queryFn: async () => {
      if (!accessToken) throw new Error('No token found');

      const response = await axiosInstance.get<ApiResponse<BookDto>>(
        `/api/books/${bookId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.data.success && response.data.data) {
        return response.data.data as BookDto;
      } else {
        throw new Error(response.data.message || 'Failed to fetch book');
      }
    },
  });
};

export default useBook;
