import { axiosInstance } from '@/lib';
import { useAuthStore } from '@/store';
import { ApiResponse } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { CartDto } from '@/features/cart/types/api-types';

const useCart = () => {
  const accessToken = useAuthStore(state => state.accessToken);

  const cart = useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      const response = await axiosInstance.get<ApiResponse<CartDto>>(
        'api/cart',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to fetch cart');
      }
      return response.data.data;
    },
    enabled: !!accessToken,
    refetchInterval: 10000,
  });

  return {
    cart: cart.data,
    cartFetchError: cart.error,
    isCartLoading: cart.isLoading,
  };
};

export default useCart;
