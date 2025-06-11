import { axiosInstance } from '@/lib';
import { useAuthStore } from '@/store';
import { ApiResponse } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { UserBookDto } from '../types';

const useGetUserBooks = () => {
  const accessToken = useAuthStore(state => state.accessToken);

  return useQuery({
    queryKey: ['user-books'],
    queryFn: async () => {
      if (!accessToken) {
        throw new Error('No token while fetching user books');
      }

      const response = await axiosInstance.get<ApiResponse<UserBookDto[]>>(
        '/api/user-books',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to fetch user books');
      }

      return response.data.data;
    },
  });
};

export default useGetUserBooks;
