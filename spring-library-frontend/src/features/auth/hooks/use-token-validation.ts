import { useQuery } from '@tanstack/react-query';
import { validateToken } from '@/features/auth/api/auth-api';

const useTokenValidation = (token: string) => {
  return useQuery({
    queryKey: ['validate-token', token],
    queryFn: () => validateToken(token),
  });
};

export default useTokenValidation;
