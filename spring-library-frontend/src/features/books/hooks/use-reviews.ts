import { axiosInstance } from '@/lib';
import { ApiResponse } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { ReviewDto } from '@/features/books/types/api-types';

const useReviews = (bookId: string) => {
  return useQuery({
    queryKey: ['reviews', bookId],
    queryFn: async () => {
      const response = await axiosInstance.get<ApiResponse<ReviewDto[]>>(
        `/api/reviews/${bookId}`
      );

      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to fetch reviews');
      }

      return response.data.data;
    },
    refetchInterval: 10000, // Refetch every 10 seconds
  });
};

export default useReviews;
