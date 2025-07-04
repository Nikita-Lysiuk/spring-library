import { axiosInstance } from '@/lib';
import { useAuthStore } from '@/store';
import { ApiResponse } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';

const useAddToCart = (bookId: string) => {
  const accessToken = useAuthStore(state => state.accessToken);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.post<ApiResponse>(
        `api/cart/add`,
        {
          bookId,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to add book to cart');
      }
    },
    onError: (error: any) => {
      if (axios.isAxiosError(error) && error.response?.status === 409) {
        toast.error(
          error.response.data.message ||
            'This book is already in your cart. Please check your cart.'
        );
      } else {
        console.error('Error adding book to cart:', error.message);
        toast.error(
          error.message || 'Failed to add book to cart. Please try again later.'
        );
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['cart', bookId],
        exact: true,
      });
      toast.success('Book added to cart successfully!');
    },
  });

  const addToCart = () => {
    if (!accessToken) {
      throw new Error('You must be logged in to add items to the cart');
      return;
    }

    mutation.mutate();
  };

  return {
    addToCart,
  };
};

export default useAddToCart;
