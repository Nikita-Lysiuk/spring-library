import { axiosInstance } from '@/lib';
import { useAuthStore } from '@/store';
import { ApiResponse } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { CheckoutResponse } from '@/features/cart/types/api-types';

const usePlaceOrder = (cartId: string) => {
  const accessToken = useAuthStore(state => state.accessToken);
  const [isLoading, setIsLoading] = useState(false);

  const mutation = useMutation({
    mutationFn: async (
      cartId: string
    ): Promise<ApiResponse<CheckoutResponse>> => {
      if (!accessToken || !cartId) {
        throw new Error('Access token or cart ID is missing');
      }

      const response = await axiosInstance.post<ApiResponse<CheckoutResponse>>(
        `/api/cart/${cartId}/checkout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      return response.data;
    },
    onError: (error: any) => {
      console.error('Error placing order:', error);
    },
    onMutate: () => {
      setIsLoading(true);
    },
    onSettled: () => {
      setIsLoading(false);
    },
    onSuccess: data => {
      if (!data.data || !data.data.url) {
        console.error('Invalid response data:', data);
        return;
      }

      console.log('Order placed successfully:', data);

      window.location.href = data.data.url;
    },
  });

  const placeOrder = () => {
    mutation.mutate(cartId);
  };

  return {
    placeOrder,
    isLoading,
  };
};

export default usePlaceOrder;
