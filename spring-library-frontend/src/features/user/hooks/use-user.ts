import { useAuthStore } from '@/store';
import { useQuery } from '@tanstack/react-query';
import { fetchUser } from '@/features/user/api/user-api';
import toast from 'react-hot-toast';

const useUser = () => {
  const { accessToken } = useAuthStore();

  return useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const response = await fetchUser(accessToken!);

      if (!response.success || !response.data) {
        toast.error('Failed to fetch user data');
        console.error('Error fetching user data:', response.message);
        throw new Error('Failed to fetch user data');
      }

      return response.data;
    },
    enabled: !!accessToken,
  });
};

export default useUser;
