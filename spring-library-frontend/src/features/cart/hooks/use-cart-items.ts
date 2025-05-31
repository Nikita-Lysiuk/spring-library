import { axiosInstance } from '@/lib';
import { useAuthStore } from '@/store';
import { ApiResponse } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { CartItemDto } from '../types/api-types';

const useCartItems = () => {
  const accessToken = useAuthStore(state => state.accessToken);

  return useQuery({
    queryKey: ['cartItems'],
    queryFn: async () => {
      const response = await axiosInstance.get<ApiResponse<CartItemDto[]>>(
        'api/cart/items',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to fetch cart items');
      }

      return response.data.data;
    },
    enabled: !!accessToken,
    refetchInterval: 10000,
  });
};

export default useCartItems;
