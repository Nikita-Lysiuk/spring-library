import { create } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';
import { User } from '../features/auth/types';
import { jwtDecode } from 'jwt-decode';
import { useTokenValidation } from '@/features/auth/hooks';

export interface DecodedToken {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role?: string;
  exp: number;
}

export interface AuthStore {
  token: string | null;
  isAuthenticated: boolean;
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
  isTokenExpired: () => Promise<boolean>;
}

const persistConfig: PersistOptions<AuthStore> = {
  name: 'auth-storage',
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      isAuthenticated: false,

      login: (token: string) => {
        const { exp, ...userData }: DecodedToken = jwtDecode(token);

        set({
          token,
          user: userData,
          isAuthenticated: true,
        });
      },

      logout: () => {
        set({ token: null, user: null, isAuthenticated: false });
      },

      isTokenExpired: async () => {
        const { token } = get();

        if (!token) return true;

        const { data, isError } = useTokenValidation(token);

        if (data?.isValid && !isError) {
          return false;
        }

        return true;
      },
    }),
    persistConfig
  )
);
