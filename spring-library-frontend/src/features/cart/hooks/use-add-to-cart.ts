import { axiosInstance } from '@/lib';
import { useAuthStore } from '@/store';
import { ApiResponse } from '@/types';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';

const useAddToCart = (bookId: string) => {
  const accessToken = useAuthStore(state => state.accessToken);

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
          'This book is already in your cart. Please check your cart before adding it again.'
        );
      } else {
        console.error('Error adding book to cart:', error.message);
        toast.error(
          error.message || 'Failed to add book to cart. Please try again later.'
        );
      }
    },
    onSuccess: () => {
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
