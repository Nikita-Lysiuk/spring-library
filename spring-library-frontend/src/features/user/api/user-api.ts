import { axiosInstance } from '@/lib';
import { ApiResponse } from '@/types';
import { FetchUser } from '@/features/user/types';

export const fetchUser = async (
  token: string
): Promise<ApiResponse<FetchUser>> => {
  const response = await axiosInstance.get('/api/user/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data as ApiResponse<FetchUser>;
};
